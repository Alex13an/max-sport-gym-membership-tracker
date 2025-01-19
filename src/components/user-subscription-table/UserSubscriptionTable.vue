<script setup lang="ts">
import { NDataTable, NButton } from "naive-ui";
import { tableColumns } from "./types";
import { useModal } from "../user-subscription-modal/use-modal";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";
import ExcelReader from "../excel-reader/ExcelReader.vue";
import { computed } from "vue";
import UserSubscriptionSearch from "../user-subscription-search/UserSubscriptionSearch.vue";

const { tableFields, paginateForward, paginateBack, firstId, lastId, count, searchValue } =
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
    <UserSubscriptionSearch />
    
    <NDataTable
      class="subscriptions-table__table"
      pagination-behavior-on-filter="first"
      :columns="tableColumns"
      :data="tableFields"
    />
    <div v-if="!searchValue" class="subscriptions-table__wrapper">
      <div class="subscriptions-table__counter">
        {{ `Всего абонементов: ${count}` }}
      </div>
      <div class="subscriptions-table__pagination" v-if="count > 10">
        <NButton :disabled="!isBackEnabled" @click="paginateBack"> ‹ </NButton>
        <NButton :disabled="!isForwardEnabled" @click="paginateForward">
          ›
        </NButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss" />
