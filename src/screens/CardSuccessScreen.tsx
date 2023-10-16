import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigationTypes';
import {RouteProp} from '@react-navigation/native';

interface CardSuccessScreenProps {
  route: RouteProp<RootStackParamList, 'CardSuccessScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'CardSuccessScreen'>;
}

const CardSuccessScreen: React.FC<CardSuccessScreenProps> = ({
  route,
  navigation,
}) => {
  const {name, number, expiry} = route.params.cardData;
  const lastFourDigits = number?.slice(-4) || '0000';

  const handleAdvance = () => {
    navigation.navigate('CardList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Test</Text>
      <Text style={styles.successText}>cartão cadastrado com sucesso</Text>

      <View style={styles.card}>
        <Text style={styles.cardType}>Black Card</Text>
        <Text style={styles.cardHolder}>{name}</Text>
        <Text style={styles.cardNumber}>•••• •••• •••• {lastFourDigits}</Text>
        <Text style={styles.cardExpiry}>Validade {expiry}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdvance}>
        <Text style={styles.buttonText}>avançar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142995',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30,
  },
  successText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 8,
    marginBottom: 40,
  },
  cardType: {
    color: 'white',
    fontSize: 20,
    marginBottom: 15,
  },
  cardHolder: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
  },
  cardExpiry: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#12C2E9',
    padding: 20,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CardSuccessScreen;
