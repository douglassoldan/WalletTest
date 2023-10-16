import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {CardProvider} from './src/context/CardContext';

const App = () => {
  return (
    <CardProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </CardProvider>
  );
};

export default App;
