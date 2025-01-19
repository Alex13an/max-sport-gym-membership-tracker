import { reactive, ref, toRefs } from "vue";
import { DBTableField, TableField } from "./types";
import moment from "moment";

const tableFields = ref<TableField[]>([]);
const currentIdFirst = ref(0);
const currentIdLast = ref(0);
const tableCount = reactive({
  count: 0,
  firstId: 0,
  lastId: 0,
});
const searchValue = ref('')

export function useSubscriptionTable() {
  async function updateTableCount() {
    const count = await window.sqlite.getSubscriptionsCount();

    tableCount.count = count.count
    tableCount.firstId = count.firstId
    tableCount.lastId = count.lastId
  }

  async function updateTableFields(currentId?: number, back?: boolean) {
    let data: DBTableField[]
    if (back) {
      data = await window.sqlite.getSubscriptionsBackwards(currentId || (tableCount.lastId + 1));
    } else {
      data = await window.sqlite.getSubscriptions(currentId || (tableCount.lastId + 1));
    }

    currentIdFirst.value = (data[0]?.id || 0) + 1
    currentIdLast.value = data[data.length - 1]?.id || 0

    tableFields.value = [
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

  async function searchTableFields() {
    if (!searchValue.value) {
      await updateTableFields()
      return
    }

    const data: DBTableField[] = await window.sqlite.findSubscriptions(searchValue.value)
    tableFields.value = [
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

  function paginateForward() {
    updateTableFields(currentIdLast.value)
  }

  function paginateBack() {
    updateTableFields(currentIdFirst.value, true)
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

  async function reloadTable() {
    await updateTableCount()
    currentIdFirst.value = 0
    currentIdLast.value = 0
    await updateTableFields()
  }

  async function addUser(name: string, comment: string) {
    const start = moment();
    const end = start.clone().add(1, "M");

    await window.sqlite.addSubscription(
      name,
      start.valueOf(),
      end.valueOf(),
      comment
    );
    await reloadTable()
  }


  async function addUserFromTable(
    name: string,
    dateStart: Date,
    dateEnd: Date,
    comment: string
  ) {
    const start = moment(dateStart);
    const end = moment(dateEnd);

    await window.sqlite.addSubscription(
      name,
      start.valueOf(),
      end.valueOf(),
      comment
    );
  }

  async function deleteUserFromTable(id: number) {
    await window.sqlite.deleteSubscription(id);
    await reloadTable()
  }

  return {
    ...toRefs(tableCount),
    searchValue,
    tableFields,
    updateTableFields,
    updateTableComment,
    updateMembership,
    updateTableCount,
    addUser,
    addUserFromTable,
    paginateForward,
    paginateBack,
    reloadTable,
    deleteUserFromTable,
    searchTableFields,
  };
}
