import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/request/login.request.dto';
import { RefreshTokenRequestDto } from './dto/request/refresh-token.request.dto';
import { AuthResponseDto } from './dto/response/auth.response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User authentication and JWT generation' })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<AuthResponseDto> {
    const user = await this.authService.validateUser(
      loginRequestDto.email,
      loginRequestDto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refresh(
    @Body() refreshTokenRequestDto: RefreshTokenRequestDto,
  ): Promise<AuthResponseDto> {
    return this.authService.refreshToken(refreshTokenRequestDto.refreshToken);
  }
}
