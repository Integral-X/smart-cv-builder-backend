import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Unleash, initialize } from 'unleash-client';

@Injectable()
export class UnleashService implements OnModuleInit {
  private unleash: Unleash;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger = new Logger(UnleashService.name),
  ) {}

  onModuleInit() {
    const mockUnleash = this.configService.get<boolean>('unleash.mock');

    if (mockUnleash) {
      this.unleash = {
        isEnabled: (featureName: string) => {
          this.logger.log(`Mock Unleash: Feature "${featureName}" is enabled.`);
          return true;
        },
      } as Unleash;
    } else {
      const unleashConfig = this.configService.get('unleash');
      this.unleash = initialize(unleashConfig);
    }
  }

  isEnabled(featureName: string): boolean {
    return this.unleash.isEnabled(featureName);
  }
}
