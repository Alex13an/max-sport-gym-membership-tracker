import { ref } from "vue";

const isModalVisible = ref(false);
const currentComment = ref("");
const currentUserId = ref(0);

export function useCommentModal() {
  function showModal(id: number, comment: string) {
    isModalVisible.value = true;
    currentComment.value = comment;
    currentUserId.value = id;
  }

  function closeModal() {
    isModalVisible.value = false;
    currentComment.value = '';
    currentUserId.value = 0;
  }

  return {
    currentComment,
    currentUserId,
    showModal,
    closeModal,
    isModalVisible,
  };
}
