import { router } from 'expo-router';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import { useSession } from '@/context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import AppButton from '@/components/AppButton';

export default function SignIn() {
  const { signIn } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <ThemedView style={{ ...styles.titleContainer, paddingVertical: 16 }}>
        <ThemedText type="title">Sign In</ThemedText>
      </ThemedView>
      <View style={styles.form}>
        <TextInput
          autoCapitalize="none"
          autoFocus={true}
          style={styles.input}
          onChangeText={setEmail}
          placeholder="Enter email"
        >
          <ThemedText>{email}</ThemedText>
        </TextInput>
        <TextInput
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
          style={styles.input}
          onChangeText={setPassword}
          placeholder="Enter password"
        >
          <ThemedText>{password}</ThemedText>
        </TextInput>
      </View>
      <View style={{ paddingVertical: 16 }}>
        <AppButton
          title="Login"
          onPress={() => {
            signIn();
            // Navigate after signing in. Tweak this to ensure sign-in is
            // successful before navigating.
            router.replace('/');
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
