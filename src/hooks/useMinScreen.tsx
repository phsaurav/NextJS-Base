'use client';
import { Screens } from '@/types/screen';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface MinScreenProviderProps {
  children: ReactNode;
  screens: Screens;
}

const defaultValue: Screens = {};

const ScreensContext = createContext(defaultValue);

// * A provider to implement breakpoint of tailwindcss for conditional rendering
const MinScreenProvider: React.FC<MinScreenProviderProps> = ({
  children,
  screens,
}) => {
  const [queryMatch, setQueryMatch] = useState<Screens>({});

  useEffect(() => {
    const mediaQueryLists: Record<string, MediaQueryList | undefined> = {};
    let isAttached = false;

    const mediaData = Object.entries(screens).map(([name, media]) => [
      name,
      `(min-width: ${media})`,
    ]);

    const handleQueryListener = () => {
      const updatedMatches = mediaData.reduce(
        (acc, [name]) => ({
          ...acc,
          [name]: Boolean(
            mediaQueryLists[name] && mediaQueryLists[name]?.matches
          ),
        }),
        {}
      );
      setQueryMatch(updatedMatches);
    };

    if (typeof window !== 'undefined' && window.matchMedia) {
      const matches: any = {};

      mediaData.forEach(([name, media]) => {
        if (typeof media !== 'string') {
          matches[name] = false;
          return;
        }
        mediaQueryLists[name] = window.matchMedia(media);
        matches[name] = mediaQueryLists[name]?.matches || false;
      });

      setQueryMatch(matches);
      isAttached = true;

      mediaData.forEach(([name, media]) => {
        if (typeof media !== 'string') return;
        mediaQueryLists[name]?.addListener(handleQueryListener);
      });
    }

    return () => {
      if (!isAttached) return;
      mediaData.forEach(([name, media]) => {
        if (typeof media !== 'string') return;
        mediaQueryLists[name]?.removeListener(handleQueryListener);
      });
    };
  }, [screens]);

  return (
    <ScreensContext.Provider value={queryMatch}>
      {children}
    </ScreensContext.Provider>
  );
};

//* Hook to use min screen breakpoint provider
const useMinScreen = () => {
  const context = useContext(ScreensContext);
  if (context === defaultValue)
    throw new Error('useMinScreen must be used within a MinScreenProvider');

  return { min: (size: string) => context[size] };
};

export { MinScreenProvider, useMinScreen };
