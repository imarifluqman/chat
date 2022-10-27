import { app, db, storage } from "../../firebaseConfig.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    window.location = "./chat.html";
  } else {
    console.log("loged out");
  }
});

let inputEmail = document.querySelector("#inputEmail");
let inputPassword = document.querySelector("#inputPassword");

let userlogin = document.querySelector("#user-login");

const login = async (event) => {
  event.preventDefault();
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      inputEmail.value,
      inputPassword.value
    );
    window.location = "./chat.html";
  } catch (error) {
    document.querySelector("#error-message").innerHTML = error.message;
  }
};

userlogin.addEventListener("click", login);
