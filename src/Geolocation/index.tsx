import React, { useState } from "react";
import { View, Button } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import MapView, { Marker } from "react-native-maps";
import { styles } from "./styles";
import Footer from "../components/Footer";

const GOOGLE_API_KEY = 'AIzaSyBZRDxn0MwNMsSEqShxtve3CQyUnVnn17M'

export default function Geolocalizacao() {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleGetCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        setLocation((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        try {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`);
          const data = await response.json();

          if (data.results.length > 0) {
            const address = data.results[0].formatted_address;
            console.log("Endereço atual:", address);
          } else {
            console.log("Nenhum resultado encontrado");
          }
        } catch (error) {
          console.error("Erro ao obter o endereço da API do Google", error);
        }
      },
      (error) => {
        console.error("Erro ao obter localização", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };


  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location}>
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Você está aqui"
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button
          title="Pegar Localização Atual"
          onPress={handleGetCurrentLocation}
        />
      </View>
      <Footer navigation={""} />
    </View>
  );
}
