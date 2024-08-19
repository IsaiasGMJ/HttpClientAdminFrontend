// src/app/cursos-usuarios/cursos.model.ts

// export interface Curso {
//     _id: string;
//     name: string;
//     description: string;
//     price?: number;
//     teacher_id?: string;
//     image?: string;
//     status?: string;
//     created_at?: Date;
//     updated_at?: Date;
// }

export interface Cursos {
    _id: string;
    user_id: { _id: string, username: string };
    course_id: { _id: string, name: string, description: string };
}
