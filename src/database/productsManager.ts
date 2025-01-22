import { db } from "./db";

export const getProducts = () => {
  try {
    const query = `SELECT * FROM products`;
    const readQuery = db.prepare(query);
    const rowList = readQuery.all();
    return rowList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSupply = () => {
  try {
    const query = `SELECT supply.id AS supply_id, product_id, amount, label, price AS single_price FROM supply
      LEFT JOIN products ON products.id = supply.id`;
    const readQuery = db.prepare(query);
    const rowList = readQuery.all();
    return rowList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSupplyById = (productId: number) => {
  try {
    const query = `SELECT * FROM supply WHERE id = ${productId}`;
    const readQuery = db.prepare(query);
    const rowList = readQuery.all();
    return rowList;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const addProduct = (
  label: string,
  price: number,
) => {
  try {
    const insertQuery = db.prepare(
      `INSERT INTO products (label, price) VALUES ('${label}' , ${price})`
    );

    let rowId: number | bigint = 0;
    const transaction = db.transaction(() => {
      const info = insertQuery.run();
      rowId = info.lastInsertRowid;
      console.log(
        `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into products`
      );
    });
    transaction();

    return rowId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addSupply = (
  productId: number,
  amount: number,
) => {
  try {
    const insertQuery = db.prepare(
      `INSERT OR IGNORE INTO supply (product_id, amount) VALUES (${productId} , ${amount})`
    );

    let rowId: number | bigint = 0;
    const transaction = db.transaction(() => {
      const info = insertQuery.run();
      rowId = info.lastInsertRowid;
      console.log(
        `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into supply`
      );
    });
    transaction();

    return rowId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteProduct = (id: number) => {
  try {
    const query = db.prepare(
      `DELETE FROM products WHERE id = ${id}`
    );

    const transaction = db.transaction(() => {
      const info = query.run();
      console.log(
        `Updated ${info.changes} rows with last ID ${info.lastInsertRowid} into products`
      );
    });
    transaction();

    const queryS = db.prepare(
      `DELETE FROM supply WHERE product_id = ${id}`
    );

    const transactionS = db.transaction(() => {
      const info = queryS.run();
      console.log(
        `Updated ${info.changes} rows with last ID ${info.lastInsertRowid} into products`
      );
    });
    transactionS();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteSupply = (id: number) => {
  try {
    const query = db.prepare(
      `DELETE FROM supply WHERE id = ${id}`
    );

    const transaction = db.transaction(() => {
      const info = query.run();
      console.log(
        `Updated ${info.changes} rows with last ID ${info.lastInsertRowid} into supply`
      );
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateSupply = (id: number, amount: number) => {
  try {
    const query = db.prepare(
      `UPDATE supply SET amount = ${amount} WHERE id = ${id}`
    );

    const transaction = db.transaction(() => {
      const info = query.run();
      console.log(
        `Updated ${info.changes} rows with last ID ${info.lastInsertRowid} into supply`
      );
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
