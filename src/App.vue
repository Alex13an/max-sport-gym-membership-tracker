<script setup>
import UserSubscriptionTable from "./components/user-subscription-table/UserSubscriptionTable.vue";
import { onMounted } from "vue";
import { useSubscriptionTable } from "./composables/use-subscription-table/useSubscriptionTable";
import UserCommentModal from "./components/user-comment-modal/UserCommentModal.vue";
import UserSubscriptionModal from "./components/user-subscription-modal/UserSubscriptionModal.vue";
import StatusModal from "./components/status-modal/StatusModal.vue";
import { useGlobalTime } from "./composables/use-global-time/useGlobalTime";

const { updateTableFields } = useSubscriptionTable();
useGlobalTime()

onMounted(async () => {
  updateTableFields();
});
</script>

<template>
  <UserSubscriptionTable />
  <UserSubscriptionModal />
  <UserCommentModal />
  <StatusModal />
</template>

<style lang="scss" src="./index.scss" />
