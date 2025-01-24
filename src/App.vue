<script setup>
import { NConfigProvider, NCard, darkTheme } from 'naive-ui'
import Main from "./components/main/Main.vue";
import {useAuth} from './composables/use-auth/UseAuth';
import AuthModal from './components/auth-modal/AuthModal.vue';

const { isAuth, isFullAuth } = useAuth()
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <NCard class="wrapper">
      <AuthModal v-if="!isAuth" />
      <Main v-if="isAuth || isFullAuth" />
    </NCard>
  </NConfigProvider>
</template>

<style lang="scss" src="./index.scss" />
