import { defaultScreens } from '@/config/constants/defaultScreens';
import tailwindConfig from '@/config/theme/tailwind.config';
import { MinScreenProvider} from '@/hooks/useMinScreen';
import store from '@/redux/store';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import resolveConfig from 'tailwindcss/resolveConfig';
import './globals.css';
import { Screens } from '@/types/screen';

const inter = Inter({ subsets: ['latin'] });
let persistor = persistStore(store);
const config = resolveConfig(tailwindConfig);

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MinScreenProvider
          screens={(config?.theme?.screens as Screens) || defaultScreens}
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </MinScreenProvider>
      </body>
    </html>
  );
}
