import * as SQLite from 'expo-sqlite';

const database_name = "HikeManagerApp.db";
const database_version = "2.0";
const database_displayname = "Hike Database";
const database_size = 100000;

const db = SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
);

const initDatabase = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS hikes (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT,
              location TEXT,
              date TEXT,
              parking TEXT,
              length TEXT,
              level TEXT,
              description TEXT
            );`,
            [],
            () => console.log("Database and table created successfully."),
            (err) => console.log("Error occurred while creating the table.", err)
        );
    });
};

const getHikes = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM hikes;`,
                [],
                (_, {rows}) => {
                    resolve(rows._array);
                },
                (_,err)=> {
                    reject(err);
                }
            );
        });
    });
};

const deleteHike = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM hikes WHERE id = ?`,
                [id],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
};

const addHike = (hikeName, location, date, parking, length, level, description) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO hikes (name, location, date, parking, length, level, description)
                VALUES (?, ?, ?, ?, ? ,? ,?)`,
                [hikeName, location, date, parking, length, level, description],
                (_, {insertId}) =>{
                    resolve(insertId);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
};

const editHike = (hikeName, location, date, parking, length, level, description, id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `UPDATE hikes 
                SET name = ?,
                    location = ?,
                    date = ?,
                    parking = ?,
                    length = ?,
                    level = ?,
                    description = ?
                WHERE id = ?`,
                [hikeName, location, date, parking, length, level, description, id],
                () =>{
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
};

const searchHikeByName = (hikeName) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM hikes WHERE name LIKE ?`,
                [`%${hikeName}%`],
                (_,{rows}) => {
                    resolve(rows._array);
                },
                (_,err) => {
                    reject(err);
                }
            );
        });
    });
};

const searchHikeById = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM hikes WHERE id = ?`,
          [id],
          (_, { rows }) => {
            resolve(rows._array);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
};

const Database = {
    initDatabase,
    getHikes,
    addHike,
    editHike,
    deleteHike,
    searchHikeByName,
    searchHikeById,
}

export default Database;