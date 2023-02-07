declare namespace NodeJS {
    export interface ProcessEnv {
        PORT: string;
        HOSTNAME: string;
        FRONTEND_URL: string;
        SECRET: string;
    }
}
