<script setup lang="ts">
import { NButton } from 'naive-ui'
import {useExcelReader} from './use-excel-reader';
import {useExcelWriter} from './use-excel-writer';

const { readerRef } = useExcelReader()
const { writeExcel } = useExcelWriter()
</script>

<template>
  <div class="excel-reader">
    <NButton type="primary" @click="writeExcel">
      Сохранить таблицу
    </NButton>
    <div class="excel-reader__wrapper">
      <label for="sheet">Загрузить excel таблицу</label>
      <input ref="readerRef" type="file" id="input" />
    </div>
  </div>
</template>

<style lang="scss" src="./style.scss" />
