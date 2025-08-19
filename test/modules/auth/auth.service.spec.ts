import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { UsersService } from '../../../src/modules/auth/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../../src/config/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('AuthService', () => {
  let authService: AuthService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let usersService: UsersService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let jwtService: JwtService;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        JwtService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            debug: jest.fn(),
            verbose: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data if validation is successful', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedpassword',
        name: null,
        refreshToken: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaService.user.findUnique.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...expectedResult } = user;
      expect(result).toEqual(expectedResult);
    });

    it('should return null if user is not found', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);
      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedpassword',
        name: null,
        refreshToken: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaService.user.findUnique.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access and refresh tokens', async () => {
      const user = { id: '1', email: 'test@example.com' };
      const tokens = { accessToken: 'access', refreshToken: 'refresh' };
      jest.spyOn(authService, 'getTokens').mockResolvedValue(tokens);
      jest
        .spyOn(authService, 'updateRefreshToken')
        .mockResolvedValue(undefined);

      const result = await authService.login(user);
      expect(result).toEqual(tokens);
      expect(authService.updateRefreshToken).toHaveBeenCalledWith(
        user.id,
        tokens.refreshToken,
      );
    });
  });

  describe('refreshToken', () => {
    beforeEach(() => {
      jest
        .spyOn(authService, 'decodeRefreshToken')
        .mockResolvedValue({ sub: '1', email: 'test@example.com' });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);
      await expect(
        authService.refreshToken('some-refresh-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if refresh token does not match', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedpassword',
        name: null,
        refreshToken: 'hashed-token',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prismaService.user.findUnique.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(
        authService.refreshToken('some-refresh-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return new tokens if refresh is successful', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedpassword',
        name: null,
        refreshToken: 'hashed-token',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const tokens = { accessToken: 'new-access', refreshToken: 'new-refresh' };
      prismaService.user.findUnique.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(authService, 'getTokens').mockResolvedValue(tokens);
      jest
        .spyOn(authService, 'updateRefreshToken')
        .mockResolvedValue(undefined);

      const result = await authService.refreshToken('some-refresh-token');

      expect(result).toEqual(tokens);
    });
  });
});
