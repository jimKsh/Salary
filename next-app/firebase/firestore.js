import firebaseApp from "./firebaseApp";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export class ColInstanse {
  constructor (collectionName) {
    this.collectionName = collectionName
  }

  async get (id) {
    try {
      const docRef = doc(firestore, this.collectionName, id)
      const data = await getDoc(docRef)
      return { ...data.data(), id: data.id }
    }
    catch (err) {
      console.log(err)
    }
    return null
  }

  async getAll () {
    try {
      const colRef = collection(firestore, this.collectionName);
      const rawData = await getDocs(colRef);
      const data = rawData.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      return data;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  async add (data)  {
    try {
      const colRef = collection(firestore, this.collectionName);
      const newData = await addDoc(colRef, data);
      return { ...data, id: newData.id };
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  async update (id, data) {
    try {
      const docRef = doc(firestore, this.collectionName, id)
      await updateDoc(docRef, data)
      return { ...data, id: id }
    }
    catch (err) {
      console.log(err)
    }
    return null
  }

  async delete (id) {
    try {
      const docRef = doc(firestore, this.collectionName, id)
      await deleteDoc(docRef)
      return { }
    }
    catch (err) {
      console.log(err)
    }
    return null
  }

  async query (field, value) {
    try {
      const colRef = collection(firestore, this.collectionName);
      const q = query(colRef, where(field, "==", value))
      const rawData = await getDocs(q)
      const data = rawData.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      return data;
    }
    catch (err) {
      console.log(err)
    }
    return null
  }
}