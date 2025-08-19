import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);


  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('@wishlist');
        if (raw) setItems(JSON.parse(raw));
      } catch {}
    })();
  }, []);


  useEffect(() => {
    AsyncStorage.setItem('@wishlist', JSON.stringify(items)).catch(() => {});
  }, [items]);

  const add = (p) => setItems((list) => (list.find(x => x.id === p.id) ? list : [p, ...list]));
  const remove = (id) => setItems((list) => list.filter(x => x.id !== id));
  const toggle = (p) => setItems((list) => (list.find(x => x.id === p.id) ? list.filter(x => x.id !== p.id) : [p, ...list]));
  const has = (id) => items.some(x => x.id === id);
  const clear = () => setItems([]);

  const value = useMemo(() => ({ items, add, remove, toggle, has, clear }), [items]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
