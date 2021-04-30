import React, { useState } from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styles from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async (key, value) => {
  try {
    value = JSON.stringify(value)
    console.log('AsyncStorage saving', key, value)
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
}

const getData = async (key) => {
  let value = await AsyncStorage.getItem(key)
  value = JSON.parse(value)
  console.log('AsyncStorage getting', key, value)
  return value
};

class RemindersList extends React.Component {
  state = {
    loading: true,
    error: false,
    reminders: []
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus',
      () => { 
        this.populateData()
      }
     );

    this.populateData()
  }

  populateData() {
    fetch('https://reminders-utu.herokuapp.com/api/reminders')
      .then(rem => rem.json())
      .then(reminders => {
        this.setState({ loading: false, reminders: reminders })
        setData('reminders', reminders)
      })
      .catch(e => this.setState({ error: true, loading: false }))
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator animating={true} />
        </View>
      )
    }

    if (this.state.error) {
      return (
        <View>
          <Text>Failed to load reminders!</Text>
        </View>
      )
    }

    return (
      <View style={styles.reminderview}  >
        <ScrollView>
          {this.state.reminders.map(reminder =>
            <Reminder
              key={reminder.id}
              name={reminder.name}
              id={reminder.id}
              navigation={this.props.navigation}
            />)}
        </ScrollView>
        <Button title="Add" onPress={() => this.props.navigation.navigate('NewReminder')} />
      </View>
    );
  } 
}

const Reminder = (props) => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  )
}

class NewReminder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  handleTextChange = (text) => {
    this.setState({
      text
    })
  }
  render() {
    return (
      <View >
        <TextInput
          name="reminderName"
          placeholder="Write the note here"
          onChangeText={text => this.handleTextChange(text)}
          defaultValue={this.state.text}
        />
        <Button title="Add note" onPress={() => this.props.addReminder(this.state.text)} />
      </View>
    )
  }
}

class NewReminderScreen extends React.Component {
  addReminder = async (text) => {
    if (text.length === 0) {
      Alert.alert(
        "Error!",
        "Input text here",
        [
          
          { text: "OK"}
        ]
      );

      return;
    };

    let reminders = await getData('reminders')
    let filter = reminders.filter(reminder => reminder.name === text)
    if (filter.length > 0) {
      Alert.alert(
        "Error!",
        "The same note already exist!",
        [
          
          { text: "OK"}
        ]
      );

      return;
    }
    
    const remObject = {
      name: text,
      date: new Date().toLocaleString()
    }

    fetch('https://reminders-utu.herokuapp.com/api/reminders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(remObject)
    })
    .then((rem) => rem.json())
    .then(reminder => {
      reminders = reminders.concat(reminder);
      setData('reminders', reminders);
    })
    .catch(e => this.setState({ error: true, loading: false }));
  }

  render() {
    return (
      <View>
        <NewReminder addReminder={this.addReminder}></NewReminder>
      </View>
    );
  }
}
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Reminders">
        <Stack.Screen name="Reminders" component={RemindersList} options={{ title: "Welcome to List" }} />
        <Stack.Screen name="NewReminder" component={NewReminderScreen} options={{ title: "New reminder" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
