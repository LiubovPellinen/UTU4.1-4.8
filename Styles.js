import { StyleSheet } from "react-native"

//A stylesheet to make our app beautiful
const styles = StyleSheet.create({
    reminderview: {
        flexDirection: 'column',
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
    },
    adminview: {
        backgroundColor: 'red',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
    },
    dayview: {
        backgroundColor: 'green',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 10,
    },
    dayitemview: {
        backgroundColor: 'yellow',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
    }

});

export default styles;
