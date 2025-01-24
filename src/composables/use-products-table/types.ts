export interface ProductsTableField {
  key: number | string
  label: string
  price: number
  amount: number
}

export interface DBProductsTableField {
  id: number
  label: string
  price: number
  current_amount: number
}

export interface SupplyTableField {
  key: number | string
  label: string
  amount: number
  sold: number
  price: number
}

export interface DBSupplyTableField {
  id: number
  label: string
  single_price: number
  product_id: number
  amount: number
  sold: number
}
