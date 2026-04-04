import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ASSETS } from '../data/assets';

export const seedAssets = async () => {
  try {
    const assetsRef = collection(db, 'assets');
    const snapshot = await getDocs(assetsRef);
    
    if (snapshot.empty) {
      console.log('Seeding assets...');
      for (const asset of ASSETS) {
        await setDoc(doc(assetsRef, asset.id), {
          name: asset.name,
          description: asset.description,
          category: asset.category,
          subcategory: asset.subcategory,
          pricePerShare: asset.pricePerShare,
          totalShares: asset.totalShares,
          availableShares: asset.availableShares,
          imageUrl: asset.imageUrl,
          specs: asset.specs || {}
        });
      }
      console.log('Assets seeded successfully!');
    } else {
      console.log('Assets already seeded.');
    }
  } catch (error) {
    console.error('Error seeding assets:', error);
  }
};
