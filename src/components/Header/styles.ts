
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 80px;
  padding:0 15px;
  background-color: #4a90e2;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  padding: 0 10px;
`;

export const MenuContainer = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  padding: 0 10px;
`;

export const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`