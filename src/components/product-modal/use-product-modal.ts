import { ref } from 'vue'

const isModalVisible = ref(false)
const label = ref("");
const price = ref(0);
const amount = ref(1);

export function useProductModal() {
  function showModal() {
    isModalVisible.value = true
  }

  function closeModal() {
    isModalVisible.value = false
    label.value = ''
    price.value = 0
    amount.value = 1
  }

  function toggleModal() {
    isModalVisible.value = !isModalVisible.value
  }

  return {
    showModal,
    closeModal,
    toggleModal,
    isModalVisible,
    label,
    price,
    amount,
  }
}
