import * as firebase from 'firebase';
import Swal from 'sweetalert2'


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

/// Resturant Info saver func
function AddInfo(img, RestInfo) {
  var userId = firebase.auth().currentUser.uid;
  console.log(img, RestInfo)
  for (var i = 0; i < 2; i++) {
    if (i !== 0) {
      console.log(i, "cert")
      storageRef.child(`images/${img[0].name}`).put(img[0])
        .then((snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((snapUrl) => {
              RestInfo.imageUrlCerti = snapUrl;
              db.ref('RestInfo/' + userId).set(RestInfo)
            })
        })
    } else {
      console.log(i, "profile")
      storageRef.child(`images/${img[1].name}`).put(img[1])
        .then((snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((snapUrl) => {
              RestInfo.imageUrlProfile = snapUrl;
            })
        })
    }
  }
  db.ref('RestInfo/' + userId).set(RestInfo)
}


/// User Info saver func
function userAddInfo(img, userInfo) {
  var userId = firebase.auth().currentUser.uid;
  console.log(img, userInfo)
  storageRef.child(`images/${img.name}`).put(img)
    .then((snapshot) => {
      snapshot.ref.getDownloadURL()
        .then((snapUrl) => {
          userInfo.imageUrlProfile = snapUrl;
          db.ref('userInfo/' + userId).set(userInfo)
        })
    })
  db.ref('userInfo/' + userId).set(userInfo)
  //console.log(img)
}


function addLocation(ac, location) {
  var userId = firebase.auth().currentUser.uid;
  if (ac === 'User') {
    db.ref('location/').child("User/" + userId).set(location)
  } else {
    db.ref('location/').child("rest/" + userId).set(location)
  }
}


function addDish(dishImg, RestDishesData) {
  var userId = firebase.auth().currentUser.uid;
  storageRef.child(`DishImages/${dishImg.name}`).put(dishImg)
    .then((snapshot) => {
      snapshot.ref.getDownloadURL()
        .then((snapUrl) => {
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


//////////////<<<<<<<<<<<>>>>>>>>>>>>>>>>>>////// Geting Data Function\\\\\\\\<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var productArray = [];

function getDishes() {

  productArray = [];
  return new Promise((resolve, reject) => {
    db.ref('RestDishes/').once("value")
      .then(res => res.val())
      .then(res => {
        for (var key in res) {
          const dishesList = res[key]
          for (var listkey in dishesList) {
            productArray.push(dishesList[listkey])
            dishesList[listkey].rest_uid = key;
            dishesList[listkey].dish_id = listkey;

             //console.log(productArray)
            }
            
          }
          productArray.map((restdetail)=>{return(
            db.ref('users/').once("value")
            .then(restinfo => restinfo.val())
            .then((restinfo)=>{
              for(var rk in restinfo){
                if(rk === restdetail.rest_uid){
                 restdetail.rest_Name = restinfo[rk].resturantName
                  restdetail.owner_Name = restinfo[rk].firstName +" "+restinfo[rk].lastName
                  restdetail.email = restinfo[rk].email
                }
              }
            })

          )})
      })
      .then(() => {
        resolve(productArray)
      }).catch(e => {
        reject({ message: e })
      })
  })
}



////////////////////////////////// Ordered Booked By user

function orderBooked(orderObj) {
  var userId = firebase.auth().currentUser.uid;
  return new Promise((resolve, reject) => {
    db.ref('users/').once("value")
      .then(res => res.val())
      .then(res => {
        for (var key in res) {
          if (key === userId) {
            orderObj.firstName = res[key].firstName
            orderObj.lastName = res[key].lastName
            orderObj.email = res[key].email
            console.log(orderObj)
          }
        }
      }).then(() => {
        db.ref('userInfo/').once("value")
          .then(res => res.val())
          .then((res) => {
            for (var key2 in res) {
              if (key2 === userId) {
                orderObj.contact = res[key2].contact
                orderObj.country = res[key2].country
                orderObj.city = res[key2].city
                console.log(res[key2])
              }
            } 
          })
          .then(() => {
            orderObj.user_uid = userId;
            db.ref(`orders/pendding/${orderObj.rest_uid}/`).push(orderObj)
            
          })
      })
   // console.log("data has reached in fire base", orderObj)
  });
}


/////////////////////// order get From Pendding node
var po = [];
function getPenddingOrder(){
   po = [];
  var userId = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
    db.ref(`orders/pendding/`).once("value")
      .then(res => res.val())
      .then((res)=>{
          
        for(var pkey in res){
          if(pkey === userId){
            for(var dpk in res[pkey]){
              po.push(res[pkey][dpk])
              res[pkey][dpk].pDishKey = dpk;
              //resolve(res[pkey][dpk])
              
            }            
          }
        }   
            resolve(po)
            
      }).catch(e =>{
        reject({message : e})
      })
    })
}



//////////////// send to In progress table

function sendToProgress(rest_uid,pDishKey,user_uid,item) {
  db.ref(`orders/inprogress/${rest_uid}/${pDishKey}/`).set(item)
  .then(()=>{
    db.ref(`status/${user_uid}`).update({status:'In Progress'})
  }).then(()=>{
    db.ref(`orders/pendding/${rest_uid}/${pDishKey}/`).remove()
  })
  //console.log(rest_uid,pDishKey,user_uid,"yyyyyyy")
}



/////////////////// getting data for In progress Table
var inpro = [];
function getInprogressOrder(){
   inpro = [];
  var userId = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
    db.ref(`orders/inprogress/`).once("value")
      .then(res => res.val())
      .then((res)=>{
          
        for(var pkey in res){
          if(pkey === userId){
            for(var dpk in res[pkey]){
              inpro.push(res[pkey][dpk])
                            
            }            
          }
        }   
            resolve(inpro)
            
      }).catch(e =>{
        reject({message : e})
      })
    })
}


///// sent to Delivered Node
function sendToDelivery(rest_uid,pDishKey,user_uid,item) {
  item.deliveredTime = firebase.database.ServerValue.TIMESTAMP;
  db.ref(`orders/delivered/${rest_uid}/${pDishKey}/`).set(item)
  .then(()=>{
    db.ref(`status/${user_uid}`).update({status:'Delivered'})
  }).then(()=>{
    db.ref(`orders/inprogress/${rest_uid}/${pDishKey}/`).remove()
  })
 
}




/////////////////// getting data for In progress Table
var delivered = [];
function getDelivered(){
  delivered = [];
  var userId = firebase.auth().currentUser.uid;
    return new Promise((resolve, reject) => {
    db.ref(`orders/delivered/`).once("value")
      .then(res => res.val())
      .then((res)=>{
          
        for(var pkey in res){
          if(pkey === userId){
            for(var dpk in res[pkey]){
              delivered.push(res[pkey][dpk])
                            
            }            
          }
        }   
            resolve(delivered)
            console.log(delivered,",,,,,,,,,,,,")
      }).catch(e =>{
        reject({message : e})
      })
    })
}











export {
  registration,
  getResturantName,
  login,
  checkAccountTpye,
  logout,
  addDish,
  AddInfo,
  userAddInfo,
  addLocation,
  getDishes,
  orderBooked,
  getPenddingOrder,
  po,
  sendToProgress,
  getInprogressOrder,
  sendToDelivery,
  getDelivered,

}



