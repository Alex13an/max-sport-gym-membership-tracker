<script setup lang="ts">
import { useProductsTable } from "../../composables/use-products-table/useProductsTable";
import { NButton } from "naive-ui";
import { RemoveSharp } from "@vicons/ionicons5";
import { useAuth } from "../../composables/use-auth/UseAuth";
import {useAddProductModal} from "../add-product-modal/use-add-product-modal";

const props = defineProps<{
  productId: number;
  label: string;
  amount: number
}>();

const { showModal } = useAddProductModal()
const { deleteProduct } = useProductsTable();
const { isFullAuth } = useAuth();
async function deleteP() {
  const areYouSure = confirm(`Вы точно хотите удалить продукт ${props.label}?`);
  if (!areYouSure) {
    return;
  }
  deleteProduct(props.productId);
}
</script>

<template>
  <div class="product-label">
    <div class="product-label__name" @click="showModal(productId, amount)">
      {{ label }}
    </div>
    <NButton
      v-if="isFullAuth"
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
