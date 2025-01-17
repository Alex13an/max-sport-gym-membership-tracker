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

export const getSubscriptions = (currentId: number) => {
  try {
    const query = `SELECT * FROM subscriptions WHERE id < ${currentId} ORDER BY id DESC LIMIT 10;`;
    const readQuery = db.prepare(query);
    const rowList = readQuery.all();
    return rowList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSubscriptionsBackwards = (currentId: number) => {
  try {
    const query = `SELECT * FROM subscriptions WHERE id >= ${currentId} ORDER BY id LIMIT 10;`;
    const readQuery = db.prepare(query);
    const rowList = readQuery.all().reverse();
    return rowList;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSubscriptionsCount = () => {
  try {
    const query = `SELECT COUNT(*) as count FROM subscriptions`;
    const readQuery = db.prepare(query);
    const count = readQuery.all();

    const firstElementQuery = `SELECT id FROM subscriptions ORDER BY id LIMIT 1`;
    const readFirstElementQuery = db.prepare(firstElementQuery);
    const firstId = readFirstElementQuery.all();

    const lastElementQuery = `SELECT id FROM subscriptions ORDER BY id DESC LIMIT 1`;
    const readLastElementQuery = db.prepare(lastElementQuery);
    const lastId = readLastElementQuery.all();

    return {
      count: (count[0] as any).count,
      firstId: (firstId[0] as any).id,
      lastId: (lastId[0] as any).id,
    };
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
};

export const updateSubscription = (id: number, start: number, end: number) => {
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

export const deleteSubscription = (id: number) => {
  try {
    const query = db.prepare(
      `DELETE FROM subscriptions WHERE id = ${id}`
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
