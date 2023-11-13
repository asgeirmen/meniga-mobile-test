// Login.js
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const useProxy = true;

const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

// Export the Login screen component
export default function Login({ navigation }) {
    const discovery = AuthSession.useAutoDiscovery('http://192.168.68.62:21010/identity');
    // Create and load an auth request
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
      {
        clientId: 'menigais_user_api_gateway',
        redirectUri,
        scopes: ['openid', 'profile', 'email', 'offline_access'],
      },
      discovery
    ).then();
    
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Login!" disabled={!request} onPress={() => promptAsync()} />
        {
            result && <Text>{JSON.stringify(result, null, 2)}</Text>
        }
      </View>
    );
}