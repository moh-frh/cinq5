/* eslint-disable prettier/prettier */
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'wassafast.db'});

const getUsers = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM users ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log(res.rows.item(0));
        },
        error => {
          console.log('error on getting  user' + error.message);
        },
      );
    });
  };

export default getUsers();
