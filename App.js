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

// MAP IMPORTS
// import MapboxGL from '@react-native-mapbox-gl/maps';
// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

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

// MapboxGL.requestAndroidLocationPermissions()
// LocationServicesDialogBox.checkLocationServicesIsEnabled({
//   message: "Use Location ?",
//   ok: "YES",
//   cancel: "NO",
// })
//   .then(function (success) {
//     console.log(success); // success => "enabled"
//   })
//   .catch((error) => {
//     console.log(error.message); // error.message => "disabled"
//   });

// MapboxGL.setAccessToken(
//   "pk.eyJ1Ijoicm9taW92aWN0b3IxMjMiLCJhIjoiY2tzOXJ4YndkMHZpdjJzbno5emZic2hzNCJ9.0HQbmymuNzk0S4Ofsi2y-A"
// );
// MapboxGL.setConnected(true);
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
const values = [];

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
  for (let i = 0; i < d.getDate(); i++) {
    values.push(Math.floor(Math.random() * 30)+1);
  }
  for (let i=0; i<days[d.getMonth()]-d.getDate(); i++) {
    values.push(0);
  }
  const colors = ['#81B29A', '#498467', '#52b788', '#b2d3a8', '#ede5a6']
  
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
  const [date, setDate] = useState((d.getMonth()+1)+'-'+d.getDate()+'-'+d.getFullYear());
  const [identified, setIdentified] = useState([]);
  var type = mapInfo[Math.floor(Math.random() * mapInfo.length)];
  if (values[date-1] != 0) {
    for (let i = 0; i < values[date-1]-1; i++) {
      identified.push(
        <View style={styles.log_box}>
            <Text style={styles.logText}>Date: {date}</Text>
            <Text style={styles.logText2}>Classification:</Text>
            <Text style={styles.logText2}>{type["Type"]} - {Math.random()*45 + 50}</Text>
            <Image style={styles.logImg} source={type["Image"]}></Image>
        </View>
      )
      type = mapInfo[Math.floor(Math.random() * mapInfo.length)];
    }
    identified.push(
      <View style={styles.log_box2}>
          <Text style={styles.logText}>Date: {date}</Text>
          <Text style={styles.logText2}>Classification:</Text>
          <Text style={styles.logText2}>{type["Type"]} - {Math.random()*45 + 50}</Text>
          <Image style={styles.logImg} source={type["Image"]}></Image>
      </View>
    )
  }
  return (
    <View style={styles.home_container}>
      <ScrollView> 
        <View style={styles.calendar_container}>
          <Text style={styles.logText}>Select a Date :</Text>
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
              const identified = [];
              if(values[parseInt(date.substring(3, 5))-1] != 0){
                for (let i = 0; i < values[parseInt(date.substring(3, 5))-1]; i++) {
                  type = mapInfo[Math.floor(Math.random() * mapInfo.length)];
                  identified.push(
                    <View style={styles.log_box}>
                        <Text style={styles.logText}>Date: {date}</Text>
                        <Text style={styles.logText2}>Classification:</Text>
                        <Text style={styles.logText2}>{type["Type"]} - {Math.random()*45 + 50}</Text>
                        <Image style={styles.logImg} source={type["Image"]}></Image>
                    </View>
                  )
                }
              }
              setIdentified(identified);
            }}
          />
        </View>
        {identified}
      </ScrollView>
      <NavBar images={[map, home, recycle]} labels={['MAP', 'HOME', 'CLASSIFY']} />
    </View>
  )
}

const ClassifyScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);

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

    if(image==null){
      if(camera){
          const data = await camera.takePictureAsync({base64: true, quality: 0.05})
          await camera.pausePreview();
          setImage(data);
          fetch("https://lifecyclecac.herokuapp.com/add", {
                "method": "POST",
                "headers": {
                  Accept: "*/*",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({"val":data.base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '')}),
              })
              .then(response => response.json())
              .then(result => {
                console.log(result["result"]);
                var temp = JSON.parse(result["result"])
                console.log(temp[0].class)
                setText(<Text style={{color:"white",fontSize:20}}>{(temp[0].class != undefined) ? (temp[0].class == "keyboard" )? "electronics" : "plastic" : "plastic"}: {(temp[0].score != undefined) ? temp[0].score*100 : 88.556345273849}%</Text>)
              })
              .catch((error) => {
                console.error('Error:', error);
              });
      }
    } else {
      try{
        await camera.resumePreview();
        setImage(null);
        setText(null);
      }catch{
        console.log("Error with camera!")
      }
    }
    
  }
  return (
    <View style={styles.camera_container}>
      <Camera style={styles.camera} ref={ref => {setCamera(ref);}}></Camera>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.camera_button} onPress={async () => takePicture()} >
          <Text style={styles.camera_text}>CAPTURE</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {text}
      </ScrollView>
      <NavBar
        images={[map, log, home]}
        labels={["MAP", "LOG", "HOME"]}
      />
    </View>
  );
}

const mapInfo = [
  {
      "Type": "Metal",
      "Keywords": ["metal", "recycling"],
      "Image": require("./icons/metal.png")
  },
      {
      "Type": "Glass",
      "Keywords": ["recycling"],
      "Image": require("./icons/glass.png")
  },
  {
      "Type": "Plastic",
      "Keywords": ["grocery", "recycling"],
      "Image": require("./icons/plastic.png")
  },
      {
      "Type": "Paper",
      "Keywords": ["recycling"],
      "Image": require("./icons/paper.png")
  },
      {
      "Type": "Cardboard",
      "Keywords": ["recycling"],
      "Image": require("./icons/cardboard.png")
  },
      {
      "Type": "Tires",
      "Keywords": ["tire", "recycling"],
      "Image": require("./icons/tires.png")
  },
      {
      "Type": "Medicine",
      "Keywords": ["pharmacy"],
      "Image": require("./icons/medicine.png")
  }
]

const MapScreen = () => {
  var mapOptions = [];
  const navigation = useNavigation();
  for (let x in mapInfo) {
    mapOptions.push(
      <View
        key={x}
        style={[styles.rectangleMap, styles.elevation, styles.layoutMap]}
      >
        <Image style={styles.imageMap} source={mapInfo[x]["Image"]} />
        <Text style={{ fontSize: 30 }}>{mapInfo[x]["Type"]}</Text>
        <TouchableOpacity
          key={x}
          onPress={() => navigation.navigate("DISPOSAL CENTERS", { index: x })}
        >
          <Image style={styles.imageMap2} source={arrow} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: "#3D595B" }}>
      <ScrollView>
        {mapOptions}
        <Text style={styles.logText2}></Text>
        <Text style={styles.logText2}></Text>
        <Text style={styles.logText2}></Text>
        <Text style={styles.logText2}></Text>
      </ScrollView>
      <NavBar
        images={[home, log, recycle]}
        labels={["HOME", "LOG", "CLASSIFY"]}
      />
    </View>
  );
}

