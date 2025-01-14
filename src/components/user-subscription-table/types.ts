import type { DataTableColumns } from "naive-ui";
import { TableField } from "src/composables/use-subscription-table/types";

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
      const currentStatus = row.status
      
      if (currentStatus) {
        return 'Активен'
      } else {
        return 'Неактивен'
      }
    }
  },
  {
    title: "Комментарий",
    key: "comment",
  },
];
