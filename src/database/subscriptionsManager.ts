import { db } from "./db";

export const readAllSubscriptions = () => {
  try {
    const query = `SELECT * FROM subscriptions`;
    const readQuery = db.prepare(query);
    const rowList = readQuery.all();
    return rowList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addSubscription = (name: string, start: number, end: number, comment = "") => {
  try {
    const insertQuery = db.prepare(
      `INSERT INTO subscriptions (name, start_date, end_date, comment) VALUES ('${name}' , ${start} , ${end} , '${comment}')`
    );

    const transaction = db.transaction(() => {
      const info = insertQuery.run();
      console.log(
        `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into person`
      );
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
