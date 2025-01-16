import { ref } from "vue";

const isModalVisible = ref(false);
const currentUserId = ref(0);
const currentUserName = ref("");
const currentDateEnd = ref(0)

export function useStatusModal() {
  function showModal(userId: number, userName: string, dateEnd: number) {
    isModalVisible.value = true;
    currentUserId.value = userId;
    currentUserName.value = userName;
    currentDateEnd.value = dateEnd;
  }

  function closeModal() {
    isModalVisible.value = false;
    currentUserId.value = 0;
    currentUserName.value = "";
    currentDateEnd.value = 0;
  }
  return {
    currentUserId,
    currentUserName,
    currentDateEnd,
    showModal,
    closeModal,
    isModalVisible,
  };
}
