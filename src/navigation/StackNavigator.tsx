import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CardListScreen from '../screens/CardListScreen';
import CardRegisterScreen from '../screens/CardRegisterScreen';
import CardSuccessScreen from '../screens/CardSuccessScreen';
import {RootStackParamList} from '../types/navigationTypes';
import CardDetailScreen from '../screens/CardDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        animationEnabled: false, // Desativa as animações
        headerTransparent: true, // torna o fundo transparente
        headerTintColor: '#12C2E9', // define a cor da seta de voltar e do título
        headerTitleStyle: {
          fontSize: 22,
        },
        headerBackTitleVisible: false, // esconde o título da tela anterior na seta de voltar
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CardList"
        component={CardListScreen}
        options={{title: 'meus cartões'}}
      />
      <Stack.Screen
        name="CardRegister"
        component={CardRegisterScreen}
        options={{title: 'cadastro'}}
      />
      <Stack.Screen
        name="CardSuccessScreen"
        component={CardSuccessScreen}
        options={{title: 'cadastro'}}
      />
      <Stack.Screen
        //@ts-ignore
        name="CardDetail"
        component={CardDetailScreen}
        options={{title: 'meus cartões'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
