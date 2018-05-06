import storage from 'good-storage'

const USER_KEY = '_user_'

export function loadUser() {
  return storage.get(USER_KEY,[])
}
