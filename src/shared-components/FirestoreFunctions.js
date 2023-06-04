import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyC3GxgzWxL-1TwlU6Dar1iiAWayr1xxEd0",
  authDomain: "step-challenge-brain-embassy.firebaseapp.com",
  databaseURL:
    "https://step-challenge-brain-embassy-default-rtdb.firebaseio.com",
  projectId: "step-challenge-brain-embassy",
  storageBucket: "step-challenge-brain-embassy.appspot.com",
  messagingSenderId: "1067171412010",
  appId: "1:1067171412010:web:6eff0d70891b3b65306b53",
});

const db = firebase.firestore();
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var year = dateObj.getUTCFullYear();

const collectionTitle = "MonthlyBoard";
const collectionName = `${collectionTitle}|${month}|${year}`;
// console.log("collectionName: ", collectionName);

const collection = db.collection(collectionName);

export const options = {
  snapshotListenOptions: { includeMetadataChanges: true },
};

//--used in LeaderBoardPage -> then combine with useCollection hook.
export const leaderBoardQuery = collection.orderBy("floorAmount", "desc");

export function fetchSortedData(location) {
  if (location === "") {
    let output = collection
      .orderBy("floorAmount", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch((error) => {
        console.error(error);
      });
    return output;
  } else {
    let output = collection
      .where("location", "==", location)
      // .orderBy("floorAmount", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch((error) => {
        console.error(error);
      });
    return output;
  }
}

//--used in MainPage
export function getUsersFloors(userId, setUSerFloors) {
  collection
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setUSerFloors(doc.data().floorAmount);
      } else {
        setUSerFloors(0);
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

//--used in gamePage
export function updateDocument(userId, UserData, increment) {
  let docRef = collection.doc(userId);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        //update and save
        docRef.update({ floorAmount: increment, location: UserData.location });
      } else {
        //create new doc
        docRef
          .set(UserData)
          .then(() => {
            console.log("Document Added: ", UserData);
          })
          .catch((e) => {
            console.log("Error adding document:", e);
          });
      }
    })
    .catch((error) => {
      console.log("error getting document", error);
    });
}
