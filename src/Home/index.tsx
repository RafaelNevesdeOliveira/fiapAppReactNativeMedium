import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  ListRenderItem,
  Alert,
  TextInput,
} from "react-native";
import { carData, Car } from "../../assets/data/carData";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import Footer from "../components/Footer";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { addCar, deleteCar, fetchCars, updateCar } from "../service/carService";

export default function Home() {
  const [data, setData] = useState<Car[]>(carData.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentCar, setCurrentCar] = useState<Partial<Car>>({});
  const [carIdToUpdate, setCarIdToUpdate] = useState<string | null>(null);
  const navigation = useNavigation();

  // const handleGoToGeolocation = () => {
  //   navigation.navigate('Geolocation');
  // };

  useEffect(()=>{
    const loadCars = async ()=>{
      const cars = await fetchCars()
      setData(cars)
    };
    loadCars()
  }, [])

  const handleAddCar = () =>{
    setIsAdding(true);
    setCurrentCar({}) 
  }

  const handleSaveCar = async () =>{
    if(isAdding){
      const newCar: Partial<Car> = {
        name: currentCar.name!,
        year: currentCar.year!,
        image: currentCar.image!
      }
      await addCar(newCar)
    }else if(isUpdating && carIdToUpdate){
      const updatedCar: Partial<Car> = {
        name: currentCar.name,
        year: currentCar.year,
        image: currentCar.image,
      };
      await updateCar(carIdToUpdate, updatedCar);
    }
    setIsAdding(false);
    setIsUpdating(false);
    setCurrentCar({});
    setCarIdToUpdate(null);
    setData( await fetchCars())
  }

  const handleUpdateCar = (id: string) =>{
    const carToEdit = data.find(car => car.id === id);
    if(carToEdit){
      setCurrentCar((carToEdit))
      setCarIdToUpdate(id)
      setIsUpdating(true)
    }
  }

  const handleDeleteCar = async (id: string) => {
    await deleteCar(id);
    setData(await fetchCars())
  }

  const loadMoreData = () => {
    if (loading) return;

    setLoading(true);
    const newData = carData.slice(data.length, data.length + 1); // Carrega mais 3 itens
    setTimeout(() => {
      // Simula um tempo de carregamento
      setData([...data, ...newData]);
      setLoading(false);
    }, 1000);
  };

  const renderItem: ListRenderItem<Car> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.image || 'https://example.com/placeholder.png' }}
        style={styles.image}
        onError={() => Alert.alert('Erro ao carregar imagem')}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.year}>{item.year}</Text>
      <Button title="Update" onPress={() => handleUpdateCar(item.id)} />
      <Button title="Delete" onPress={() => handleDeleteCar(item.id)} />
    </View>
  );

  const handleLogout = async () =>{
    await signOut(auth)
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapp}>
        {isAdding || isUpdating ? (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={currentCar.name || ''}
              onChangeText={(text) => setCurrentCar({ ...currentCar, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Year"
              value={currentCar.year ? String(currentCar.year) : ''}
              keyboardType="numeric"
              onChangeText={(text) => setCurrentCar({ ...currentCar, year: parseInt(text) })}
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              value={currentCar.image || ''}
              onChangeText={(text) => setCurrentCar({ ...currentCar, image: text })}
            />
            <Button title="Save" onPress={handleSaveCar} />
            <Button title="Cancel" onPress={() => { setIsAdding(false); setIsUpdating(false); setCurrentCar({}); }} />
          </View>
        ) : (
          <>
            <Button title="Add Car" onPress={handleAddCar} />
            <Text style={styles.sectionTitle}>Carros</Text>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loading ? <Text>Loading...</Text> : null}
            />
          </>
        )}
      </View>
      <Footer />
    </View>
  );
}
