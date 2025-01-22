import { ref } from "vue";
import { DBPersonalTableField, PersonalTableField } from "./types";
import moment from "moment";

const currentDate = ref(moment().valueOf());
const tableFields = ref<PersonalTableField[]>([]);
const tableCount = ref(0);

export function usePersonalTable() {
  async function updateTableCount() {
    const dateStart = moment(currentDate.value).startOf('day');
    const dateEnd = dateStart.clone().add(1, 'day');
    const count = await window.sqlite.getPersonalCount(dateStart.valueOf(), dateEnd.valueOf());

    tableCount.value = count[0].count;
  }

  async function updateTableFields() {
    const dateStart = moment(currentDate.value).startOf('day');
    const dateEnd = dateStart.clone().add(1, 'day');
    const data: DBPersonalTableField[] = await window.sqlite.getPersonal(dateStart.valueOf(), dateEnd.valueOf());

    tableFields.value = [
      ...data.map((training, index) => ({
        key: training.id,
        no: index + 1,
        comment: training.comment,
        date: training.date,
        formattedDate: moment(training.date).format("DD/MM/YYYY HH:mm"),
      })),
    ];
  }

  async function reloadTable() {
    await updateTableCount();
    await updateTableFields();
  }

  async function addPersonal() {
    await window.sqlite.addPersonal(currentDate.value);
    await reloadTable();
  }

  async function deletePersonal(id: number) {
    await window.sqlite.deletePersonal(id);
    await reloadTable();
  }

  return {
    currentDate,
    tableCount,
    tableFields,
    updateTableFields,
    updateTableCount,
    addPersonal,
    reloadTable,
    deletePersonal,
  };
}
