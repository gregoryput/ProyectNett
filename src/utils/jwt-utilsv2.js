
export const verifyTokenExpiration = (token) => {
  if (token === null || token === undefined) {
    return true;
  }

  const decodeTokenVer = token ? JSON.parse(decodeJwt(token)) : "";
  const currentTime = Date.now() / 1000; // Convertir a segundos

  // console.log("IdDelUsuario", decodeTokenVer.IdUsuario);

  if (decodeTokenVer.exp < currentTime) {
    // El token ha expirado
    console.log("---------------token expirado");
    return true;
  } else {
    // El token es válido
    console.log("---------------token valido");
    return false;
  }
};

export const decodeJwt = (token) => {
  if (!token) {
    return;
  }
  return decodeURIComponent(
    window
      .atob(token.split(".")[1].replace("-", "+").replace("_", "/"))
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
};

export const getRolesByToken = (token) => {
  try {
    const decode = token ? JSON.parse(decodeJwt(token)) : "";
    const rol = decode.NombreRol;
    return rol;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUserNameByToken = (token) => {
  try {
    const decode = token ? JSON.parse(decodeJwt(token)) : "";
    const username = decode ? decode.NombreUsuario : "";
    return username;
  } catch (error) {
    return "";
  }
};

export const getUserIdByToken = (token) => {
  try {
    const decode = token ? JSON.parse(decodeJwt(token)) : "";
    const userId = decode ? decode.IdUsuario : "";
    return userId;
  } catch (error) {
    return "";
  }
};
