import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import unleashConfig from './unleash.config';
import { UnleashService } from './unleash.service';
import { UnleashController } from './unleash.controller';

@Module({
  imports: [ConfigModule.forFeature(unleashConfig), WinstonModule],
  controllers: [UnleashController],
  providers: [UnleashService, Logger],
  exports: [UnleashService],
})
export class UnleashModule {}
