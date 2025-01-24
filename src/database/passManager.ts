import { db } from "./db";

export const getPass = (pass: string) => {
  try {
    const query = `SELECT * FROM password WHERE pass = '${pass}'`;
    const readQuery = db.prepare(query);
    const rowList = readQuery.all();
    return rowList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addPass = (
  pass: string,
  isAdmin: boolean = false
) => {
  try {
    const insertQuery = db.prepare(
      `INSERT INTO password (pass, is_admin) VALUES ('${pass}', ${isAdmin ? 1 : 0})`
    );

    let rowId: number | bigint = 0;
    const transaction = db.transaction(() => {
      const info = insertQuery.run();
      rowId = info.lastInsertRowid;
      console.log(
        `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into pass`
      );
    });
    transaction();

    return rowId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const editPass = (
  id: number,
  pass: string,
) => {
  try {
    const insertQuery = db.prepare(
      `UPDATE password SET pass = '${pass}' WHERE id = ${id}`
    );

    let rowId: number | bigint = 0;
    const transaction = db.transaction(() => {
      const info = insertQuery.run();
      rowId = info.lastInsertRowid;
      console.log(
        `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into pass`
      );
    });
    transaction();

    return rowId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deletePass = (id: number) => {
  try {
    const query = db.prepare(
      `DELETE FROM password WHERE id = ${id}`
    );

    const transaction = db.transaction(() => {
      const info = query.run();
      console.log(
        `Updated ${info.changes} rows with last ID ${info.lastInsertRowid} into password`
      );
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
