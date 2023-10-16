import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native'; // Importe ScrollView
import CardComponent from '../components/CardComponent';
import axios from 'axios';

const CardListScreen: React.FC<any> = ({navigation}) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Erro ao buscar os cartões:', error);
      }
    };

    fetchCards();
  }, []);

  const handleCardClick = (card: any) => {
    navigation.navigate('CardDetail', {card});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {cards.map((card, index) => (
          <View
            //@ts-ignore
            key={card.number}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginBottom: index === cards.length - 1 ? 0 : -140}}>
            <CardComponent
              //@ts-ignore
              {...card}
              cardIndex={index}
              onClick={() => handleCardClick(card)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142995',
    padding: 20,
    paddingTop: 180,
    justifyContent: 'center',
  },
});

export default CardListScreen;
