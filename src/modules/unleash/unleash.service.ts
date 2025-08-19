import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Unleash, initialize } from 'unleash-client';

@Injectable()
export class UnleashService implements OnModuleInit {
  private unleash: Unleash;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const unleashConfig = this.configService.get('unleash');
    this.unleash = initialize(unleashConfig);
  }

  isEnabled(featureName: string): boolean {
    return this.unleash.isEnabled(featureName);
  }
}
