/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import ReactNativeBiometrics from 'react-native-biometrics';

const App = () => {
  let Authavailable = false;
  const [authMedium, setAuthMedium] = useState('');
  useEffect(() => {
    ReactNativeBiometrics.isSensorAvailable()
      .then(resultObject => {
        const {available, biometryType} = resultObject;
        Authavailable = available;
        setAuthMedium(biometryType);
        if (available && biometryType === ReactNativeBiometrics.TouchID) {
          Authenticate();
        } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
          Authenticate();
        } else if (
          available &&
          biometryType === ReactNativeBiometrics.Biometrics
        ) {
          Authenticate();
        } else {
          console.log('Biometrics not supported');
        }
        if (available) {
          setTimeout(() => {
           Authenticate()
          }, 60 * 3000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const Authenticate = () => {
    ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(resultObject => {
        const {success} = resultObject;

        if (success) {
          console.log('successful biometrics provided');
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => Authenticate()}
        style={styles.btn}
        underlayColor="#0380BE"
        activeOpacity={1}>
        <Text
          style={{
            color: '#fff',
            fontWeight: '600',
          }}>
          {`Authenticate with ${authMedium}`}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btn: {
    borderRadius: 3,
    marginTop: 200,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#0391D7',
  },
});

export default App;
