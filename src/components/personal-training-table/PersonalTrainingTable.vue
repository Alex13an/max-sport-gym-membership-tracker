<script setup lang="ts">
import { NDatePicker, NButton, NButtonGroup, NDataTable } from "naive-ui";
import moment from "moment";
import "moment/locale/ru";
import { ChevronBack, ChevronForward, Add } from "@vicons/ionicons5";
import { tableColumns } from "./types";
import { usePersonalTable } from "../../composables/use-personal-table/usePersonalTable";
import { onMounted, watch } from "vue";

const { currentDate, reloadTable, tableFields, addPersonal, tableCount } =
  usePersonalTable();

function forward() {
  currentDate.value = moment(currentDate.value).add(1, "day").valueOf();
}

function current() {
  currentDate.value = moment().valueOf();
}

function backward() {
  currentDate.value = moment(currentDate.value).subtract(1, "day").valueOf();
}

async function addPersonalTraining() {
  const areYouSure = confirm('Вы уверены?')
  if (!areYouSure) {
    return
  }
  await addPersonal();
}

watch(currentDate, () => {
  reloadTable();
});

onMounted(() => {
  reloadTable();
});
</script>

<template>
  <div class="personal-training-table">
    <div class="personal-training-table__header">
      <NDatePicker v-model:value="currentDate" type="date" />
      <h3 class="personal-training-table__label">
        {{ `${moment(currentDate).locale("ru").format("DD MMMM YYYY")} (тренировок: ${tableCount})` }}
      </h3>
      <div class="personal-training-table__controls">
        <NButtonGroup>
          <NButton @click="backward">
            <template #icon><ChevronBack /></template>
          </NButton>
          <NButton @click="current"> Сегодня </NButton>
          <NButton @click="forward">
            <template #icon><ChevronForward /></template>
          </NButton>
        </NButtonGroup>
      </div>
    </div>

    <div class="personal-training-table__container">
      <NDataTable :columns="tableColumns" :data="tableFields" :bordered="false" />
      <NButton
        class="personal-training-table__add"
        type="primary"
        @click="addPersonalTraining"
      >
        <template #icon><Add /></template>
      </NButton>
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss" />
