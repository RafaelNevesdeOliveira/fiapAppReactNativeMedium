import { Container, FooterButton, FooterText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

export default function Footer() {
  const navigation = useNavigation();

  const handleNavigateToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <Container>
      <FooterButton onPress={handleNavigateToHome}>
        <Ionicons name="home" size={24} color="white" />
        <FooterText>Home</FooterText>
      </FooterButton>
    </Container>
  );
}
