export interface User {
    id: number;
    username: string;
    password: string;
}

export interface UserCreateDTO {
    username: string;
    password: string;
}

export interface UserReturnDTO {
    id: number;
    username: string;
}
