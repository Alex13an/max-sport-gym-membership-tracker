<script setup lang="ts">
import { NButton, NCard, NIcon } from "naive-ui";
import { useStatusModal } from "./use-status-modal";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";
import { dateNowInjectionKey } from "../../composables/use-global-time/types";
import { computed, inject } from "vue";
import { Close } from '@vicons/ionicons5'
import moment from "moment";

const {
  isModalVisible,
  closeModal,
  currentUserId,
  currentUserName,
  currentDateEnd,
} = useStatusModal();
const { updateMembership } = useSubscriptionTable();

async function updateSubscription() {
  await updateMembership(currentUserId.value);
  closeModal();
}

const dateNow = inject(dateNowInjectionKey);

const remainingTime = computed(() => {
  const diff = currentDateEnd.value - dateNow.value;

  if (diff <= 0) {
    return "Абонемент истек";
  }

  const start = moment(dateNow.value);
  const end = moment(currentDateEnd.value);
  const amount = end.diff(start);
  const durationDays = moment.duration(amount).days();
  const durationHours = moment.duration(amount).hours();
  const durationMinutes = moment.duration(amount).minutes();
  const durationSeconds = moment.duration(amount).seconds();

  let res = "Осталось ";
  if (durationDays) {
    res += `${durationDays}д `;
  }
  if (durationHours) {
    res += `${durationHours}ч `;
  }
  if (durationMinutes) {
    res += `${durationMinutes}м `;
  }
  if (durationSeconds) {
    res += `${durationSeconds}с`;
  }
  return res;
});
</script>

<template>
  <div class="status-modal">
    <NCard class="status-modal__container" v-if="isModalVisible">
      <button class="status-modal__close" @click="closeModal">
        <NIcon size="20" color="white"><Close /></NIcon>
      </button>
      <div class="status-modal__wrapper">
        <h4 class="status-modal__title">Продлить абонемент</h4>
        <span>{{ `${currentUserName}?` }}</span>
      </div>

      <div class="status-modal__remaining">
        {{ remainingTime }}
      </div>

      <NButton
        class="status-modal__button"
        type="primary"
        @click="updateSubscription"
      >
        Продлить абонемент
      </NButton>
    </NCard>
  </div>
</template>

<style lang="scss" src="./style.scss" />
