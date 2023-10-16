/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigationTypes';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const {width, height} = Dimensions.get('window');

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const figure1Anim = React.useRef(new Animated.Value(0)).current;
  const figure2Anim = React.useRef(new Animated.Value(0)).current;
  const buttonOpacity = React.useRef(new Animated.Value(1)).current;
  const walletAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    const focusSubscription = navigation.addListener('focus', () => {
      buttonOpacity.setValue(1);
      figure1Anim.setValue(0);
      figure2Anim.setValue(0);
      walletAnim.setValue(-1); // Wallet invisível
    });
    //@ts-ignore
    return () => focusSubscription.remove();
  }, [navigation, buttonOpacity, figure1Anim, figure2Anim, walletAnim]);

  const handleNavigate = (route: string) => {
    Animated.sequence([
      // 1. Animação para fazer os botões desaparecerem
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      // 2. Exibir a "wallet" em seu tamanho inicial instantaneamente
      Animated.timing(walletAnim, {
        toValue: 0.5,
        duration: 0, // Instantâneo, sem duração
        useNativeDriver: false,
      }),
      // 3. Figuras animadas
      Animated.parallel([
        Animated.timing(figure1Anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(figure2Anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]),
      // 4. Espera por 1 segundo (1000ms)
      Animated.delay(1000),
      // 5. Animação da Wallet aumentando de tamanho
      Animated.timing(walletAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // 6. Navegação para a rota desejada
      navigation.navigate(route);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.figure1,
          width: figure1Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [width * 1, width * 1.25],
          }),
          height: figure1Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [width * 1.25, width * 1.25],
          }),
          top: figure1Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-width * 0.8, -width * 0.5],
          }),
          left: figure1Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-width * 0.45, -width * 0.55],
          }),
          transform: [{rotate: '-35deg'}],
        }}
      />
      <Animated.View
        style={{
          ...styles.figure2,
          width: figure2Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [width * 1, width * 1.25],
          }),
          height: figure2Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [width * 1.25, width * 1.25],
          }),
          bottom: figure2Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-width * 0.8, -width * 0.5],
          }),
          right: figure2Anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-width * 0.45, -width * 0.55],
          }),
          transform: [{rotate: '-35deg'}],
        }}
      />
      <Animated.Image
        source={require('../assets/images/wallet.png')}
        style={{
          width: walletAnim.interpolate({
            inputRange: [-1, 0.5, 1],
            outputRange: [0, 50, 100],
          }),
          height: walletAnim.interpolate({
            inputRange: [-1, 0.5, 1],
            outputRange: [0, 50, 100],
          }),
          position: 'absolute',
          top: height / 2,
          left: width / 2,
          transform: [
            {
              translateX: walletAnim.interpolate({
                inputRange: [-1, 0.5, 1],
                outputRange: [0, -25, -50],
              }),
            },
            {
              translateY: walletAnim.interpolate({
                inputRange: [-1, 0.5, 1],
                outputRange: [0, -25, -50],
              }),
            },
          ],
        }}
      />

      <Animated.View style={{opacity: buttonOpacity, alignSelf: 'stretch'}}>
        <Text style={styles.title}>Wallet Test</Text>
        <TouchableOpacity
          style={{...styles.blueButton, opacity: buttonOpacity}}
          onPress={() => handleNavigate('CardList')}>
          <Text style={styles.buttonText}>meus cartões</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{...styles.greenButton, opacity: buttonOpacity}}
          onPress={() => handleNavigate('CardRegister')}>
          <Text style={styles.buttonTextGreen}>cadastrar cartão</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#142995',
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  blueButton: {
    backgroundColor: '#12C2E9',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: '100%',
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  greenButton: {
    backgroundColor: '#A5FF32',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: '100%',
    alignSelf: 'stretch',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonTextGreen: {
    color: '#142995',
    fontSize: 16,
  },
  figure1: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#EEEEEE',
    opacity: 0.2,
  },
  figure2: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#EEEEEE',
    opacity: 0.2,
  },
});

export default HomeScreen;
