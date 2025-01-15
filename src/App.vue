<script setup>
import UserSubscriptionTable from "./components/user-subscription-table/UserSubscriptionTable.vue";
import UserSubscriptionModal from "./components/user-subscription-modal/UserSubscriptionModal.vue";
import { onMounted } from "vue";
import { useSubscriptionTable } from "./composables/use-subscription-table/useSubscriptionTable";

const { updateTableFields } = useSubscriptionTable();

onMounted(async () => {
  updateTableFields();
});
</script>

<template>
  <UserSubscriptionTable />
  <UserSubscriptionModal />
</template>

<style lang="scss" src="./index.scss" />
