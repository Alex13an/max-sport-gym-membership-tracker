<script setup lang="ts">
import { useCommentModal } from "../user-comment-modal/use-comment-modal";

const props = defineProps<{
  userId: number;
  comment?: string;
}>();

const { showModal } = useCommentModal();
function showCommentModal() {
  showModal(props.userId, props.comment);
}
</script>

<template>
  <div class="user-comment" @click="showCommentModal">
    {{ comment }}
  </div>
</template>

<style lang="scss" src="./style.scss" />
