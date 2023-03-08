/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';

import {configure} from '@coinbase/wallet-mobile-sdk';
import {WalletMobileSDKEVMProvider} from '@coinbase/wallet-mobile-sdk/src/WalletMobileSDKEVMProvider';
import {coinbaseStorage} from './lib/web3Store';

configure({
  hostURL: new URL('https://wallet.coinbase.com/wsegue'),
  callbackURL: new URL('not-configured://'), // Your app's Universal Link
  hostPackageName: 'org.toshi',
});

export const cbProvider = new WalletMobileSDKEVMProvider({
  storage: coinbaseStorage,
});

function App(): JSX.Element {
  const onConnect = async () => {
    await cbProvider.request({
      method: 'eth_requestAccounts',
      params: [],
    });
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{margin: 20}}>
          <Text>Coinbase Example App</Text>
          <Button onPress={onConnect} title="CONNECT" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
