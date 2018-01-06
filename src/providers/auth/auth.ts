import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  authData = firebase.database().ref('/user');
  constructor(public afireauth: AngularFireAuth) {
  }

  signup(user){
    var promise =  new Promise((resolve, reject) =>{
      this.afireauth.auth.createUserWithEmailAndPassword(user.email, user.password).then(() =>{
        this.afireauth.auth.currentUser.updateProfile({
          displayName: user.name,
          photoURL: user.photo
        }).then(() =>{
          this.authData.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: user.name,
            photoURL: user.photo
          }).then(() =>{
            resolve({successSet: true});
          }).catch((err) =>{
            resolve({failSet: true});
          })
        }).catch((err) =>{
          resolve({failUpdate: true})
        })
      }).catch((err) =>{
        resolve({failCreate: true});
      })
    })

    return promise;
  }

  login(email, password){
    var promise = new Promise((resolve, reject) =>{
      this.afireauth.auth.signInWithEmailAndPassword(email, password).then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve({failLogin: true});
      })
    })

    return promise;
  }

  recoverPassword(email){
    var promise = new Promise((resolve, reject) =>{
      firebase.auth().sendPasswordResetEmail(email).then(() =>{
        resolve({success: true});
      }).catch((err) =>{
        resolve({failRecover: true});
      })
    })

    return promise;
  }

  getuser(){
    var promise = new Promise((resolve, reject) =>{
      this.authData.child(firebase.auth().currentUser.uid).once('value', (snapshot) =>{
        let data = snapshot.val();
        resolve(data);
      }).catch((err) =>{
        resolve({fail: true});
      })
    })

    return promise;
  }
}