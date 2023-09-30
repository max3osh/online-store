import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

interface IBaseDbConfig {
  HOST: string;
  NAME: string;
  PASSWORD: string;
  PORT: number;
  USER: string;
  DIALECT: 'postgres';
  MIGRATIONS_TABLE_NAME: string;
}

const configService = new ConfigService();

const dbConfig = JSON.parse(
  configService.getOrThrow('DATABASE'),
) as IBaseDbConfig;

const dataSourceOptions: DataSourceOptions = {
  host: dbConfig.HOST,
  type: dbConfig.DIALECT,
  port: dbConfig.PORT,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: configService.getOrThrow('APP_NAME'),
  uuidExtension: 'pgcrypto',
};

export default new DataSource({
  ...dataSourceOptions,
  logging: true,
  entities: [join(__dirname, './entities/*.entity.{ts,js}')],
  migrations: [join(__dirname, './migrations/index.{ts,js}')],
});
