import React from 'react';
import Toast from 'react-native-toast-message';
import Navigation from '@navigation/index';
import AppInitializer from '@root/AppInitializer';
import toastConfig from '@config/toastConfig';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@store/index';

const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <AppInitializer />
      <Navigation />
      <Toast config={toastConfig} />
    </ReduxProvider>
  );
};

export default App;
