<script setup lang="ts">
import { NButton } from "naive-ui";
import { Remove } from '@vicons/ionicons5'
import { usePersonalTable } from "../../composables/use-personal-table/usePersonalTable";
import {useAuth} from "../../composables/use-auth/UseAuth";

const props = defineProps<{
  id: number;
}>();

const { deletePersonal } = usePersonalTable();
const { isFullAuth } = useAuth()

async function deleteUser() {
  const areYouSure = confirm('Вы уверены?')
  if (!areYouSure) {
    return
  }
  deletePersonal(props.id);
}
</script>

<template>
  <div class="personal-training-delete">
    <NButton v-if="isFullAuth" class="personal-training-delete__button" type="error" size="tiny" @click="deleteUser">
      <template #icon><Remove /></template>
    </NButton>
  </div>
</template>

<style lang="scss" src="./style.scss" />
