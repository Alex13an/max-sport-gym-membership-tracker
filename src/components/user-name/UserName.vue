<script setup lang="ts">
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";
import { NButton } from "naive-ui";

const props = defineProps<{
  userId: number;
  userName: string;
}>();

const { deleteUserFromTable } = useSubscriptionTable();
async function deleteUser() {
  const areYouSure = confirm(`Вы точно хотите удалить абонемент ${props.userName}?`)
  if (!areYouSure) {
    return
  }
  deleteUserFromTable(props.userId);
}
</script>

<template>
  <div class="user-name">
    {{ userName }}
    <NButton class="user-name__button" type="error" size="tiny" @click="deleteUser">x</NButton>
  </div>
</template>

<style lang="scss" src="./style.scss" />
