import { Text, Button } from "react-native";
import { supabase } from "../api/supabase";

function SettingsScreen() {
  return (
    <>
  <Text>Settings Screen</Text>
  <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </>
  )
  

}

export default SettingsScreen;
