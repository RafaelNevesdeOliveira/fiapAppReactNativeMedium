import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Geolocalizacao from "./src/Geolocation";
import RegisterUser from "./src/Register";
import Login from "./src/Login";
import { store } from "./src/utils/store";
import { Provider } from "react-redux";

const StackNavigation = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation.Navigator initialRouteName="Login">
          <StackNavigation.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
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
              header: () => (
                <Header
                  title="Geolocalização"
                  onMenuPress={() => {}}
                  canGoBack={navigation.canGoBack()}
                />
              ),
              footer: () => <Footer navigation={navigation} />,
            })}
          />
          <StackNavigation.Screen
            name="RegisterUser"
            component={RegisterUser}
            options={({ navigation }) => ({
              header: () => (
                <Header
                  title="RegisterUser"
                  onMenuPress={() => {}}
                  canGoBack={navigation.canGoBack()}
                />
              ),
              footer: () => <Footer navigation={navigation} />,
            })}
          />
        </StackNavigation.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
