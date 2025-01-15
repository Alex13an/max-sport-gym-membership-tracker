<script setup lang="ts">
import { Moment } from "moment";
import { computed } from "vue";
import moment from "moment";

const props = defineProps<{
  status: boolean;
  endDate: Moment;
}>();

const status = computed(() => {
  // TODO update this shit
  const now = moment();
  const diff = props.endDate.diff(now);

  if (diff > 0) {
    return true;
  }

  return false;
});
</script>

<template>
  <div class="user-status" :class="{ 'user-status__active': status }">
    {{ status ? "Активен" : "Неактивен" }}
  </div>
</template>

<style lang="scss" src="./style.scss" />
