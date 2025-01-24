<script setup lang="ts">
import { NInput, NButton } from "naive-ui";
import {useAuth} from "../../composables/use-auth/UseAuth";
import { ref } from "vue";

const password = ref("");
const { checkPassword } = useAuth()

function checkPass() {
  checkPassword(password.value)
}
</script>

<template>
  <div class="auth-modal">
    <div class="auth-modal__container">
      <NInput
        v-model:value="password"
        type="password"
        show-password-on="mousedown"
        placeholder="Password"
      />
      <NButton class="auth-modal__enter" @click="checkPass">Вход</NButton>
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss" />
