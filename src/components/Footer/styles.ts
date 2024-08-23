import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 10px 20px;
  background-color: #2c3e50;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const FooterButton = styled.TouchableOpacity`
  align-items: center;
`;

export const FooterText = styled.Text`
  color: white;
  font-size: 12px;
  margin-top: 5px;
`;
