export type IProfile = 'ADMIN' | 'USER';

export interface IUser{
    id: string
    email: string,
    password: string,
    nombre: string,
    direccion: string,
    telefono: string,
    profile: IProfile
}

export interface IUserCreatePayload{
    email: string,
    password: string,
    nombre: string,
    direccion: string,
    telefono: string,
    profile: IProfile
}