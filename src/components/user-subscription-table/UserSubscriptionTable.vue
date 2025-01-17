<script setup lang="ts">
import { NDataTable, NButton, NInput, NIcon } from "naive-ui";
import { tableColumns } from "./types";
import { useModal } from "../user-subscription-modal/use-modal";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";
import ExcelReader from "../excel-reader/ExcelReader.vue";
import { computed } from "vue";

const { tableFields, paginateForward, paginateBack, firstId, lastId, count } =
  useSubscriptionTable();
const { toggleModal } = useModal();

const isBackEnabled = computed(
  () => Number(tableFields.value[0]?.key) < lastId.value
);
const isForwardEnabled = computed(
  () =>
    Number(tableFields.value[tableFields.value.length - 1]?.key) > firstId.value
);
</script>

<template>
  <div class="subscriptions-table">
    <div class="subscriptions-table__title">
      <NButton type="success" @click="toggleModal">+</NButton>
      <h2>Абонементы</h2>
    </div>
    <ExcelReader />
    
    <NInput type="text" placeholder="Поиск">
      <template #prefix>
        <NIcon :component="" />
      </template>
    </NInput>
    <NDataTable
      class="subscriptions-table__table"
      pagination-behavior-on-filter="first"
      :columns="tableColumns"
      :data="tableFields"
    />
    <div class="subscriptions-table__pagination" v-if="count > 10">
      <NButton :disabled="!isBackEnabled" @click="paginateBack"> ‹ </NButton>
      <NButton :disabled="!isForwardEnabled" @click="paginateForward">
        ›
      </NButton>
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss" />
