import React from 'react';
import {View, StyleSheet} from 'react-native';
import CardComponent from '../components/CardComponent';

//@ts-ignore
const CardDetailScreen: React.FC = ({route}) => {
  const card = route.params.card;

  return (
    <View style={styles.container}>
      <CardComponent {...card} cardIndex={0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#142995',
  },
});

export default CardDetailScreen;
