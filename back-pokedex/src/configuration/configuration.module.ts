import { Module } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';

@Module({
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ConfigurationModule {}
