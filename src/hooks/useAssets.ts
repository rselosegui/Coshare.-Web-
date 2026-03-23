import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Asset } from '../data/assets';

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'assets'),
      (snapshot) => {
        const fetchedAssets = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Asset[];
        setAssets(fetchedAssets);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching assets:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { assets, loading, error };
};
