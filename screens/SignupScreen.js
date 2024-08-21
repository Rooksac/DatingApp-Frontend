import { View, Text, Button } from "react-native";

function SignupScreen({ navigation }) {
  return (
    <>
    <View>
      <Text>Signup Screen</Text>
      <Button title="Log In" onPress={() =>navigation.replace('Login')} />
      </View>
    </>
  );
}

export default SignupScreen;
