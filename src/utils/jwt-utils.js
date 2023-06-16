import axios from "axios";

const REACT_APP_BASEURL = 'https://localhost:7279/';

export const verifyTokenExpiration = (token) => {
  const refreshTokenNotNull = localStorage.getItem("refreshToken");

  if (!refreshTokenNotNull || !token) {
    return false;
  }

  const refreshToken = JSON.parse(refreshTokenNotNull);
  const todayDate = Math.floor(new Date().getTime() / 1000.0);
  const decodedToken = JSON.parse(decodeJwt(token));
  const expTime = decodedToken.exp;

  if (expTime - todayDate < 60) {
    const data = { refreshToken: refreshToken.Token };
    return axios
      .post(`${REACT_APP_BASEURL}/Refresh`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("token", res.data.token);
          return true;
        } else {
          //log out
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  } else {
    return true;
  }
};

export const decodeJwt = (token) => {
  return decodeURIComponent(
    window
      .atob(token.split(".")[1].replace("-", "+").replace("_", "/"))
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
};