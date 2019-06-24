import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCIlXs3ooV8J0RlymlkSJjqFAeIVlgU5OY",
  authDomain: "foodapplication-9ab56.firebaseapp.com",
  databaseURL: "https://foodapplication-9ab56.firebaseio.com",
  projectId: "foodapplication-9ab56",
  storageBucket: "foodapplication-9ab56.appspot.com",
  messagingSenderId: "684846882789",
  appId: "1:684846882789:web:a04d3c5439d19d57"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


/// DataBase Ref variable
var db = firebase.database();

// Create a root reference
var storageRef = firebase.storage().ref();


// Registration function
function registration(email, password, userData) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      var userId = firebase.auth().currentUser.uid;

      db.ref(`users/` + userId).set(userData)

      //console.log(userData.acountType)
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage)
    });
}

///this function create for check Resturant Exiect or Not
function getResturantName(userId) {
  return new Promise((resolve, reject) => {
    db.ref('users/').once("value")
      .then(res => res.val())
      .then(res => {
        resolve(res)
      }).catch(e => {
        reject({ message: e })
      })
  })
}


//ckech funcation account type frome Firebase
function checkAccountTpye(userId) {
  return new Promise((resolve, reject) => {
    db.ref('users/' + userId).once("value")
      .then(res => res.val())
      .then(res => {
        resolve(res)
      }).catch(e => {
        reject({ message: e })
      })
  })
}



// Login Fuction created
function login(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        resolve(user)
      }).catch(e => {
        reject('mssage')
      }
      )
  })

}


function AddInfo(img, RestInfo) {
  var userId = firebase.auth().currentUser.uid;
  console.log(img, RestInfo)
  for (var i = 0; i < 2; i++) {
    if (i !== 0) {
      console.log(i, "cert")
      storageRef.child(`images/${img[0].name}`).put(img[0])
      .then((snapshot)=>{
        snapshot.ref.getDownloadURL()
        .then((snapUrl)=>{
             RestInfo.imageUrlCerti = snapUrl; 
             db.ref('RestInfo/' + userId).set(RestInfo) 
        })
      })
    } else {
      console.log(i, "profile")
        storageRef.child(`images/${img[1].name}`).put(img[1])
    .then((snapshot)=>{
      snapshot.ref.getDownloadURL()
      .then((snapUrl)=>{
           RestInfo.imageUrlProfile = snapUrl;  
      })
    })
    }
  }
   db.ref('RestInfo/' + userId).set(RestInfo)
}

function addLocation(location){
  var userId = firebase.auth().currentUser.uid;
  db.ref('location/').child("rest/" + userId).set(location) 
}

function addDish(dishImg,RestDishesData) {
  var userId = firebase.auth().currentUser.uid;
  storageRef.child(`DishImages/${dishImg.name}`).put(dishImg)
  .then((snapshot)=>{
    snapshot.ref.getDownloadURL()
    .then((snapUrl)=>{
      RestDishesData.imageUrl = snapUrl;
      db.ref("RestDishes/" + userId).push(RestDishesData)
    })
  })
 
}






function logout(props) {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    props.history.push('/Login')

  }).catch(function (error) {
    // An error happened.
  });

}


export {
  registration,
  getResturantName,
  login,
  checkAccountTpye,
  logout,
  addDish,
  AddInfo,
  addLocation,
}