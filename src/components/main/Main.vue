<script setup>
import { onMounted } from "vue";
import { NTabs, NTabPane, darkTheme } from "naive-ui";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";
import UserSubscriptionTable from "./../user-subscription-table/UserSubscriptionTable.vue";
import UserCommentModal from "./../user-comment-modal/UserCommentModal.vue";
import UserSubscriptionModal from "./../user-subscription-modal/UserSubscriptionModal.vue";
import StatusModal from "./../status-modal/StatusModal.vue";
import { useGlobalTime } from "../../composables/use-global-time/useGlobalTime";
import PersonalTrainingTable from "./../personal-training-table/PersonalTrainingTable.vue";
import ProductsTable from "./../products-table/ProductsTable.vue";
import moment from "moment";

const { updateTableFields, updateTableCount } = useSubscriptionTable();
useGlobalTime();

onMounted(async () => {
  moment.locale("ru");
  await updateTableCount();
  await updateTableFields();
});
</script>

<template>
  <NTabs class="tabs" type="line" animated :theme="darkTheme">
    <NTabPane name="subscriptions" tab="Абонементы">
      <UserSubscriptionTable />
      <UserSubscriptionModal />
      <UserCommentModal />
      <StatusModal />
    </NTabPane>
    <NTabPane name="personal-trainings" tab="Разовые тренировки">
      <PersonalTrainingTable />
    </NTabPane>
    <NTabPane name="products" tab="Продукты">
      <ProductsTable />
    </NTabPane>
  </NTabs>
</template>
