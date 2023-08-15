
import { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AuthContext } from '../store/context/auth-context';

function ProfileScreen() {
  const { logout } = useContext(AuthContext);

  function logoutHandler() {
    logout();
  };

  return (
    <Pressable style={styles.container} onPress={logoutHandler}>
      <Text>logout</Text>
    </Pressable>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});