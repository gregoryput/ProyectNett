export const required = (message = "Este campo es requerido") => ({
  required: {
    value: true,
    message: message,
  },
});

export const minLength = (length, message) => ({
  minLength: {
    value: length,
    message: message || `El valor mínimo permitido es ${length} caracteres`,
  },
});

export const maxLength = (length, message) => ({
  maxLength: {
    value: length,
    message: message || `El valor máximo permitido es ${length} caracteres`,
  },
});

export const minValue = (value, message) => ({
  min: {
    value: value,
    message: message || `El valor mínimo permitido es ${value}`,
  },
});

export const maxValue = (value, message) => ({
  max: {
    value: value,
    message: message || `El valor máximo permitido es ${value}`,
  },
});

export const phoneNumber = (message = "Formato permitido: 000-000-000") => ({
  pattern: {
    value: /^\d{3}-\d{3}-\d{4}$/,
    message: message,
  },
});

export const email = (message = "Ingresa un correo electrónico válido") => ({
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: message,
  },
});

export const cedualaDominicana = (
  message = "Ingresa una cédula válida formato: 000-00000000-0"
) => ({
  pattern: {
    value: /^\d{3}-\d{7}-\d{1}$/,
    message: message,
  },
});

export const numberOnly = () => ({
  pattern: {
    value: /^[0-9]+$/,
    message: "Este campo solo acepta números",
  },
});

export const validateUrl = (message = "Por favor, ingrese una URL válida") => ({
  pattern: {
    value: /^https?:\/\/www\.[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
    message: message,
  },
});
