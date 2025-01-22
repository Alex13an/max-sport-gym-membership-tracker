import { db } from "./db";

export const readAllPersonal = () => {
  try {
    const query = `SELECT * FROM personal`;
    const readQuery = db.prepare(query);
    const rowList = readQuery.all();
    return rowList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPersonalCount = (dateStart: number, dateEnd: number) => {
  try {
    const query = `SELECT COUNT(*) as count FROM personal WHERE date >= ${dateStart} AND date <= ${dateEnd}`;
    const readQuery = db.prepare(query);
    const count = readQuery.all();

    return count;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPersonal = (dateStart: number, dateEnd: number) => {
  try {
    const query = `SELECT * FROM personal WHERE date >= ${dateStart} AND date <= ${dateEnd}`;
    const readQuery = db.prepare(query);
    const rowList = readQuery.all();
    return rowList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addPersonal = (
  date: number,
  comment = ""
) => {
  try {
    const insertQuery = db.prepare(
      `INSERT INTO personal (date, comment) VALUES (${date} , '${comment}')`
    );

    let rowId: number | bigint = 0;
    const transaction = db.transaction(() => {
      const info = insertQuery.run();
      rowId = info.lastInsertRowid;
      console.log(
        `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into personal`
      );
    });
    transaction();

    return rowId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deletePersonal = (id: number) => {
  try {
    const query = db.prepare(
      `DELETE FROM personal WHERE id = ${id}`
    );

    const transaction = db.transaction(() => {
      const info = query.run();
      console.log(
        `Updated ${info.changes} rows with last ID ${info.lastInsertRowid} into personal`
      );
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
