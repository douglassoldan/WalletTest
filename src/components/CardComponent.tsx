import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

interface CardProps {
  name: string;
  type: string;
  number: string;
  expiry: string;
  onClick?: () => void;
  cardIndex: number;
}

const CardComponent: React.FC<CardProps> = ({
  name,
  number,
  expiry,
  onClick,
  cardIndex,
}) => {
  const lastFourDigits = number?.slice(-4) || '0000';

  // Alternar com base no índice do cartão
  const isGreenCard = cardIndex % 2 === 0;
  const cardBackground = isGreenCard ? '#A5FF32' : 'black';
  const cardTextColor = isGreenCard ? 'black' : 'white';
  const cardTextType = isGreenCard ? 'Green Card' : 'Black Card';

  const cardStyle = [styles.card, {backgroundColor: cardBackground}];

  return (
    <TouchableOpacity style={cardStyle} onPress={onClick}>
      <Text style={[styles.cardType, {color: cardTextColor}]}>
        {cardTextType}
      </Text>
      <Text style={[styles.cardHolder, {color: cardTextColor}]}>{name}</Text>
      <Text style={[styles.cardNumber, {color: cardTextColor}]}>
        •••• •••• •••• {lastFourDigits}
      </Text>
      <Text style={[styles.cardExpiry, {color: cardTextColor}]}>
        Validade {expiry}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
  },
  cardType: {
    fontSize: 20,
    marginBottom: 15,
  },
  cardHolder: {
    fontSize: 18,
    marginBottom: 15,
  },
  cardNumber: {
    fontSize: 18,
    marginBottom: 15,
  },
  cardExpiry: {
    fontSize: 16,
  },
});

export default CardComponent;
