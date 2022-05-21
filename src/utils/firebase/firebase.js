// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSANGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export const getCollectionsOnSnapshot = (collectionName, setContents) => {
  const unsub = firestore
    .collection(collectionName)
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      });
      setContents(data);
    });
  return unsub;
};

export const getDocumentRef = (collectionName, id) => {
  return firestore.collection(collectionName).doc(id);
};

export const getDoc = (collectionName, idName) => {
  return firestore.collection(collectionName).doc(idName);
};

export const deleteDoc = (collectionName, idName) => {
  getDoc(collectionName, idName).delete();
};
