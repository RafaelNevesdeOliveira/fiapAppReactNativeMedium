import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCSoWhDLdjZIKDdJSlKcZduWz6bjQ-TEbU",
  authDomain: "appfiap-86e90.firebaseapp.com",
  projectId: "appreactnativemedium",
  storageBucket: "appreactnativemedium.appspot.com",
  messagingSenderId: "867621370014",
  appId: "1:867621370014:ios:e78d615fdd4a3fb138238f",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app)

export { auth };
