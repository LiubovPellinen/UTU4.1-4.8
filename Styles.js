import { StyleSheet } from "react-native"

//A stylesheet to make our app beautiful
const styles = StyleSheet.create({
    reminderview: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
        borderWidth: 2,
        borderRadius:10,
        lineHeight:60

    },
    
   button:{
    backgroundColor: '#20B2AA', 
    borderRadius:10, 
    width:300, 
    height:30 ,
    
  },
   inputText:{
    borderWidth:1,
    margin: 10,
    width:300,
    height:30,
    borderRadius:10
   },
   buttonText:{
    fontSize: 15, 
    color: '#fff',
     textAlign: 'center', 
     margin: 5, 
   }

});

export default styles;
