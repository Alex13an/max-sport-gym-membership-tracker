import { ref } from "vue";

const isModalVisible = ref(false);
const amount = ref(0)
const newAmount = ref(0)
const productId = ref(0)

export function useAddProductModal() {
  function showModal(id: number, am: number) {
    isModalVisible.value = true;
    productId.value = id
    newAmount.value = 0
    amount.value = am
  }

  function closeModal() {
    isModalVisible.value = false;
    productId.value = 0
    newAmount.value = 0
    amount.value = 0
  }
  return {
    newAmount,
    productId,
    showModal,
    closeModal,
    isModalVisible,
    amount,
  };
}
