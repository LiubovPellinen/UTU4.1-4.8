import React, { useState } from 'react';
import { Text, View, Button, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class RemindersList extends React.Component {
  state = {
    loading: true,
    error: false,
    reminders: []
  }

  componentDidMount() {
    fetch('https://reminders-utu.herokuapp.com/api/reminders')
      .then(rem => rem.json())
      .then(reminders => this.setState({ loading: false, reminders: reminders }))
      .catch(e => this.setState({ error: true, loading: false }));
  }

  addReminder = (text) => {
    if (!text) {
      alert('Input some text');
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
      .then((response) => response.json())
      .catch(e => this.setState({ error: true, loading: false }));
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
      <ScrollView>
        {this.state.reminders.map(reminder =>
          <Reminder
            key={reminder.id}
            name={reminder.name}
            id={reminder.id}
            navigation={this.props.navigation}
          />)}
        <NewReminder addReminder={this.addReminder}></NewReminder>
      </ScrollView>
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

  handleTextChange = (event) => {
    this.setState({
      text: event.target.value,
    })
  }
  render() {
    return (
      <View >
        <TextInput
          name="reminderName"
          placeholder="Write the note here"
          onChange={this.handleTextChange}
          defaultValue={this.state.text}
        />
        <Button title="Add note" onPress={() => this.props.addReminder(this.state.text)} />
      </View>
    )
  }
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Reminders">
        <Stack.Screen name="Reminders" component={RemindersList} options={{ title: "Welcome to List" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
