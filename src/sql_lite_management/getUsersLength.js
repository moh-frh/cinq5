/* eslint-disable prettier/prettier */
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'wassafast.db'});

const getUsersLength = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM users ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log(res.rows.length);
        },
        error => {
          console.log('error on getting  user' + error.message);
        },
      );
    });
  };

export default getUsersLength();
