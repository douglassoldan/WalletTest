import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

describe('HomeScreen', () => {
  const mockNavigate = jest.fn();
  const mockProps = {
    navigation: {
      navigate: mockNavigate,
      addListener: jest.fn(),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockReset();
  });

  it('renders correctly', () => {
    const {getByText} = render(<HomeScreen {...mockProps} />);
    expect(getByText('Wallet Test')).toBeTruthy();
  });

  it('navigates to CardList when "meus cartões" is pressed', () => {
    const {getByText} = render(<HomeScreen {...mockProps} />);
    fireEvent.press(getByText('meus cartões'));
    expect(mockNavigate).toHaveBeenCalledWith('CardList');
  });

  it('navigates to CardRegister when "cadastrar cartão" is pressed', () => {
    const {getByText} = render(<HomeScreen {...mockProps} />);
    fireEvent.press(getByText('cadastrar cartão'));
    expect(mockNavigate).toHaveBeenCalledWith('CardRegister');
  });
});
