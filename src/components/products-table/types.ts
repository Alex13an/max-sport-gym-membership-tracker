import type { DataTableColumns } from "naive-ui";
import { h } from "vue";
import {
  ProductsTableField,
  SupplyTableField,
} from "../../composables/use-products-table/types";
import AddProductToSupply from "../add-product-to-supply/AddProductToSupply.vue";
import ProductLabel from "../product-label/ProductLabel.vue";

export const productsTableColumns: DataTableColumns<ProductsTableField> = [
  {
    title: "Наименование",
    key: "label",
    render(row) {
      return h(ProductLabel, {
        productId: row.key,
        label: row.label,
      });
    },
  },
  {
    title: "Цена",
    key: "price",
  },
  {
    title: "",
    key: "add",
    className: 'products-table__action',
    render(row) {
      return h(AddProductToSupply, {
        productId: row.key,
      });
    },
  },
];

export const supplyTableColumns: DataTableColumns<SupplyTableField> = [
  {
    title: "Наименование",
    key: "label",
  },
  {
    title: "Количество",
    key: "amount",
  },
  {
    title: "Продано",
    key: "sold",
  },
  {
    title: "Цена",
    key: "price",
  },
];
