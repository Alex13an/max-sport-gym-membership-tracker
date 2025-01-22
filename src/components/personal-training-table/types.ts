import { DataTableColumns } from "naive-ui";
import { PersonalTableField } from "../../composables/use-personal-table/types";
import PersonalTrainingDelete from "../personal-training-delete/PersonalTrainingDelete.vue";
import { h } from "vue";

export const tableColumns: DataTableColumns<PersonalTableField> = [
  {
    title: "No",
    key: "no",
    className: "personal-training-table__no",
  },
  {
    title: "Дата",
    key: "formattedDate",
  },
  {
    title: "",
    key: "delete",
    className: "personal-training-table__delete",
    render(row) {
      return h(PersonalTrainingDelete, {
        id: row.key,
      });
    },
  },
];
