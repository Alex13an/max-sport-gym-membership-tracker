<script setup lang="ts">
import { computed, inject, watch } from "vue";
import moment from "moment";
import { useStatusModal } from "../status-modal/use-status-modal";
import { dateNowInjectionKey } from "../../composables/use-global-time/types";

const props = defineProps<{
  userId: number;
  userName: string;
  status: boolean;
  endDate: number;
}>();

const { showModal } = useStatusModal();
const dateNow = inject(dateNowInjectionKey)
const status = computed(() => {
  const diff = moment(props.endDate).diff(dateNow.value);

  if (diff > 0) {
    return true;
  }

  return false;
});

const isEnding = computed(() => {
  const start = moment(dateNow.value);
  const end = moment(props.endDate);
  const amount = end.diff(start);
  const durationDays = moment.duration(amount).asDays()
  
  return durationDays <= 3 && status.value
})
</script>

<template>
  <div
    class="user-status"
    :class="{ 'user-status__active': status }"
    @click="showModal(userId, userName, endDate)"
  >
    <template v-if="isEnding">
      <span class="user-status__ending">
        {{ 'Заканчивается' }}
      </span>
    </template>
    <template v-else>
      {{ status ? "Активен" : "Неактивен" }}
    </template>
  </div>
</template>

<style lang="scss" src="./style.scss" />
