import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface User {
  id: string;   
  name: string;
  email: string;
}

const userCollection = collection(db, 'users');

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  try {
    const docRef = await addDoc(userCollection, user);
    return { ...user, id: docRef.id };
  }catch(error){
    console.error("Erro ao adicionar usuário: ", error);
    throw new Error("Failed to add user");
  }
}

export const fetchUsers = async (): Promise<User[]> => {
  try{
    const querySnapshot = await getDocs(userCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data(),    
    })) as User[]
  }catch(error){
    console.error("Erro ao buscar usuários: ", error);
    return [];
  }
}