import { ref } from "vue";
import {
  DBProductsTableField,
  DBSupplyTableField,
  ProductsTableField,
  SupplyTableField,
} from "./types";

const productsTableFields = ref<ProductsTableField[]>([]);
const supplyTableFields = ref<SupplyTableField[]>([]);

export function useProductsTable() {
  async function updateProductsTableFields() {
    const data: DBProductsTableField[] = await window.sqlite.getProducts();

    productsTableFields.value = [
      ...data.map((product) => ({
        key: product.id,
        label: product.label,
        price: product.price,
      })),
    ];
  }

  async function updateSupplyTableFields() {
    const data: DBSupplyTableField[] = await window.sqlite.getSupply();

    console.log("DATA", data);
    supplyTableFields.value = [
      ...data.map((product) => ({
        key: product.id,
        label: product.label,
        amount: product.amount,
        price: product.single_price * product.amount,
        sold: product.sold,
      })),
    ];
  }

  async function addProduct(label: string, price: number) {
    await window.sqlite.addProduct(label, price);
    await updateProductsTableFields();
  }

  async function addSupply(productId: number, amount: number) {
    const existingSupply = await window.sqlite.getSupplyById(productId);
    if (existingSupply.length) {
      await window.sqlite.updateSupply(
        existingSupply[0].id,
        existingSupply[0].amount + 1
      );
    } else {
      await window.sqlite.addSupply(productId, amount);
    }
    await updateSupplyTableFields();
  }

  async function deleteProduct(id: number) {
    await window.sqlite.deleteProduct(id);
    await updateProductsTableFields();
    await updateSupplyTableFields();
  }

  return {
    productsTableFields,
    supplyTableFields,
    updateProductsTableFields,
    updateSupplyTableFields,
    addProduct,
    addSupply,
    deleteProduct,
  };
}
