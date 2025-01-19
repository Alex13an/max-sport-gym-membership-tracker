<script setup lang="ts">
import { NInput, NIcon } from "naive-ui";
import { Search } from "@vicons/ionicons5";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";
import { watchDebounced } from "@vueuse/core";

const { searchValue, searchTableFields } = useSubscriptionTable();

function clearSearchValue() {
  searchValue.value = "";
}

watchDebounced(
  searchValue,
  () => {
    searchTableFields();
  },
  {
    debounce: 250,
    maxWait: 500,
  }
);
</script>

<template>
  <div class="subscriptions-search">
    <NInput type="text" placeholder="Поиск" v-model:value="searchValue">
      <template #prefix>
        <NIcon>
          <Search />
        </NIcon>
      </template>
    </NInput>
    <button
      v-if="searchValue"
      class="subscriptions-search__clear"
      @click="clearSearchValue"
    >
      Очистить
    </button>
  </div>
</template>

<style lang="scss" src="./style.scss" />
