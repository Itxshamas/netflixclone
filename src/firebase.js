
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAKz6a1RttDuQsMypwHEIZlbikRFcncAII",
  authDomain: "netflix-clone-fe82a.firebaseapp.com",
  projectId: "netflix-clone-fe82a",
  storageBucket: "netflix-clone-fe82a.firebasestorage.app",
  messagingSenderId: "314397479429",
  appId: "1:314397479429:web:20b2c7e003b7b8accac26c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const signup =  async (name, email, password)=>{
  try {
   const res= await createUserWithEmailAndPassword(auth, email, password)
   const user= res.user;
   await addDoc(collection(db, "user"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
    
   })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));


  }
}

const login =async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    toast.error(error.error.split('/')[1].split('-').join(" "));

    
  }
}
const logout= async ()=>{
    signOut(auth);
}
export{auth, db, login, signup, logout};