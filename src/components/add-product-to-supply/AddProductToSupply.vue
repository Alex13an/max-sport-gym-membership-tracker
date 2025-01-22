<script setup lang="ts">
import { NButton } from "naive-ui";
import { ArrowForwardOutline } from "@vicons/ionicons5";
import { useProductsTable } from "../../composables/use-products-table/useProductsTable";

const props = defineProps<{
  productId: number;
}>();

const { addSupply } = useProductsTable();

function addSupplies() {
  addSupply(props.productId, 1);
}
</script>

<template>
  <NButton class="add-product-to-supply" @click="addSupplies" type="success" size="tiny">
    <template #icon><ArrowForwardOutline /></template>
  </NButton>
</template>

<style lang="scss" src="./style.scss" />
