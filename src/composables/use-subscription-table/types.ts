import {Moment} from "moment"

export interface TableField  {
  key: number | string
  name: string
  start: Moment
  formattedStart: string
  end: Moment
  formattedEnd: string
  comment: string
  status: boolean
}

