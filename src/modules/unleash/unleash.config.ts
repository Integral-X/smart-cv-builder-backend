import { registerAs } from '@nestjs/config';

export default registerAs('unleash', () => ({
  url: process.env.UNLEASH_URL,
  instanceId: process.env.UNLEASH_INSTANCE_ID,
  appName: process.env.UNLEASH_APP_NAME,
}));
