import type { DataTableColumns } from "naive-ui";
import { TableField } from "src/composables/use-subscription-table/types";
import { h } from "vue";
import UserStatus from "../user-status/UserStatus.vue";

export const tableColumns: DataTableColumns<TableField> = [
  {
    title: "ФИО",
    key: "name",
  },
  {
    title: "Дата покупки",
    key: "formattedStart",
  },
  {
    title: "Дата окончания",
    key: "formattedEnd",
  },
  {
    title: "Статус",
    key: "status",
    render(row) {
      return h(UserStatus, {
        status: row.status,
        endDate: row.end,
      });
    },
  },
  {
    title: "Комментарий",
    key: "comment",
  },
];
