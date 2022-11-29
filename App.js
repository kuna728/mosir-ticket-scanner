import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TopBar from "./components/TopBar";
import Constants from 'expo-constants';
import LoginView from "./views/LoginView";
import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeView from "./views/HomeView";
import ScanView from "./views/ScanView";
import TicketView from "./views/TicketView";
import moment from "moment";
import 'moment/locale/pl';
import AuthProvider from "./auth/AuthProvider";

const Stack = createNativeStackNavigator();

moment.locale('pl')

export default function App() {
  return (
  <AuthProvider>
    <View style={styles.container}>
      <View style={styles.statusBar} />
      <TopBar />
        <NavigationContainer>
            <Stack.Navigator   screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Login" component={LoginView} />
                <Stack.Screen name="Home" component={HomeView} />
                <Stack.Screen name="Scan" component={ScanView} />
                <Stack.Screen name="Ticket" component={TicketView} />
            </Stack.Navigator>
        </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  </AuthProvider>
  );
}

  const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: '#1976d2',
      height: Constants.statusBarHeight
    },
    container: {
      flex: 1
    }
  });
