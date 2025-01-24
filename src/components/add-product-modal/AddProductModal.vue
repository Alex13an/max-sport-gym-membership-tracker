<script setup lang="ts">
import { NInputNumber, NButton, NCard } from "naive-ui";
import {useAddProductModal} from "./use-add-product-modal";
import {useProductsTable} from "../../composables/use-products-table/useProductsTable";

const { isModalVisible, newAmount, productId, closeModal, amount } = useAddProductModal()
const { addProductAmount } = useProductsTable()

function updateProduct() {
  addProductAmount(productId.value, amount.value + newAmount.value)
  closeModal()
}
</script>

<template>
  <div class="add-product-modal">
    <NCard class="add-product-modal__container" v-if="isModalVisible">
      <NInputNumber
        v-model:value="newAmount"
        placeholder="Количество"
      />
      <NButton class="add-product-modal__enter" @click="updateProduct">Добавить</NButton>
    </NCard>
  </div>
</template>

<style lang="scss" src="./style.scss" />
