// GENERAL
import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View, ScrollView, ImageBackground, PermissionsAndroid, ToastAndroid } from 'react-native';
import { Image } from 'react-native';

// HEATMAP IMPORTS
import HeatMap from 'react-native-heatmap-chart';

// NAVIGATION IMPORTS
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// ICON IMPORTS
import map from './icons/map1.png';
import log from './icons/log.png';
import recycle from './icons/recycle.png';
import arrow from './icons/7arrow.png';
import button from './icons/Ellipse29.png';
import turtle from './icons/turtle.png';
import nametag from './icons/nametag.png';

// OTHER
import styles from './Styles';

const Stack = createNativeStackNavigator();

const NavBar = (props) => {
  const listItems = props.images.map((image, index) => (
    <NavItem
      image={image}
      width={42}
      height={49}
      label={props.labels[index]}
      key={index}
    />
  ));

  return <View style={styles.rectangle}>{listItems}</View>;
};
function NavItem(props) {
  var style = {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  };

  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(props.label)}>
      <View style={style}>
        <Iconoclast
          imgUri={props.image}
          width={props.width}
          height={props.height}
          label={props.label}
        />
        {/* <Link to=""/> */}
        <Label label={props.label} />
      </View>
    </TouchableOpacity>
  );
}
function Iconoclast(props) {
  return (
    <View>
      <ImageBackground source={button} style={styles.navlog}>
        <Image
          source={props.imgUri}
          style={{
            width: props.width,
            height: props.height,
            marginTop: -10,
          }}
        ></Image>
      </ImageBackground>
    </View>
  );
}
function Label(props) {
  return (
    <ImageBackground
      source={nametag}
      style={{
        width: 69.34,
        height: 18.13,
      }}
    >
      <Text style={styles.label}>{props.label}</Text>
    </ImageBackground>
  );
}

const HomeScreen = (props) => {

  // const [totalCnt, setTotalCnt] = useState(3);
  // useEffect(() => {
  //   // getData(setTotalCnt);
  //   console.log("HOMESCREEN: ", totalCnt);
  // }, []);

  const t = parseInt(10 / 3) // totalCnt/3
  const con = []
  for (let i = 0; i < 3; i++) {
    con.push(<Image key={i} source={turtle} />);
  }
  const values = [0, 4, 6, 1, 7, 3, 0, 8, 6, 2, 0, 10, 20, 12, 0, 0, 10, 0, 17, 8, 0, 6, 0, 6, 10, 23, 0, 6, 10, 23] // getData()
  const colors = ['#504f55', '#655488', '#9F7DE1', '#FFFFFF']
  
  return (
    <View>
      <View style={styles.home_container}>
        <ScrollView>
          <View style={styles.home_log}>
            <Text style={styles.home_text}> You have saved {JSON.stringify(3)} turtles </Text>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {/* {con} */}
              <Image key={1} source={turtle} />
            </View>
          </View>
          <Text style={styles.home_text}> Heatmap for last {values.length} days </Text>
          <TouchableOpacity>
            <ScrollView style={styles.heatmap}>
              <HeatMap numberOfLines={parseInt(values.length / 7) + 1} values={values} blocksSize={20} colors={colors} />
            </ScrollView>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <NavBar images={[map, log, recycle]} labels={['MAP', 'LOG', 'CLASSIFY']} />
    </View>
  );
}

export default function App() {
  // useEffect(() => { // creates Logs table upon initialization of App
  //   createTable();
  // });

  // const createTable = () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "CREATE TABLE IF NOT EXISTS "
  //       + "Logs2 "
  //       + "(Date INTEGER, Label STRING, Image STRING);"
  //     )
  //   })
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HOME"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#36425C",
          },
          headerTintColor: "#BED751",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          style={styles.container}
          name="HOME"
          component={HomeScreen}
        />
        {/* <Stack.Screen
          style={styles.container}
          name="CLASSIFY"
          component={ClassifyPane}
        />
        <Stack.Screen
          style={styles.container}
          name="LOG"
          component={LogScreen}
        />
        <Stack.Screen
          style={styles.container}
          name="MAP"
          component={MapScreenSelection}
        />
        <Stack.Screen
          style={styles.container}
          name="Map Screen"
          component={MapScreen}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}