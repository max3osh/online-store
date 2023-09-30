import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { ApplicationConfigInterface } from 'src/config';
import { CustomNamingStrategy } from 'src/common/utils';

@Injectable()
export class DatabaseConnection implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService<ApplicationConfigInterface>,
  ) {
    this.DATABASE_CONFIG = this.configService.get('DATABASE');
    this.ROOT_FOLDER_PATH = this.configService.get('ROOT_FOLDER_PATH');
    this.IS_PRODUCTION = this.configService.get('IS_PRODUCTION');
  }

  private readonly DATABASE_CONFIG: ApplicationConfigInterface['DATABASE'];
  private readonly ROOT_FOLDER_PATH: ApplicationConfigInterface['ROOT_FOLDER_PATH'];
  private readonly IS_PRODUCTION: ApplicationConfigInterface['IS_PRODUCTION'];

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.DATABASE_CONFIG.DIALECT,

      host: this.DATABASE_CONFIG.HOST,
      port: this.DATABASE_CONFIG.PORT,

      username: this.DATABASE_CONFIG.USER,
      password: this.DATABASE_CONFIG.PASSWORD,

      database: this.DATABASE_CONFIG.NAME,

      migrationsTableName: this.DATABASE_CONFIG.MIGRATIONS_TABLE_NAME,

      extra: {
        max: 10,
        connectionTimeoutMillis: 100000,
      },
      entities: [`${this.ROOT_FOLDER_PATH}/**/*.entity{.ts,.js}`],
      namingStrategy: new CustomNamingStrategy(),

      logging: true,

      autoLoadEntities: true,

      synchronize: true,
    };
  }
}
