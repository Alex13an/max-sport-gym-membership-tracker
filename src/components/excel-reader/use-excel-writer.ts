import {DBTableField} from "src/composables/use-subscription-table/types";
import {useSubscriptionTable} from "../../composables/use-subscription-table/useSubscriptionTable";
import writeXlsxFile from "write-excel-file";
import moment from 'moment'

export function useExcelWriter() {
  const {} = useSubscriptionTable()
  const headerRow = [
    {
      value: 'Фамилия и имя',
      fontWeight: 'bold',
      align: 'center',
    },
    {
      value: 'Дата покупки',
      fontWeight: 'bold',
      align: 'center',
    },
    {
      value: 'Тип посещения',
      fontWeight: 'bold',
      align: 'center',
    },
    {
      value: 'Срок действия',
      fontWeight: 'bold',
      align: 'center',
    },
    {
      value: 'Статус',
      fontWeight: 'bold',
      align: 'center',
    },
    {
      value: 'Комментарий',
      fontWeight: 'bold',
      align: 'center',
    },
  ];

  const columns = [
    { width: 30 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 10 },
    { width: 25 },
  ]

  function getStatus(date: number) {
    const diff = moment(date).diff(moment());

    if (diff > 0) {
      return 'Активен';
    }

    return 'Неактивен';
  }

  async function writeExcel() {
    const data: DBTableField[] = await window.sqlite.readAllSubscriptions();

    let rowData = []
    rowData.push(headerRow)
    for (let field of data) {
      const row = [
        {
          type: String,
          value: field.name,
          align: 'center',
        },
        {
          type: Date,
          value: moment(field.start_date).toDate(),
          format: 'mm/dd/yyyy',
          align: 'center',
        },
        {
          type: String,
          value: 'Абонемент',
          align: 'center',
        },
        {
          type: Date,
          value: moment(field.end_date).toDate(),
          format: 'mm/dd/yyyy',
          align: 'center',
        },
        {
          type: String,
          value: getStatus(field.end_date),
          align: 'center',
        },
        {
          type: String,
          value: field.comment,
          align: 'center',
        },
      ]
      rowData.push(row)
    }

    await writeXlsxFile(rowData, {
      columns,
      fileName: `абонементы-${moment().format('DD/MM/YYYY')}.xlsx`
    })
  }

  return {
    writeExcel,
  }
}
