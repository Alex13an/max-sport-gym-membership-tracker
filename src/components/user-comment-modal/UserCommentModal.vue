<script setup lang="ts">
import { NInput, NButton } from "naive-ui";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";
import { useCommentModal } from "./use-comment-modal";

const { isModalVisible, closeModal, currentComment, currentUserId } =
  useCommentModal();
const { updateTableComment } = useSubscriptionTable();

async function updateComment() {
  updateTableComment(currentUserId.value, currentComment.value);
  closeModal();
}
</script>

<template>
  <div class="comment-modal">
    <div class="comment-modal__container" v-if="isModalVisible">
      <button class="comment-modal__close" @click="closeModal">✕</button>
      <div class="comment-modal__wrapper">
        <span class="comment-modal__label"> Комментарий </span>
        <NInput
          type="textarea"
          placeholder="Комментарий"
          v-model:value="currentComment"
        />
      </div>
      <NButton
        class="comment-modal__button"
        type="primary"
        @click="updateComment"
      >
        Применить
      </NButton>
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss" />
