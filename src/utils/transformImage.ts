import { UploadFile } from "antd";
import { IImagen } from "../interfaces";

export const transformToUploadFile = (imagen: IImagen): UploadFile<any> => {
  return {
    uid: String(imagen.IdImagen), // Puedes usar IdImagen como uid único
    name: imagen.FileName,
    type: imagen.ContentType,
    size: imagen.FileSize,
    status: "done", // Puedes establecer el estado como 'done' ya que se está agregando un objeto existente
    url: imagen.Data || undefined, // Puedes asignar la URL si está disponible en Data
    // Otros campos de acuerdo a tus necesidades
    // Agrega propiedades adicionales si las necesitas, como 'createdBy', 'createdAt', etc.
  };
};
