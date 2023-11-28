'use client';

import { defaultScreens } from '@/config/constants/defaultScreens';
import tailwindConfig from '@/config/theme/tailwind.config';
import { MinScreenProvider } from '@/hooks/useMinScreen';
import store from '@/redux/store';
import { Screens } from '@/types/screen';
import React from 'react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import resolveConfig from 'tailwindcss/resolveConfig';

let persistor = persistStore(store);
const config = resolveConfig(tailwindConfig);

export default function CustomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MinScreenProvider
      screens={(config?.theme?.screens as Screens) || defaultScreens}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </MinScreenProvider>
  );
}
