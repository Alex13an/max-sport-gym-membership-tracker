<script setup lang="ts">
import { NInput, NButton, NInputNumber } from "naive-ui";
import { ref } from "vue";
import { useProductModal } from "./use-product-modal";
import { useProductsTable } from "../../composables/use-products-table/useProductsTable";

const label = ref("");
const price = ref(0);
const { isModalVisible, closeModal } = useProductModal();
const { addProduct } = useProductsTable()

async function addNewUser() {
  if (!label.value || !price.value) {
    return;
  }

  await addProduct(label.value, price.value)
  closeModal();
}
</script>

<template>
  <div class="product-modal">
    <div class="product-modal__container" v-if="isModalVisible">
      <button class="product-modal__close" @click="closeModal">✕</button>
      <div class="product-modal__wrapper">
        <span class="product-modal__label"> Название товара </span>
        <NInput type="text" placeholder="Наименование " v-model:value="label" />
      </div>
      <div class="product-modal__wrapper">
        <span class="product-modal__label"> Цена </span>
        <NInputNumber v-model:value="price" :min="0" />
      </div>
      <NButton
        class="product-modal__button"
        type="primary"
        @click="addNewUser"
      >
        Добавить
      </NButton>
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss" />
