import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

import Landing from '@/components/landing';

export default function Index() {
  if (Platform.OS !== 'web') return <Redirect href="/read" />;
  return <Landing />;
}
