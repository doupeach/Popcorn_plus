import firebase from "./firebase"

const db = firebase.firestore();
const userRef = db.collection("users");
const listRef = db.collection("lists")
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

export const getCollectionsDescOrder = (
  collectionName,
  setContents,
  lastCollectionSnapshotRef
) => {
  const unsub = firestore
    .collection(collectionName)
    .orderBy("createdAt", "desc")
    .limit(4)
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      });
      lastCollectionSnapshotRef.current =
        collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
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

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const socialMediaAuth = async (provider) => {
  return await firebase.auth().signInWithPopup(provider)
  .then((response) => {
    return response.user;
  })
  .catch((error) => {
    return error
  })
};

export const signUpWithEmailPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const userLogout = () => {
  firebase.auth().signOut();
};

export const getUserPhotoRef = (refName, currentUser) => {
  return firebase.storage().ref(refName + currentUser.uid);
};

export const getCreatedAt = () => {
  return firebase.firestore.Timestamp.now();
};

export const getMyCollections = (
  collectionName,
  currentUser,
  setContents,
  // lastCollectionSnapshotRef
) => {
  const unsub = firestore
    .collection(collectionName)
    .where("owner", "==", currentUser)
    .orderBy("created_time", "desc")
    .limit(4)
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((docSnapshot) => {
        const id = docSnapshot.id;
        return { ...docSnapshot.data(), id };
      });
      // lastCollectionSnapshotRef.current =
      //   collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
      setContents(data);
    });
  return unsub;
};