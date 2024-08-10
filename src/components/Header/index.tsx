import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, BackButtonContainer, MenuContainer } from './styles';

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
  canGoBack?: boolean;
}

export default function Header({ title, onMenuPress, canGoBack }: HeaderProps){
  const navigation = useNavigation();

  return (
    <Container>
      {canGoBack ? (
        <BackButtonContainer onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </BackButtonContainer>
      ) : (
        <View style={{ width: 28 }} />
      )}
      <Title>{title}</Title>
      <MenuContainer onPress={onMenuPress}>
        <Ionicons name="menu" size={28} color="white" />
      </MenuContainer>
    </Container>
  );

}