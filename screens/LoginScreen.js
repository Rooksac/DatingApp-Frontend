import { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, Button, TextInput } from "react-native";
import { supabase } from "../api/supabase";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    console.log(data);

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <>
      <View>
        <Text>Login Screen</Text>
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
        />
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
        <Button title="Sign Up" onPress={() => navigation.replace("Signup")} />
        {session && session.user && <Text>{session.user.id}</Text>}
      </View>
    </>
  );
}

export default LoginScreen;
