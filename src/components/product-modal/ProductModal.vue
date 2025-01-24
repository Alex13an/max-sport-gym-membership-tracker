<script setup lang="ts">
import { NInput, NButton, NInputNumber, NCard, NIcon } from "naive-ui";
import { useProductModal } from "./use-product-modal";
import { useProductsTable } from "../../composables/use-products-table/useProductsTable";
import { Close } from '@vicons/ionicons5'

const { isModalVisible, closeModal, label, price, amount } = useProductModal();
const { addProduct } = useProductsTable()

async function addNewUser() {
  if (!label.value || !price.value) {
    return;
  }

  await addProduct(label.value, price.value, amount.value)
  closeModal();
}
</script>

<template>
  <div class="product-modal">
    <NCard class="product-modal__container" v-if="isModalVisible">
      <button class="product-modal__close" @click="closeModal">
        <NIcon size="20" color="white"><Close/></NIcon>
      </button>
      <div class="product-modal__wrapper">
        <span class="product-modal__label"> Название товара </span>
        <NInput type="text" placeholder="Наименование " v-model:value="label" />
      </div>
      <div class="product-modal__wrapper">
        <span class="product-modal__label"> Цена </span>
        <NInputNumber v-model:value="price" :min="0" />
      </div>
      <div class="product-modal__wrapper">
        <span class="product-modal__label"> Количество </span>
        <NInputNumber v-model:value="amount" :min="1" />
      </div>
      <NButton
        class="product-modal__button"
        type="primary"
        @click="addNewUser"
      >
        Добавить
      </NButton>
    </NCard>
  </div>
</template>

<style lang="scss" src="./style.scss" />
