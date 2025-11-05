import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get getDatabaseUrl(): string {
    return this.configService.get('DATABASE_URL')!;
  }

  get getJwtSecret(): string {
    return this.configService.get('JWT_SECRET')!;
  }

  get getJwtRefreshSecret(): string {
    return this.configService.get('JWT_REFRESH_SECRET')!;
  }

  get getJwtExpiresIn(): string {
    return this.configService.get('JWT_EXPIRES_IN')!;
  }

  get getJwtRefreshExpiresIn(): string {
    return this.configService.get('JWT_REFRESH_EXPIRES_IN')!;
  }

  get getNodeEnv(): string {
    return this.configService.get('NODE_ENV')!;
  }
}
