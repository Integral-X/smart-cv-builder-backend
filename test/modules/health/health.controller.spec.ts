import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '@/modules/health/health.controller';
import { HealthService } from '@/modules/health/health.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it("should return { status: 'ok' }", () => {
      expect(controller.check()).toEqual({ status: 'ok' });
    });
  });
});
