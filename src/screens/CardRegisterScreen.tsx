import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {useCard} from '../context/CardContext';
import {RootStackParamList} from '../types/navigationTypes';

type CardRegisterScreenRouteProp = RouteProp<
  RootStackParamList,
  'CardRegister'
>;

type CardRegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CardRegister'
>;

type Props = {
  route: CardRegisterScreenRouteProp;
  navigation: CardRegisterScreenNavigationProp;
};

const CardRegisterScreen: React.FC<Props> = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const {setCards} = useCard();

  const formatCardNumber = (text: string) => {
    // Remove tudo que não é número
    const cleaned = ('' + text).replace(/\D/g, '');
    // Divide em grupos de 4 dígitos
    const match = cleaned.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/) || [];
    // Concatena os grupos separando-os com espaço
    const cardNumber =
      (match[1] || '') +
      ' ' +
      (match[2] || '') +
      ' ' +
      (match[3] || '') +
      ' ' +
      (match[4] || '');

    return cardNumber;
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/cards', {
        number: cardNumber,
        name: cardHolder,
        cvv: securityCode,
      });

      setCards((prevState: any) => [...prevState, response.data]);

      navigation.navigate('CardSuccessScreen', {
        cardData: {
          name: cardHolder,
          number: cardNumber,
          expiry: expiryDate,
        },
      });
    } catch (error) {
      console.error('Failed to register card:', error);
    }
  };

  const allFieldsFilled = () => {
    return cardNumber && cardHolder && expiryDate && securityCode.length === 3;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet Test</Text>

      <Text style={styles.label}>número do cartão</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={19} // 16 números + 3 espaços
        value={cardNumber}
        onChangeText={text => setCardNumber(formatCardNumber(text))}
      />

      <Text style={styles.label}>nome do titular do cartão</Text>
      <TextInput
        style={styles.input}
        value={cardHolder}
        onChangeText={text => setCardHolder(text)}
      />

      <View style={styles.row}>
        <View style={styles.halfInputContainer}>
          <Text style={styles.label}>vencimento</Text>
          <TextInput
            style={styles.halfInput}
            keyboardType="numeric"
            maxLength={5}
            value={expiryDate}
            onChangeText={text => {
              // Permitir a entrada no formato MM/AA
              const formattedText = text
                .replace(/[^0-9]/g, '')
                .replace(/(\d{2})(\d{2})/, '$1/$2');
              setExpiryDate(formattedText);
            }}
          />
        </View>
        <View style={styles.halfInputContainer}>
          <Text style={styles.label}>código de segurança</Text>
          <TextInput
            style={styles.halfInput}
            keyboardType="numeric"
            maxLength={3}
            value={securityCode}
            onChangeText={text => setSecurityCode(text.replace(/[^0-9]/g, ''))}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, !allFieldsFilled() && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={!allFieldsFilled()}>
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
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    flex: 0.48,
  },
  halfInput: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#12C2E9',
    padding: 20,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CardRegisterScreen;
