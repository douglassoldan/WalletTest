export type RootStackParamList = {
  Home: undefined;
  CardList: undefined;
  CardRegister: undefined;
  CardSuccessScreen: {
    cardData: {
      name: string;
      number: string;
      expiry: string;
    };
  };
};
