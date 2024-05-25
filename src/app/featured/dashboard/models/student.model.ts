export interface IStudent {
    id: string;
    createdAt: Date;
    nombres: string;
    apellidos: string;
    email: string;
}

export interface IStudentCreatePayload {
    createdAt: Date;
    nombres: string;
    apellidos: string;
    email: string;
}


