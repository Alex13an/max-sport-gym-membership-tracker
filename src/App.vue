<script setup>
import UserSubscriptionTable from './components/user-subscription-table/UserSubscriptionTable.vue';
import UserSubscriptionModal from './components/user-subscription-modal/UserSubscriptionModal.vue';

console.log('👋 This message is being logged by "App.vue", included via Vite');
</script>

<template>
  <UserSubscriptionTable />
  <UserSubscriptionModal />
</template>

<style lang="scss" src="./index.scss" />
