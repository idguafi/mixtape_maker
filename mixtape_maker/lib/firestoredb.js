import { initializeApp } from "firebase/app";
import {
  query,
  where,
  collection,
  addDoc,
  deleteDoc,
  getFirestore,
  updateDoc,
  getDoc,
  doc,
  getDocs,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBA21Gu-h490Bi-kkH15Uwi6jQbdjN2zyU",
  authDomain: "mixtape-maker-66ded.firebaseapp.com",
  projectId: "mixtape-maker-66ded",
  storageBucket: "mixtape-maker-66ded.appspot.com",
  messagingSenderId: "177258425038",
  appId: "1:177258425038:web:a793d4241918ade9547e9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function userPlaylistsToDb(playlists, curUserSubKey) {
  //the sub key from the jwt is used as a key under the users collection.
  const userRef = doc(db, "users", curUserSubKey);
  await updateDoc(userRef, {
    playlists: playlists,
  });
}

async function getUserMessagesFromDb(curUserSubKey) {
  const senderRef = doc(db, "users", curUserSubKey);
  const senderSnapshot = await getDoc(senderRef);
  return senderSnapshot.data().messages;
}

async function deleteMessageFromUser(curUserSubKey, nameOfMessageToBeDeleted) {
  const senderRef = doc(db, "users", curUserSubKey); //get reference to current user
  const senderSnapshot = await getDoc(senderRef); // get their data
  const filteredMessages = senderSnapshot
    .data()
    .messages.filter(
      (message) => message.playlistTitle != nameOfMessageToBeDeleted
    ); //filter out the accepted msg
  await updateDoc(senderRef, { messages: filteredMessages }); // update (remove) the msg from inbox
}

async function sendMessageToUser(curUserSubKey, message, receiver) {
  const usersCollectionRef = collection(db, "users");
  const senderRef = doc(db, "users", curUserSubKey);
  const senderSnapshot = await getDoc(senderRef);
  var receiverQuery = query(
    usersCollectionRef,
    where("name", "in", [receiver])
  ); // finding receiver name in users container to get UID
  const querySnapshot = await getDocs(receiverQuery); //gettiing receiver snapshot
  const receiverMessages = querySnapshot.docs[0].data(); //getting their available data from snapshot
  const receiverUID = querySnapshot.docs[0].id; // fetching the uid
  const receiverRef = doc(db, "users", receiverUID);
  if (receiverMessages.messages) {
    let messageArr = [
      ...receiverMessages.messages,
      { ...message, from: senderSnapshot.data().name },
    ];

    await updateDoc(receiverRef, {
      messages: messageArr,
    });
  } else {
    let messageArr = [...[], { ...message, from: senderSnapshot.data().name }];
    await updateDoc(receiverRef, {
      messages: messageArr,
    });
  }
}

export {
  app,
  db,
  userPlaylistsToDb,
  sendMessageToUser,
  getUserMessagesFromDb,
  deleteMessageFromUser,
};

export default firebaseConfig;
