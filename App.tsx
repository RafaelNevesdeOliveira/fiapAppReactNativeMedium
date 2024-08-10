import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";

const StackNavigation = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation.Navigator initialRouteName="Home">
        <StackNavigation.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            header: () => <Header title="Home" onMenuPress={() => {}}/>,
          })}
        />
      </StackNavigation.Navigator>
    </NavigationContainer>
  );
}
