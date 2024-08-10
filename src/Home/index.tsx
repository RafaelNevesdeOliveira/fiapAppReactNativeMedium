import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  ListRenderItem,
} from "react-native";
import { carData, Car } from "../../assets/data/carData";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import Footer from "../components/Footer";

export default function Home() {
  const [data, setData] = useState<Car[]>(carData.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleGoToGeolocation = () => {
    navigation.navigate('Geolocation');
  };

  const renderItem: ListRenderItem<Car> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.year}>{item.year}</Text>
    </View>
  );

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

  return (
    <View>
      <View>
        <Button title="Geolocalização" onPress={handleGoToGeolocation}/>
      </View>
      <Text style={styles.sectionTitle}>Carros</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />
      <Footer navigation={navigation} />
    </View>
  );
}
