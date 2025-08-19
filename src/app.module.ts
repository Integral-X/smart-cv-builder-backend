import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// Configuration
import { DatabaseModule } from './config/database.module';
import { AppConfig } from './config/app.config';

// Core modules
import { AuthModule } from './modules/auth/auth.module';
import { UnleashModule } from './modules/unleash/unleash.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: parseInt(process.env.THROTTLE_TTL || '60'),
          limit: parseInt(process.env.THROTTLE_LIMIT || '100'),
        },
      ],
    }),

    // Database
    DatabaseModule,

    // Core modules
    AuthModule,
    UnleashModule,
    HealthModule,
  ],
})
export class AppModule {}
