<script setup lang="ts">
import { NDataTable } from "naive-ui";
import { tableColumns } from "./types";
import { useModal } from "../user-subscription-modal/use-modal";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";

const pagination = {
  pageSize: 10,
};

const { tableFields } = useSubscriptionTable();
const { toggleModal } = useModal();
</script>

<template>
  <div class="subscriptions-table">
    <button @click="toggleModal">+</button>
    <NDataTable
      class="subscriptions-table__table"
      pagination-behavior-on-filter="first"
      :columns="tableColumns"
      :data="tableFields"
      :pagination="pagination"
    />
  </div>
</template>

<style lang="scss" src="./style.scss" />
