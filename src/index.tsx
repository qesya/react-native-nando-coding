//@ts-ignore we want to ignore everything
// else in global except what we need to access.
// Maybe there is a better way to do this.
import { NativeModules } from 'react-native';

// Installing JSI Bindings as done by
// https://github.com/mrousavy/react-native-mmkv

export interface AppVersionData {
  appVersion: string;
  buildVersion: string;
  bundleIdentifier: string;
}

//@ts-ignore
const simpleJsiModule: {
  getHelloWorld(): string;
  getDeviceName(): string;
  getAppInfo(): AppVersionData;
  //@ts-ignore
} = global;

export function isLoaded() {
  return typeof simpleJsiModule.getHelloWorld === 'function';
}

if (!isLoaded()) {
  const result = NativeModules.SimpleJsi.install();
  if (!result)
    throw new Error('JSI bindings were not installed for: SimpleJsi Module');

  if (!isLoaded()) {
    throw new Error('JSI bindings were not installed for: SimpleJsi Module');
  }
}

export default simpleJsiModule;
