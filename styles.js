import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#36425C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rectangle: {
        width: width,
        height: 0.12 * height,
        marginTop: 0.76 * height,
        position: 'absolute',
        backgroundColor: "#8AC755",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    layoutMap: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    rectangleMap: {
        width: 0.9 * width,
        height: 0.15 * height,
        borderRadius: 15,
        marginTop: 0.04 * height,
        backgroundColor: '#8AC755',
        marginLeft: 0.5 * 0.1 * width
    },
    imageMap: {
        width: 0.27 * width,
        height: 0.15 * height,
        marginLeft: -30
    },  
    imageMap2: {
        width: 0.1 * width,
        height: 0.05 * height,
    },
    mapScreenContainer: {
        alignItems: 'center',
        width: 100,
        backgroundColor: 'transparent',
        height: 100,
    },
    mapScreenTextContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapScreenText: {
        textAlign: 'center',
        paddingHorizontal: 5,
        flex: 1,
    },
    mapScreenIcon: {
        paddingTop:5,
    },
    elevation: {
        elevation: 5,
        shadowColor: '#000000',
    },
    badge: {
        textAlign: "center",
        justifyContent: 'center',
        width: "100%",
        marginTop: 0,
    },
    navlog: {
        width: 79.34,
        height: 70,
        marginTop: -20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        position: 'relative',
        textAlign: "center",
        justifyContent: "center",
        color: "#19C5E0"
    },
    home_log: {
        width: 0.86 * width,
        height: 0.22 * height,
        marginTop: 0.05 * width,
        marginLeft: 0.07 * width,
        marginRight: 0.07 * width,
        backgroundColor: '#8AC755',
        borderRadius: 10,
        borderWidth: 1,
        // borderColor: '#fff',
    },
    home_text: {
        fontSize: 20,
        color: '#FFFFFF',
        alignSelf:'center',
        marginTop: 5,
        marginBottom: 5,
      },
    home_container: {
        height: height,
        backgroundColor: '#36425C',
        alignItems: 'center',
        color: '#FFFFFF'
      },
    heatmap : {
        backgroundColor: "#2E2E33", 
        marginTop: 10, 
        marginLeft: 0.075*width, 
        marginRight: 0.075*width
    },
    log_box: {
        width: 0.86 * width,
        height: 0.4 * height,
        marginTop: 0.05 * width,
        marginLeft: 0.07 * width,
        marginRight: 0.07 * width,
        backgroundColor: '#8AC755',
        borderRadius: 10,
        borderWidth: 1,
    },
    log_box2: {
        width: 0.86 * width,
        height: 0.4 * height,
        marginTop: 0.05 * width,
        marginLeft: 0.07 * width,
        marginRight: 0.07 * width,
        marginBottom: 0.47 * width,
        backgroundColor: '#8AC755',
        borderRadius: 10,
        borderWidth: 1,
    },
    calendar_container: {
        width: 0.86 * width,
        marginTop: 0.05 * width,
        marginLeft: 0.07 * width,
        marginRight: 0.07 * width,
        flex: 1,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#8AC755'
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    datePickerStyle: {
        width: 230,
    },
    text: {
        textAlign: 'left',
        width: 230,
        fontSize: 16,
        color : "#000"
    },
    logText: {
        color: "#ffffff",
        fontSize: 20,
        marginTop: 0.01 * width,
        marginLeft:.02*width
    },
    logText2: {
        color: "#ffffff",
        fontSize: 17,
        marginLeft:.02*width
    },
    logImg: {
        alignSelf: "center",
        width: 0.35*width,
        height: 0.28*height
    },
    camera: {
        width: 0.8 * width, 
        height: 0.42 * height,
        marginLeft: 0.1*width,
        marginTop: 0.05 * width,
    },
    camera_button: {
        width: 300,
        height: 41,
        borderWidth: 1,
        borderColor: '#BED751',
        borderRadius: 10,
        alignItems: 'center',
    },
    camera_container: {
        flex: 1,
        width: width,
        backgroundColor: '#36425C',
        alignSelf: 'center',
        overflow: 'hidden',
    },
});

export default styles;