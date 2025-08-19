import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import unleashConfig from './unleash.config';
import { UnleashService } from './unleash.service';

@Module({
  imports: [ConfigModule.forFeature(unleashConfig)],
  providers: [UnleashService],
  exports: [UnleashService],
})
export class UnleashModule {}
