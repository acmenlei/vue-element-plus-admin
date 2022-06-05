import Cookies from "cookies-ts"

let cookies = new Cookies();

export function setCookie(key: string, value: string) {
  cookies.set(key, value);
}

export function getCookie(key: string) {
  return cookies.get(key);
}

export function removeCookie(key: string) {
  cookies.remove(key)
}