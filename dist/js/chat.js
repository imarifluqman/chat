import { db, app } from "../../firebaseConfig.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
const auth = getAuth(app);

const verifyEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
  } catch (error) {
    console.log(error);
  }
};
let profilePic = document.querySelector("#profile-Pic");

onAuthStateChanged(auth, (user) => {
  if (user) {
    let uid = user.uid;
    setProfile(uid);
    showUsers(uid);
  } else {
    console.log("loged out");
  }
  if (auth.currentUser.emailVerified == false) {
    document.querySelector(
      "body"
    ).innerHTML = `<div class="container d-flex justify-content-center align-items-center flex-column "
     style="width=100%; height: 100vh;">
     <p>Please Verify your Email </p>
     <button style="width=100px" class="btn button my-4 p-2" onClick="verifyEmail()">Resend verification link</button></div>`;
  }
});

let profile = document.querySelector(".profile");
const setProfile = async (uid) => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  await onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      profilePic.src = `${doc.data().dpURL}`;
      profile.innerHTML = `<img class="avatar-xl" src="${
        doc.data().dpURL
      }" alt="avatar">
      <h1><a href="#">${doc.data().username}</a></h1>
      <span>${doc.data().email}</span>`;
    });
  });
};

let contacts = document.querySelector("#contacts");
const showUsers = async (uid) => {
  const q = query(collection(db, "users"), where("uid", "!=", uid));
  const unsubscribe = await onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      contacts.innerHTML += `<a href="#" class="filterMembers all online contact" data-toggle="list">
      <img class="avatar-md" src="${doc.data().dpURL}"
          data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar">
      <div class="status">
          <i class="material-icons online">fiber_manual_record</i>
  </div>
      <div class="data">
              <h5>${doc.data().username}</h5>
          <p>${doc.data().email}</p>
      </div>
      <div class="person-add">
          <i class="material-icons">person</i>
      </div>
  </a>`;
    });
  });
};

const removeClass = () => {
  let tabpane = document.querySelectorAll(".tab-pane");
  for (let index = 0; index < 4; index++) {
    tabpane[index].classList.remove("active", "show");
  }
};

function settingProfile() {
  removeClass();
  let settings = document.querySelector("#settings");
  settings.classList.add("active", "show");
}

function settingNotification() {
  removeClass();
  let notifications = document.querySelector("#notifications");
  notifications.classList.add("active", "show");
}

function settingMembers() {
  removeClass();
  let members = document.querySelector("#members");
  members.classList.add("active", "show");
}

let settingBtn = document.querySelector("#settingBtn");
settingBtn.addEventListener("click", settingProfile);

let notificationBtn = document.querySelector("#notificationBtn");
notificationBtn.addEventListener("click", settingNotification);

let discussionBtn = document.querySelector("#discussionBtn");
discussionBtn.addEventListener("click", settingMembers);

const userLogOut = () => {
  signOut(auth)
    .then(() => {
      window.location = "./index.html";
    })
    .catch((error) => {});
};

logOut.addEventListener("click", userLogOut);

window.verifyEmail = verifyEmail;
window.settingProfile = settingProfile;
