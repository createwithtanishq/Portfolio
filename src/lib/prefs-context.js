import { createContext, useContext } from 'react';

export const PrefsContext = createContext(null);

export const usePrefs = () => useContext(PrefsContext);

/* True when an item tagged with `tags` fits the current lens. */
export const fits = (lens, tags = []) => lens === 'all' || tags.includes(lens);
