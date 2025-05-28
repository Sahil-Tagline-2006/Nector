import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from '@react-native-firebase/auth';
import {
  getFirestore,
  setDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from '@react-native-firebase/firestore';
import {cartType, orderType, productType} from '../utils/common/types';

const auth = getAuth();
const firestore = getFirestore();

// common function
const SelectDocRef = (DBcollection: string, DBdoc: string) => {
  return doc(firestore, DBcollection, DBdoc);
  // return doc(collection(firestore, DBcollection), DBdoc);
};

const Get_User_From_FireStore = async (userid: string): Promise<any> => {
  try {
    const docRef = SelectDocRef('Users', userid);
    const userData = getDoc(docRef);
    return userData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Firebase_Google_Auth = async (token: string): Promise<any> => {
  try {
    const googleCredential = GoogleAuthProvider.credential(token);
    return signInWithCredential(getAuth(), googleCredential);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Firebase_Facebook_Auth = async (
  token: string,
  nonce: any = null,
): Promise<any> => {
  try {
    const facebookCredential = FacebookAuthProvider.credential(token, nonce);
    return signInWithCredential(getAuth(), facebookCredential);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Create_User_Email_Password = async (
  email: string,
  password: string,
): Promise<any> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const SignIn_User_Email_Password = async (
  email: string,
  password: string,
): Promise<any> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Store_User_FireStore = async (
  userDetails: any,
  userid: string,
): Promise<any> => {
  try {
    const docRef = SelectDocRef('Users', userid);
    const userData = setDoc(docRef, userDetails);

    return userData;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Store_User_Favorites = async (
  product: productType,
  userid: string,
): Promise<any> => {
  try {
    const SubdocRef = doc(firestore, 'Users', userid, 'Favorites', product.id);
    const response = await setDoc(SubdocRef, product);

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Store_User_Orders = async (
  data: orderType,
  userid: string,
): Promise<any> => {
  try {
    const orderDocRef: any = doc(
      firestore,
      'Users',
      userid,
      'Orders',
      data.id,
    );
    
    const response = await setDoc(orderDocRef, data);

    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const Store_User_Cart = async (
  product: cartType,
  userid: string,
): Promise<any> => {
  try {
    const SubdocRef = doc(firestore, 'Users', userid, 'Cart', product.id);
    const response = await setDoc(SubdocRef, product);

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Add_All_to_Cart = async (
  userid: string,
  cart: cartType[],
): Promise<any> => {
  try {
    const SubCollRef = collection(firestore, 'Users', userid, 'Favorites');
    const snapshot = await getDocs(SubCollRef);

    snapshot.docs.forEach(async (doc: any) => {
      const exsistedProductInCart = cart.find(ele => ele.id === doc.data().id);

      await Store_User_Cart(
        {
          ...doc.data(),
          quantity: exsistedProductInCart
            ? exsistedProductInCart.quantity + 1
            : 1,
        },
        userid,
      );
      await Delete_User_Favorites(doc.data(), userid);
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const Delete_User_Favorites = async (
  product: productType,
  userid: string,
): Promise<any> => {
  try {
    console.log(userid);
    const SubdocRef = doc(firestore, 'Users', userid, 'Favorites', product.id);
    const response = await deleteDoc(SubdocRef);

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Delete_User_Order = async (
  order: orderType,
  userid: string,
): Promise<any> => {
  try {
    console.log(userid);
    const SubdocRef = doc(firestore, 'Users', userid, 'Orders', order.id);
    const response = await deleteDoc(SubdocRef);

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const Delete_User_Cart = async (
  product: cartType,
  userid: string,
): Promise<any> => {
  try {
    console.log(userid);
    const SubdocRef = doc(firestore, 'Users', userid, 'Cart', product.id);
    const response = await deleteDoc(SubdocRef);

    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Get_User_Favorites = async (userid: string): Promise<any> => {
  try {
    const SubCollRef = collection(firestore, 'Users', userid, 'Favorites');
    const snapshot = await getDocs(SubCollRef);

    const documents = snapshot.docs.map(doc => doc.data());

    return documents;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Get_User_Cart = async (userid: string): Promise<any> => {
  try {
    const SubCollRef = collection(firestore, 'Users', userid, 'Cart');
    const snapshot = await getDocs(SubCollRef);

    const documents = snapshot.docs.map(doc => doc.data());

    return documents;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const Get_User_Orders = async (userid: string): Promise<any> => {
  try {
    const SubCollRef = collection(firestore, 'Users', userid, 'Orders');
    const snapshot = await getDocs(SubCollRef);

    const documents = snapshot.docs.map(doc => doc.data());

    return documents;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  Create_User_Email_Password,
  Store_User_FireStore,
  Store_User_Favorites,
  Store_User_Cart,
  Store_User_Orders,
  Add_All_to_Cart,
  Delete_User_Favorites,
  Delete_User_Cart,
  Delete_User_Order,
  Get_User_Favorites,
  Get_User_Cart,
  Get_User_Orders,
  SignIn_User_Email_Password,
  Get_User_From_FireStore,
  Firebase_Google_Auth,
  Firebase_Facebook_Auth,
};
