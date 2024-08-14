import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import {db}  from '../config/firebase'

export interface Car {
  id: string;
  name: string;
  year: number;
  image: string;
}

const carCollection = collection(db, 'cars')

export const fetchCars = async () => {
  try {
    const querySnapshot = await getDocs(carCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Car[];
  } catch (e) {
    console.error("Erro ao buscar carros: ", e);
    return [];
  }
};

export const addCar = async (car: Partial<Car>) => {
  try {
    const docRef = await addDoc(carCollection, {
      name: car.name,
      year: car.year,
      image: car.image,
    });

    
    await updateDoc(docRef, { id: docRef.id });

    console.log("Carro adicionado com ID: ", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar carro: ", e);
    throw new Error("Failed to add car");
  }
};

export const updateCar = async (id: string, updatedCar: Partial<Car>) => {
  const carRef = doc(db, 'cars', id);
  try {
    await updateDoc(carRef, updatedCar);
    console.log("Carro atualizado com sucesso");
  } catch (e) {
    console.error("Erro ao atualizar carro: ", e);
    throw new Error("Failed to update car");
  }
};

export const deleteCar = async (id: string) => {
  try {
    const carRef = doc(db, 'cars', id);
    await deleteDoc(carRef);
    console.log(`Car with ID ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting car:", error);
    throw new Error("Failed to delete car");
  }
};

