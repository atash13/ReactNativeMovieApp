import React, {useEffect} from 'react';
import AppNavigation from './src/navigation/appNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    // Background Processing

    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
        
        <AppNavigation/>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}