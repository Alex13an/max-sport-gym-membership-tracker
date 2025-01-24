<script setup lang="ts">
import { NInput, NButton, NCard, NIcon } from "naive-ui";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";
import { useCommentModal } from "./use-comment-modal";
import { Close } from '@vicons/ionicons5'

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
    <NCard class="comment-modal__container" v-if="isModalVisible">
      <button class="product-modal__close" @click="closeModal">
        <NIcon size="20" color="white"><Close/></NIcon>
      </button>
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
    </NCard>
  </div>
</template>

<style lang="scss" src="./style.scss" />
