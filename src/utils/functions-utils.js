// Convertir a mayuscula la primera letra de los nombres de propiedades
export const capitalizePropertyKeys = (obj) => {
  const capitalizedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      capitalizedObj[capitalizedKey] = obj[key];
    }
  }
  return capitalizedObj;
};

export const AllCapitalizeOnePropertyKey = (obj, property) => {
  const capitalizedObj = {};
  for (let key in obj) {
    if (key === property) {
      if (obj.hasOwnProperty(key)) {
        let capitalizedKey = "";
        for (let i = 0; i < key.length; i++) {
          const caracter = key[i];
          capitalizedKey = capitalizedKey + caracter.toUpperCase();
        }

        capitalizedObj[capitalizedKey] = obj[key];
      }
      return;
    }
  }
  return capitalizedObj;
};
