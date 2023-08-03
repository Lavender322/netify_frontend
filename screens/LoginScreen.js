import { useEffect, useContext } from 'react';
import { authenticate } from '../utils/http';
import { UserContext } from '../store/context/user-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function LoginScreen({ navigation, route }) {
  const state = route.params?.state;
  const code = route.params?.code;

  const { setToken } = useContext(UserContext);

  useEffect(() => {
    if (state && code) {
      async function login() {
        try {
          const token = await authenticate(state, code);
          setToken(token);
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