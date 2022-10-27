import { app, db, storage } from "../../firebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {
  doc,
  setDoc,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import {
  uploadBytes,
  getDownloadURL,
  ref,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
const auth = getAuth(app);

let inputName = document.querySelector("#inputName");
let inputEmail = document.querySelector("#inputEmail");
let inputPassword = document.querySelector("#inputPassword");
let inputImage = document.querySelector("#inputImage");

let usersignup = document.querySelector("#usersignup");

const user = auth.currentUser;
if (user) {
  window.location = "./chat.html";
} else {
  console.log(" No user is signed in");
}

const verifyEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    document.querySelector("#error-message").innerHTML =
      "Please verify your Email";
  } catch (error) {
    console.log(error);
  }
};

let signupAccout = async (event) => {
  event.preventDefault();
  let file = inputImage.files[0];
  let imageRef = ref(storage, `images/${file.name}`);
  try {
    let uploaded = await uploadBytes(imageRef, file);
    let url = await getDownloadURL(imageRef);

    let { user } = await createUserWithEmailAndPassword(
      auth,
      inputEmail.value,
      inputPassword.value
    );

    let userRef = doc(db, "users", user.uid);
    let data = await setDoc(userRef, {
      username: inputName.value,
      email: inputEmail.value,
      uid: auth.currentUser.uid,
      time: Timestamp.fromDate(new Date()),
      messageType: "text",
      dpURL: url,
    });

    inputName.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    verifyEmail();
    window.location = "./chat.html";
  } catch (error) {
    document.querySelector("#error-message").innerHTML = error.message;
  }
};

usersignup.addEventListener("click", signupAccout);
