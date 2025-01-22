<script setup lang="ts">
import { NButton, NDataTable } from "naive-ui";
import { productsTableColumns, supplyTableColumns } from "./types";
import { Add } from "@vicons/ionicons5";
import ProductModal from "../product-modal/ProductModal.vue";
import { useProductModal } from "../product-modal/use-product-modal";
import { useProductsTable } from "../../composables/use-products-table/useProductsTable";
import { onMounted } from "vue";

const { showModal } = useProductModal();
const {
  productsTableFields,
  supplyTableFields,
  updateProductsTableFields,
  updateSupplyTableFields,
} = useProductsTable();

onMounted(async () => {
  await updateProductsTableFields();
  await updateSupplyTableFields();
});
</script>

<template>
  <div class="products-table">
    <div class="products-table__container">
      <div class="products-table__header">
        <h3>Товары</h3>
        <NButton type="primary" @click="showModal">
          <template #icon><Add /></template>
        </NButton>
      </div>
      <NDataTable :columns="productsTableColumns" :data="productsTableFields" />
    </div>
    <div class="products-table__container">
      <div class="products-table__header">
        <h3>Бар</h3>
      </div>
      <NDataTable :columns="supplyTableColumns" :data="supplyTableFields" />
    </div>
  </div>

  <ProductModal />
</template>

<style lang="scss" src="./style.scss" />
