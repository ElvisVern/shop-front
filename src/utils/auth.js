const TokenKey = 'token'
const UserKey = 'user'

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  localStorage.removeItem(TokenKey);
}

export function setUser(user) {
  localStorage.setItem(UserKey, JSON.stringify(user));
}

export function getUser() {
  return localStorage.getItem(UserKey);
}

export function removeUser() {
  localStorage.removeItem(UserKey);
}

