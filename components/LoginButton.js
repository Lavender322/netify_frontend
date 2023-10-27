import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Pressable, Linking, Alert, Text } from 'react-native';
import axios from 'axios';

function LoginButton() {
  const [returnedUrl, setReturnedUrl] = useState(null);

  useEffect(() => {
    if (returnedUrl) {
      async function openURL() {
        const supported = await Linking.canOpenURL(returnedUrl);
  
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(returnedUrl);
        } else {
          Alert.alert(`Don't know how to open this URL: ${returnedUrl}`);
        }
      };
      openURL();
      setReturnedUrl(null);
    };
  }, [returnedUrl]);

  function connectToLinkedin() {
    if (!returnedUrl) {
      axios({
        method: 'GET',
        url: 'https://netify.iqust.top/linkedin/sso',
      })
        .then((res) => {
          setReturnedUrl(res.data.data.url);
        })
        .catch((error) => {
          console.log("/linkedin/sso", error);
        });
    };     
  };

  return (
    <Pressable 
      style={({pressed}) => pressed && styles.pressedItem}
      onPress={connectToLinkedin}
    >
      <View style={styles.button}>
        <Image style={styles.logo} source={require("../assets/images/LinkedIn_logo_initials.png")} />
        <Text style={styles.buttonText}>Continue with LinkedIn</Text>
      </View>
    </Pressable>
  )
}

export default LoginButton

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#535353',
    borderWidth: 2,
    borderRadius: 4,
    paddingVertical: 10,
    justifyContent: 'center'
  },
  logo: {
    width: 21,
    height: 21,
    marginRight: 8
  },
  buttonText: {
    color: '#000000',
    fontFamily: 'inter-semibold',
    fontSize: 16
  },
  pressedItem: {
    opacity: 0.75
  },
});