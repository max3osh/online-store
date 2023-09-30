import * as path from 'path';

import {
  ApplicationConfigInterface,
  RedisConfigInterface,
  TypeormDatabaseConfigInterface,
} from './types';

const ENV = process.env;

export function InitApplicationConfig(): ApplicationConfigInterface {
  const dbConfig: TypeormDatabaseConfigInterface = JSON.parse(ENV.DB_CONFIG);
  const redisConfig: RedisConfigInterface = JSON.parse(ENV.REDIS_CONFIG);

  return {
    SERVER_PORT: parseInt(ENV.PORT),
    NODE_ENV: ENV.NODE_ENV,
    APP_NAME: ENV.APP_NAME,
    APP_VERSION: '0.1',

    SALT: parseInt(ENV.SALT),

    REFRESH_TOKEN_EXPIRATION_DAYS: parseInt(ENV.REFRESH_TOKEN_EXPIRATION_DAYS),
    JWT_EXPIRATION_TIME_MINUTES: parseInt(ENV.JWT_EXPIRATION_TIME_MINUTES),

    IS_PRODUCTION: ENV.NODE_ENV === 'production',
    IS_DEVELOPMENT: ENV.NODE_ENV !== 'production',

    API_KEY: ENV.API_KEY,

    ROOT_FOLDER_PATH: path.join(__dirname, '..'),

    DATABASE: {
      HOST: dbConfig.dbHost,
      NAME: dbConfig.dbName,
      PASSWORD: dbConfig.dbPassword,
      PORT: parseInt(dbConfig.dbPort, 10),
      USER: dbConfig.dbUser,
      DIALECT: dbConfig.dbDialect,
      MIGRATIONS_TABLE_NAME:
        ENV.TYPEORM_MIGRATIONS_TABLE_NAME || 'local_migrations',
    },

    REDIS: {
      PORT: parseInt(redisConfig.port, 10),
      PASSWORD: redisConfig.password,
      HOST: redisConfig.host,
      DB: redisConfig.db,
    },
  };
}
