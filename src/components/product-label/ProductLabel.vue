<script setup lang="ts">
import { useProductsTable } from "../../composables/use-products-table/useProductsTable";
import { NButton } from "naive-ui";
import { RemoveSharp } from '@vicons/ionicons5'

const props = defineProps<{
  productId: number;
  label: string;
}>();

const { deleteProduct } = useProductsTable();
async function deleteP() {
  const areYouSure = confirm(`Вы точно хотите удалить продукт ${props.label}?`)
  if (!areYouSure) {
    return
  }
  deleteProduct(props.productId);
}
</script>

<template>
  <div class="product-label">
    {{ label }}
    <NButton
      class="product-label__button"
      type="error"
      size="tiny"
      @click="deleteP"
    >
      <template #icon><RemoveSharp /></template>
    </NButton>
  </div>
</template>

<style lang="scss" src="./style.scss" />
