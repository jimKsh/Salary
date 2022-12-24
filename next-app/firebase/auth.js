import {
  getAuth,
  createUserWithEmailAndPassword,
  checkActionCode,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "./firebaseApp";

const auth = getAuth(firebaseApp);

export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential) {
      console.log(userCredential.user);
      return userCredential.user;
    }
  } catch (err) {
    console.log(err);
    if (err.code == AuthErrorCodes.EMAIL_EXISTS) {
      console.log(AuthErrorCodes.EMAIL_EXISTS);
    }
  }
  return null;
};

export const checkObbCode = async (obbCode) => {
  const res = await checkActionCode(auth, obbCode);
};


export const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res
  }
  catch (err) {
    return null
  }

}