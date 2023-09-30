export interface ApplicationConfigInterface {
  APP_NAME: string;
  APP_VERSION: string;
  SERVER_PORT: number;
  NODE_ENV: string;

  SALT: number;

  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
  API_KEY: string;

  ROOT_FOLDER_PATH: string;

  REFRESH_TOKEN_EXPIRATION_DAYS: number;
  JWT_EXPIRATION_TIME_MINUTES: number;

  // ================ ======== ================
  // ================ DATABASE ================
  // ================ ======== ================

  DATABASE: {
    HOST: string;
    NAME: string;
    PASSWORD: string;
    PORT: number;
    USER: string;
    DIALECT: any;
    MIGRATIONS_TABLE_NAME: string;
  };

  // ================ ===== ================
  // ================ REDIS ================
  // ================ ===== ================

  REDIS: {
    PORT: number;
    PASSWORD: string;
    HOST: string;
    DB: string;
  };
}
