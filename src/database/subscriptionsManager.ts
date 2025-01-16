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

export const addSubscription = (
  name: string,
  start: number,
  end: number,
  comment = ""
) => {
  try {
    const insertQuery = db.prepare(
      `INSERT INTO subscriptions (name, start_date, end_date, comment) VALUES ('${name}' , ${start} , ${end} , '${comment}')`
    );

    let rowId: number | bigint = 0;
    const transaction = db.transaction(() => {
      const info = insertQuery.run();
      rowId = info.lastInsertRowid;
      console.log(
        `Inserted ${info.changes} rows with last ID ${info.lastInsertRowid} into subscriptions`
      );
    });
    transaction();

    return rowId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateSubscriptionComment = (id: number, comment: string) => {
  try {
    const insertQuery = db.prepare(
      `UPDATE subscriptions SET comment = '${comment}' WHERE id = ${id}`
    );

    const transaction = db.transaction(() => {
      const info = insertQuery.run();
      console.log(
        `Updated ${info.changes} rows with last ID ${info.lastInsertRowid} into subscriptions`
      );
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const updateSubscription = (
  id: number,
  start: number,
  end: number,
) => {
  try {
    const query = db.prepare(
      `UPDATE subscriptions SET start_date = ${start} , end_date = ${end} WHERE id = ${id}`
    );

    const transaction = db.transaction(() => {
      const info = query.run();
      console.log(
        `Updated ${info.changes} rows with last ID ${info.lastInsertRowid} into subscriptions`
      );
    });
    transaction();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
