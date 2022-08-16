/* eslint-disable prettier/prettier */
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'wassafast.db'});

const addUser = (id, name, email, sex, avatar) => {
  db.transaction(txn => {
    txn.executeSql(
      `INSERT INTO users (id, name, email, sex, avatar) VALUES(?,?,?,?,?)`,
      [id, name, email, sex, avatar],
      (sqlTxn, res) => {
        console.log(`user added successfully`);
      },
      error => {
        console.log('error on adding user' + error.message);
      },
    );
  });
};

export default addUser();