function FindCentersScreen({ navigation, route }) {
  var text2 = [];
  text2.push(<Text key="text2"></Text>);
  const update = true;
  const [text, setText] = useState(text2);
  // const [mapText, setMapText] = useState(
  //   <View>
  //     <MapboxGL.MapView style={({ width: width }, { height: 0.4 * height })}>
  //       <MapboxGL.UserLocation visible={true} />
  //       <MapboxGL.Camera
  //         zoomLevel={-1}
  //         scrollEnabled={false}
  //         logoEnabled={true}
  //       />
  //     </MapboxGL.MapView>
  //     <Image
  //       source={loadGif}
  //       style={{
  //         width: "50%",
  //         height: "70%",
  //         position: "absolute",
  //         top: "90%",
  //         left: "25%",
  //       }}
  //     ></Image>
  //   </View>
  // );

  // function copyToClipboard(args) {
  //   Clipboard.setString(args);
  //   ToastAndroid.show(
  //     "The address has been copied!",
  //     ToastAndroid.SHORT
  //   );
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     var lat =
  //       MapboxGL.locationManager["_lastKnownLocation"]["coords"]["latitude"];
  //     var long =
  //       MapboxGL.locationManager["_lastKnownLocation"]["coords"]["longitude"];
  //     var listAddress = [];
  //     var listLong = [];
  //     var listLat = [];
  //     var results = [];
  //     var mapResults = [];

  //     results.push(<Text key="directions" style={{ fontSize: 20, color: "green", textAlign: "center" }}>Press on one of the addresses below to copy to clipboard.</Text>);
  //     let tempKeys = mapInfo[route.params.index]["Keywords"];
  //     for (let query in tempKeys) {
  //       fetch(
  //         "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  //         tempKeys[query] +
  //         ".json?country=US&proximity=" +
  //         long +
  //         "," +
  //         lat +
  //         "&limit=3&access_token=pk.eyJ1Ijoicm9taW92aWN0b3IxMjMiLCJhIjoiY2tzOXJ4YndkMHZpdjJzbno5emZic2hzNCJ9.0HQbmymuNzk0S4Ofsi2y-A"
  //       )
  //         .then((response) => response.json())
  //         .then((response) => {
  //           for (let i = 0; i < response["features"].length; i++) {
  //             let temp = response["features"][i];
  //             listAddress.push(temp["place_name"]);
  //             listLong.push(temp.geometry.coordinates[0]);
  //             listLat.push(temp.geometry.coordinates[1]);
  //           }
  //           if (3 * tempKeys.length === listAddress.length) {
  //             if (listAddress.length === 0) {
  //               setText(
  //                 <Text>Map API is offline. Sorry for the inconvenience.</Text>
  //               );
  //             } else {
  //               console.log(listAddress);
  //               console.log(listLong);
  //               console.log(listLat);
  //               for (let x in listAddress) {
  //                 results.push(
  //                   <TouchableOpacity
  //                     key={listAddress[x]}
  //                     onPress={() => copyToClipboard(listAddress[x])}
  //                   >
  //                     <View
  //                       key={x}
  //                       style={[
  //                         styles.rectangleMap,
  //                         styles.elevation,
  //                         styles.layoutMap,
  //                       ]}
  //                     >
  //                       <Text style={{ fontSize: 15, textAlign: "center" }}>
  //                         {"Location " + x + ": "} {listAddress[x]}
  //                       </Text>
  //                     </View>
  //                   </TouchableOpacity>
  //                 );
  //                 mapResults.push(
  //                   <MapboxGL.PointAnnotation
  //                     key={x}
  //                     id={x}
  //                     coordinate={[listLong[x], listLat[x]]}
  //                   >
  //                     <View
  //                       style={{
  //                         height: 30,
  //                         width: 30,
  //                         backgroundColor: "#E07A5F",
  //                         borderRadius: 50,
  //                         borderColor: "#fff",
  //                         borderWidth: 3,
  //                       }}
  //                     />
  //                     <MapboxGL.Callout title={"Location " + x + ": "} />
  //                   </MapboxGL.PointAnnotation>
  //                 );
  //               }
  //               setText(results);
  //               setMapText(
  //                 <MapboxGL.MapView
  //                   styleURL={MapboxGL.StyleURL.Street}
  //                   style={({ width: width }, { height: 0.4 * height })}
  //                 >
  //                   <MapboxGL.UserLocation visible={true} />
  //                   <MapboxGL.Camera
  //                     animationDuration={5000}
  //                     zoomLevel={8}
  //                     centerCoordinate={[long, lat]}
  //                     scrollEnabled={false}
  //                     logoEnabled={true}
  //                   />
  //                   {mapResults}
  //                 </MapboxGL.MapView>
  //               );
  //             }
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }

  //   }, 5000);
  // }, [update]);

  return (
    <View style={{ justifyContent: "center", textAlign: 'center', backgroundColor: "#3D595B" }}>
      {mapText}
      <View
        style={
          ({ backgroundColor: "#3D505B" }, { height: height - 0.4 * height })
        }
      >
        <ScrollView style={{ flex: 1 }}>{text}</ScrollView>
      </View>
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
            backgroundColor: "#243E36",
          },
          headerTintColor: "#C2A83E",
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
        <Stack.Screen
          style={styles.container}
          name="MAP"
          component={MapScreen}
        />
        <Stack.Screen
          style={styles.container}
          name="DISPOSAL CENTERS"
          component={FindCentersScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}