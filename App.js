// GENERAL
import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View, ScrollView, ImageBackground, PermissionsAndroid, ToastAndroid } from 'react-native';
import { Image } from 'react-native';

// HEATMAP IMPORTS
import HeatMap from 'react-native-heatmap-chart';

// CALENDAR IMPORTS
import DatePicker from 'react-native-datepicker';

// CAMERA IMPORTS
import { Camera} from 'expo-camera';

// NAVIGATION IMPORTS
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// ICON IMPORTS
import map from './icons/map1.png';
import log from './icons/log.png';
import home from './icons/home2.png';
import recycle from './icons/recycle.png';
import arrow from './icons/7arrow.png';
import button from './icons/Ellipse29.png';
import turtle from './icons/turtle.png';
import nametag from './icons/nametag.png';

// OTHER
import styles from './styles';

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
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const d = new Date();
let name = month[d.getMonth()];

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
  const values = [] // getData()
  for (let i = 0; i < days[d.getMonth()]; i++) {
    values.push(Math.floor(Math.random() * 30)+1);
  }
  const colors = ['#504f55', '#655488', '#9F7DE1', '#FFFFFF']
  
  return (
    <View>
      <View style={styles.home_container}>
        <ScrollView>
          <View style={styles.home_log}>
            <Text style={styles.home_text}> You saved {JSON.stringify(3)} turtles </Text>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
              {con}
            </View>
          </View>
          <Text style={styles.home_text}> Heatmap for {name} </Text>
          <TouchableOpacity>
            <View style={styles.heatmap}>
              <HeatMap numberOfLines={5} values={values} blocksSize={47} colors={colors} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <NavBar images={[map, log, recycle]} labels={['MAP', 'LOG', 'CLASSIFY']} />
    </View>
  );
}

const LogScreen = (props) => {
  // const [data, setD] = useState("");
  // var datas = []

  // useEffect(()=> {
  //   getData(setD);
  //   console.log("LOG: ", data);
  // }, []);

  // const resolve_func = (data2) =>{
  //   console.log(data2)
    
  // }
  // getData(resolve_func)
  const [date, setDate] = useState((d.getMonth()+1)+'-'+d.getDate()+'-'+d.getFullYear());

  return (
    <View style={styles.home_container}>
      <ScrollView> 
        <View style={styles.calendar_container}>
          <Text style={styles.lotText}>Select a Date :</Text>
          <DatePicker
            style={styles.datePickerStyle}
            date={date}
            mode="date"
            placeholder="MM-DD-YYYY"
            format="MM/DD/YYYY"
            minDate="01-01-2022"
            maxDate="06-01-2022"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                right: -5,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                borderColor : "gray",
                alignItems: "flex-start",
                borderWidth: 0,
                borderBottomWidth: 1,
              },
              dateText: {
                fontSize: 17,
                color: "black",
              }
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>
        <View style={styles.log_box}>
          <Text style={styles.logText}>Date: {date}</Text>
          <Text style={styles.logText2}>Classification:</Text>
          <Text style={styles.logText2}>Cardboard - 85.42313193206787%</Text>
          <Image style={styles.logImg} source={require("./icons/cardboard.png")}></Image>
        </View>
        <View style={styles.log_box}>
          <Text style={styles.logText}>Date: {date}</Text>
          <Text style={styles.logText2}>Classification:</Text>
          <Text style={styles.logText2}>Plastic - 86.454645193206787%</Text>
          <Image style={styles.logImg} source={require("./icons/index.jpeg")}></Image>
        </View>
        <View style={styles.log_box}>
          <Text style={styles.logText}>Date: {date}</Text>
          <Text style={styles.logText2}>Classification:</Text>
          <Text style={styles.logText2}>Metal - 82.53456613193206787%</Text>
          <Image style={styles.logImg} source={require("./icons/metal.png")}></Image>
        </View>
        <View style={styles.log_box2}>
          <Text style={styles.logText}>Date: {date}</Text>
          <Text style={styles.logText2}>Classification:</Text>
          <Text style={styles.logText2}>Metal - 81.53456613193206787%</Text>
          <Image style={styles.logImg} source={require("./icons/metal.png")}></Image>
        </View>
      </ScrollView>
      <NavBar images={[map, home, recycle]} labels={['MAP', 'HOME', 'CLASSIFY']} />
    </View>
  )
}

const ClassifyScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync({base64: true, quality: 0.05})
        setImage(data);
    }
  }
  return (
    <View style={styles.camera_container}>
      <Camera style={styles.camera} ref={ref => {setCamera(ref);}}></Camera>
      <View style={styles.camera_button}>
        <TouchableOpacity title="Classify" onPress={() => takePicture()} />
      </View>
      {image && <Image source={{uri: image.uri}} style={{flex:1}}/>}
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
        <Stack.Screen
          style={styles.container}
          name="CLASSIFY"
          component={ClassifyScreen}
        /> 
        <Stack.Screen
          style={styles.container}
          name="LOG"
          component={LogScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}