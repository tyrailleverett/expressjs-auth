declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: string;
    FRONTEND_URL: string;
    SESSION_SECRET: string;
    REDIS_URL: string;
    NODE_ENV: string;
  }
}
