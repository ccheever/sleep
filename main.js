import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Button from 'react-native-button';

class App extends React.Component {

  state = {
    emailSent: false,
    error: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={{fontSize: 60, fontWeight: 'bold', color: '#444444'}}
          onPress={() => this._handlePressAsync()}>
          Sleep
        </Button>

        
        { this.state.emailSent && (
          <Text>
            Email Sent
          </Text>
        )}

        { this.state.error && (
          <Text style={{
              color: 'red',
              fontWeight: 'bold',
            }}>Error: {this.state.error}</Text>
        )}

      </View>
    );
  }

  async _handlePressAsync() {
    let result = await fetch("http://ccheever.com/sleep-send-email.json");
    let obj = await result.json();
    if (obj.success) {
      this.setState({
        emailSent: true,
      });
    }
    if (obj.error) {
      this.setState({
        error: obj.error,
      });
    }
    console.log(obj);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Exponent.registerRootComponent(App);
