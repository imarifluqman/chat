import { getFirestore } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfEwOXq8piewlBgOblcFmfk-muPo-vXWQ",
  authDomain: "keepchatandtodo.firebaseapp.com",
  projectId: "keepchatandtodo",
  storageBucket: "keepchatandtodo.appspot.com",
  messagingSenderId: "876307987610",
  appId: "1:876307987610:web:d895af44dd3efa67b9b323",
  measurementId: "G-YL1RPMGERB",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app);