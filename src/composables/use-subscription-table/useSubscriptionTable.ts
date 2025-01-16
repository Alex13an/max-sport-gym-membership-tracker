import { ref } from "vue";
import { DBTableField, TableField } from "./types";
import moment from "moment";

const tableFields = ref<TableField[]>([]);

export function useSubscriptionTable() {
  async function addUser(name: string, comment: string) {
    const start = moment();
    const end = start.clone().add(1, "M");

    const id = await window.sqlite.addSubscription(
      name,
      start.valueOf(),
      end.valueOf(),
      comment
    );

    tableFields.value = [
      {
        key: id,
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

  async function updateTableComment(id: number, comment: string) {
    await window.sqlite.updateSubscriptionComment(id, comment);

    tableFields.value = tableFields.value.map((value) => {
      if (value.key !== id) {
        return value;
      }
      return {
        ...value,
        comment,
      };
    });
  }

  async function updateMembership(id: number) {
    // TWEAK, play with membership
    const start = moment();
    const end = start.clone().add(1, "M");

    await window.sqlite.updateSubscription(id, start.valueOf(), end.valueOf());

    tableFields.value = tableFields.value.map((value) => {
      if (value.key !== id) {
        return value;
      }
      return {
        ...value,
        status: true,
        start: start.valueOf(),
        formattedStart: start.format("DD/MM/YYYY"),
        end: end.valueOf(),
        formattedEnd: end.format("DD/MM/YYYY"),
      };
    });
  }

  return {
    tableFields,
    updateTableFields,
    updateTableComment,
    updateMembership,
    addUser,
  };
}
