import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import simpleJsiModule, { AppVersionData } from 'react-native-nando-coding';

export default function App() {
  const [result, setResult] = React.useState<AppVersionData>();
  const [deviceName, setDeviceName] = React.useState<string>();

  React.useEffect(() => {
    setDeviceName(simpleJsiModule.getHelloWorld());
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text>JSI Installed: {isLoaded().toString()}</Text> */}
      <Text style={styles.txtHeader}>{deviceName}</Text>
      <Text>App Version: {result ? result.appVersion : '-'}</Text>
      <Text>Bundle Identifier: {result ? result.bundleIdentifier : '-'}</Text>
      <Text>Build Version: {result ? result.buildVersion : '-'}</Text>

      {/* <TouchableOpacity
        onPress={() => {
          const value = simpleJsiModule.getAppInfo();
          setResult(value);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonTxt}>Get App Version From JSI Module</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        onPress={() => {
          simpleJsiModule.setItem('helloworld', 'Hello World');
        }}
        style={styles.button}
      >
        <Text style={styles.buttonTxt}>setItem: "Hello World"</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setGetItemValue(simpleJsiModule.getItem('helloworld'));
        }}
        style={styles.button}
      >
        <Text style={styles.buttonTxt}>getItem: {getItemValue}</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    width: '95%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonTxt: {
    color: 'white',
  },
  txtHeader: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
