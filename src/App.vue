<script setup>
import UserSubscriptionTable from './components/user-subscription-table/UserSubscriptionTable.vue';
import UserSubscriptionModal from './components/user-subscription-modal/UserSubscriptionModal.vue';

import { onMounted } from 'vue'


async function getUsersFromDb() {
  const data = await window.sqlite.readAllSubscriptions ()
  return data
}

onMounted(async () => {
  const res = await getUsersFromDb()
  console.log('RES', res)
})
</script>

<template>
  <UserSubscriptionTable />
  <UserSubscriptionModal />
</template>

<style lang="scss" src="./index.scss" />
