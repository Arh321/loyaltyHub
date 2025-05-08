// Cookie utility functions
export const setCookie = (
  name: string,
  value: string,
  expirationDate: string
): void => {
  const expires = `expires=${new Date(expirationDate).toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

export const getCookie = (name: string): string | null => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length);
    }
  }
  return null;
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

export const checkCookieExists = (name: string): boolean => {
  return getCookie(name) !== null;
};

export const getAllCookies = (): { [key: string]: string } => {
  const cookies: { [key: string]: string } = {};
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie) {
      const [name, value] = cookie.split("=");
      cookies[name] = value;
    }
  }
  return cookies;
};
