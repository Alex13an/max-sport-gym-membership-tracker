<script setup>
import { onMounted } from "vue";
import { NTabs, NTabPane } from 'naive-ui'
import { useSubscriptionTable } from "./composables/use-subscription-table/useSubscriptionTable";
import UserSubscriptionTable from "./components/user-subscription-table/UserSubscriptionTable.vue";
import UserCommentModal from "./components/user-comment-modal/UserCommentModal.vue";
import UserSubscriptionModal from "./components/user-subscription-modal/UserSubscriptionModal.vue";
import StatusModal from "./components/status-modal/StatusModal.vue";
import { useGlobalTime } from "./composables/use-global-time/useGlobalTime";
import PersonalTrainingTable from "./components/personal-training-table/PersonalTrainingTable.vue";
import moment from "moment";

const { updateTableFields, updateTableCount } = useSubscriptionTable();
useGlobalTime()

onMounted(async () => {
  moment.locale('ru')
  await updateTableCount()
  await updateTableFields();
});
</script>

<template>
  <NTabs class="tabs" type="line" animated>
    <NTabPane name="subscriptions" tab="Абонементы">
      <UserSubscriptionTable />
      <UserSubscriptionModal />
      <UserCommentModal />
      <StatusModal />
    </NTabPane>
    <NTabPane name="personal-trainings" tab="Персональные тренировки">
      <PersonalTrainingTable />
    </NTabPane>
  </NTabs>
</template>

<style lang="scss" src="./index.scss" />
