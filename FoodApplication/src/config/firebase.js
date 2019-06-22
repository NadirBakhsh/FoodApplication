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
      }