import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {
  const { slug } = useLocalSearchParams();

  return <ThemedText>Track ID: {slug}</ThemedText>;
}
