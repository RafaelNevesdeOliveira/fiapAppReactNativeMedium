import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Geolocalizacao from "./src/Geolocation";

const StackNavigation = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator initialRouteName="Home">
        <StackNavigation.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            header: () => <Header title="Home" onMenuPress={() => {}} />,
          })}
        />
        <StackNavigation.Screen 
          name="Geolocation" 
          component={Geolocalizacao} 
          options={({ navigation }) => ({
            header: () => <Header title="Geolocalização" onMenuPress={() => {}} canGoBack={navigation.canGoBack()} />,
            footer: () => <Footer navigation={navigation} />,
          })}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}
