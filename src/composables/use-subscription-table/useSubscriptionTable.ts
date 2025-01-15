import { ref } from "vue";
import { DBTableField, TableField } from "./types";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const tableFields = ref<TableField[]>([]);

export function useSubscriptionTable() {
  async function addUser(name: string, comment: string) {
    const start = moment();
    const end = start.clone().add(1, "M");

    await window.sqlite.addSubscription(
      name,
      start.valueOf(),
      end.valueOf(),
      comment
    );

    tableFields.value = [
      {
        key: uuidv4(),
        name,
        comment,
        status: true,
        start: start.valueOf(),
        formattedStart: start.format("DD/MM/YYYY"),
        end: end.valueOf(),
        formattedEnd: end.format("DD/MM/YYYY"),
      },
      ...tableFields.value,
    ];
  }

  async function updateTableFields() {
    const data: DBTableField[] = await window.sqlite.readAllSubscriptions();

    tableFields.value = [
      ...tableFields.value,
      ...data.map((user) => ({
        key: user.id,
        name: user.name,
        comment: user.comment,
        status: true,
        start: user.start_date,
        formattedStart: moment(user.start_date).format("DD/MM/YYYY"),
        end: user.end_date,
        formattedEnd: moment(user.end_date).format("DD/MM/YYYY"),
      })),
    ];
  }

  return {
    tableFields,
    updateTableFields,
    addUser,
  };
}
