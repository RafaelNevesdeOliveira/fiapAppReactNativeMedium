import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 15%;
  padding: 10px 20px;
  background-color: #2c3e50;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const FooterButton = styled.TouchableOpacity`
  align-items: center;
  padding-bottom: 25px;
`;

export const FooterText = styled.Text`
  color: white;
  font-size: 12px;
  margin-top: 10px;
`;
