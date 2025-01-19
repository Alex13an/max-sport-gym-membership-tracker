import readXlsxFile from "read-excel-file";
import { useSubscriptionTable } from "../../composables/use-subscription-table/useSubscriptionTable";
import { onMounted, onBeforeUnmount, ref } from "vue";

export function useExcelReader() {
  const readerRef = ref<HTMLInputElement | null>(null);
  const { addUserFromTable, reloadTable } = useSubscriptionTable();

  const schema = {
    "Фамилия и имя": {
      prop: "name",
      type: String,
    },
    "Дата покупки": {
      prop: "startDate",
      type: Date,
    },
    "Тип посещения": {
      prop: "membershipType",
      type: String,
    },
    "Срок действия": {
      prop: "endDate",
      type: Date,
    },
    Статус: {
      prop: "status",
      type: String,
    },
    Комментарий: {
      prop: "comment",
      type: String,
    },
  };

  async function readExcelFile() {
    readXlsxFile(readerRef.value.files[0], { schema }).then(async (rows) => {
      for (const row of rows.rows) {
        if (row.name && row.endDate && row.startDate) {
          await addUserFromTable(
            row.name,
            row.startDate,
            row.endDate,
            row.comment
          );
        }
      }
      await reloadTable();
    });
  }

  onMounted(() => {
    if (!readerRef.value) {
      return;
    }

    readerRef.value.addEventListener("change", readExcelFile);
  });

  onBeforeUnmount(() => {
    readerRef.value.removeEventListener("change", readExcelFile);
  });

  return {
    readerRef,
  }
}
