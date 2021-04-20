/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AppNavigator from './navigations/AppNavigator';
import { PermissionsAndroid, ToastAndroid } from 'react-native';

const App = () => {

  useEffect(() => {
    const onStartProcess = async (): Promise<void> => {
      try {
        const listPermissions = [
          {
            title: 'android.permission.READ_EXTERNAL_STORAGE' as const,
            permission: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          },
          {
            title: 'android.permission.WRITE_EXTERNAL_STORAGE' as const,
            permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          },
        ];

        const granted = await PermissionsAndroid.requestMultiple(
          listPermissions.map((item) => item.permission),
        );

        if (
          listPermissions.every(
            (item) => granted[item.title] === PermissionsAndroid.RESULTS.GRANTED,
          )
        ) {

        } else {
          ToastAndroid.showWithGravityAndOffset(
            "Permission is not granted!",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        }
      } catch (error) {
        ToastAndroid.showWithGravityAndOffset(
          error?.message || "Error",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      }
    };
    onStartProcess();
  }, []);

  return (
    <>
      <AppNavigator />
    </>
  );
};

export default App;
