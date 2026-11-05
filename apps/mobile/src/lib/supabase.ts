import './polyfills';

import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

import { config } from './config';

/** The parent's sign-in. The session is kept on the phone and refreshed while the app is open. */
export const supabase = createClient(config.supabaseUrl, config.supabasePublishableKey, {
  auth: {
    // On the web build this is the browser's localStorage; on phones the import above installs one.
    storage: typeof localStorage === 'undefined' ? undefined : localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
});

// Refresh the session only while the app is in the foreground (Supabase's React Native advice).
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}

export async function accessToken(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}
