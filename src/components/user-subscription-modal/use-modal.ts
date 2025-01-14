import { ref } from 'vue'

const isModalVisible = ref(false)

export function useModal() {
  function showModal() {
    isModalVisible.value = true
  }

  function closeModal() {
    isModalVisible.value = false
  }

  function toggleModal() {
    isModalVisible.value = !isModalVisible.value
  }

  return {
    showModal,
    closeModal,
    toggleModal,
    isModalVisible,
  }
}
