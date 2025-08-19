import { SetMetadata } from '@nestjs/common';
import { FeatureFlags } from '../../config/feature-flags.config';

export const FEATURE_FLAG_KEY = 'featureFlag';

export const RequireFeature = (feature: keyof FeatureFlags) =>
  SetMetadata(FEATURE_FLAG_KEY, feature);
