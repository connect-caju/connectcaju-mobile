import Realm from 'realm';
import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider, RealmProvider, UserProvider, useRealm} from '@realm/react';
import {syncConfig} from '../realm/syncConfig';
import {realm} from '../../App';
import { secrets } from '../realm/secrets';
import Spinner from '../components/spinner';

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <AppProvider id={secrets.appID} baseUrl={secrets.baseUrl}>
          <UserProvider fallback={<Text>Loading...</Text>}>
            <RealmProvider
              // @ts-expect-error TS(2322): Type '{ flexible: boolean; existingRealmFileBehavi... Remove this comment to see the full error message
              sync={syncConfig(realm, false, () => {})}
              fallback={<Spinner />}>
              {children}
            </RealmProvider>
          </UserProvider>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
