import { ref } from "vue";
import { TableField } from "./types";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

const tableFields = ref<TableField[]>([
  {
    key: 1,
    name: 'Полвонов Шохрух',
    start: moment('1/3/25'),
    end: moment('2/3/25'),
    formattedStart: moment('1/3/25').format('DD/MM/YYYY'),
    formattedEnd: moment('2/3/25').format('DD/MM/YYYY'),
    comment: 'Тренер Софийулла',
    status: true,
  },
]);

export function useSubscriptionTable() {
  function addUser(name: string, comment: string) {
    const start = moment()
    const end = start.clone().add(1, 'M')

    tableFields.value = [...tableFields.value, {
      key: uuidv4(),
      name,
      comment,
      status: true,
      start,
      formattedStart: start.format('DD/MM/YYYY'),
      end,
      formattedEnd: end.format('DD/MM/YYYY'),
    }]
  }

  return {
    tableFields,
    addUser,
  };
}
