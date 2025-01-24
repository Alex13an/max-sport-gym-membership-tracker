import { ref } from 'vue'
import hash from 'hash-it'

const isAuth = ref(false)
const isFullAuth = ref(false)

const adminHash = 7651677167075
const fullHash = 9750187935465

export function useAuth() {
  function checkPasswordAdmin(pass: string) {
    if (hash(pass) === adminHash) {
      isAuth.value = true
    }
  }
  function checkPasswordFull(pass: string) {
    if (hash(pass) === fullHash) {
      isAuth.value = true
      isFullAuth.value = true
    }
  }
  function checkPassword(pass: string) {
    checkPasswordAdmin(pass)
    checkPasswordFull(pass)
  }

  return {
    isAuth,
    isFullAuth,
    checkPasswordAdmin,
    checkPasswordFull,
    checkPassword,
  }
}
