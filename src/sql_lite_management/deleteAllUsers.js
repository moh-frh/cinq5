/* eslint-disable prettier/prettier */
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'wassafast.db'});

const deleteAllUsers = () => {
  db.transaction(txn => {
    txn.executeSql(
      `DELETE FROM users`,
      [],
      (sqlTxn, res) => {
        console.log('deleted success');
      },
      error => {
        console.log('error on deleting user' + error.message);
      },
    );
  });
};

export default deleteAllUsers();
