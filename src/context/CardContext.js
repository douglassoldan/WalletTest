import React, {createContext, useState, useContext} from 'react';

const CardContext = createContext();

export const CardProvider = ({children}) => {
  const [cards, setCards] = useState([]);

  return (
    <CardContext.Provider value={{cards, setCards}}>
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};
