export interface TableField {
  key: number | string
  name: string
  start: number
  formattedStart: string
  end: number
  formattedEnd: string
  comment: string
  status: boolean
}

export interface DBTableField {
  id: number
  name: string
  comment: string
  start_date: number
  end_date: number
}
