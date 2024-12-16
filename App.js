import React from 'react';
import 'react-native-gesture-handler';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view';


// AppBar Component
function AppBar({ title }) {
  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>{title}</Text>
    </View>
  );
}
// SwipeList Component (simulating swipe-to-delete functionality)
function SwipeList() {
  const data = [
    { key: '1', text: 'Pizza Margherita', image: 'https://via.placeholder.com/150/FF5733' },
    { key: '2', text: 'Pasta Carbonara', image: 'https://via.placeholder.com/150/FFC300' },
    { key: '3', text: 'Tacos al Pastor', image: 'https://via.placeholder.com/150/DAF7A6' },
    { key: '4', text: 'Sopa de Tomate', image: 'https://via.placeholder.com/150/900C3F' },
  ];
  const renderItem = (data) => (
    <View style={styles.listItem}>
      <Image source={{ uri: data.item.image }} style={styles.foodImage} />
      <Text style={styles.listItemText}>{data.item.text}</Text>
    </View>
  );
  const renderHiddenItem = () => (
    <View style={styles.hiddenItem}>
      <Text style={styles.hiddenItemText}>Eliminar</Text>
    </View>
  );

  return (
    <SwipeListView
      data={data}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
      disableRightSwipe
      closeOnRowPress
    />
  );
}

// Drawer Navigator Screens
const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#6200EE', height: 60 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ddd',
      }}
    >
      <Tab.Screen
        name="Favoritos"
        component={SwipeList}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          header: ({ options }) => <AppBar title={options.title || 'Recetas'} />,
          drawerStyle: {
            backgroundColor: '#6200EE',
            width: 240,
          },
          drawerLabelStyle: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen name="Inicio" component={HomeTabs} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  appBar: {
    height: 70,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  appBarTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3, // Shadow effect for Android
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  listItemText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  hiddenItem: {
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
    height: '100%',
    marginLeft: 15,
  },
  hiddenItemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});