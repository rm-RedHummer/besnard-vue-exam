import firebase from "../firebase";

// @ts-ignore
const db = firebase.ref("/agile");



class FirebaseDataService {
  getAll() {
    return db;
  }

  create(tutorial: {}) {
    return db.push(tutorial);
  }

  update(key: string, value: {}) {
    return db.child(key).update(value);
  }

  delete(key: string ) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new FirebaseDataService();