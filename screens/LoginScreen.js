import { useEffect, useContext } from 'react';
import { AuthContext } from '../store/context/user-context';
import { authenticateUser } from '../utils/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function LoginScreen({ navigation, route }) {
  const state = route.params?.state;
  const code = route.params?.code;

  const { authenticate } = useContext(AuthContext);

  useEffect(() => {
    if (state && code) {
      async function login() {
        try {
          const token = await authenticateUser(state, code);
          authenticate(token);
          navigation.navigate('UserInfo');
        } catch (error) {
          console.log(error.response.data);
        }
      };

      login();
    };
  }, [state, code]);

  return (
    <LoadingOverlay />
  )
}

export default LoginScreen;