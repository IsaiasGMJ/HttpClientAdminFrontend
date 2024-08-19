// src/app/inscripciones/enrollment.model.ts
export interface Enrollment {
  _id: string;
  user_id: { _id: string, username:string}; // Solo incluye el _id del usuario, ya que no hay un nombre de usuario en los datos actuales
  course_id: { _id: string, name: string };
}
