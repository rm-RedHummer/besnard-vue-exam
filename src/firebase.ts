import firebase from 'firebase';
import 'firebase/database';

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyAQ9wBnSw_trcVneQMDNFf1MRWWQ-xPFgI",
  authDomain: "besnard-vue-exam.firebaseapp.com",
  databaseURL: "https://besnard-vue-exam-default-rtdb.firebaseio.com",
  projectId: "besnard-vue-exam",
  storageBucket: "besnard-vue-exam.appspot.com",
  messagingSenderId: "318374962449",
  appId: "1:318374962449:web:181916401d52270a1818b0",
}
firebase.initializeApp(firebaseConfig);

export default firebase.database();
