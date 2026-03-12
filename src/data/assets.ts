export type AssetCategory = 'Cars' | 'Superbikes' | 'Yachts' | 'Real Estate' | 'Watches' | 'Others';
export type AssetSubcategory = 'Supercars' | 'Desert 4x4' | 'Classics' | 'Sailing' | 'Superbikes' | 'Villas' | 'Apartments' | 'Luxury';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  subcategory: AssetSubcategory;
  imageUrl: string;
  pricePerShare: number;
  totalShares: number;
  availableShares: number;
  description: string;
  specs: {
    year: string;
    engine?: string;
    power?: string;
    location: string;
  };
}

export const ASSETS: Asset[] = [
  {
    id: 'car-super-1',
    name: 'Ferrari SF90 Stradale',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1592853625511-85c19280742d?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 125000,
    totalShares: 8,
    availableShares: 3,
    description: 'The pinnacle of Ferrari engineering, combining a V8 engine with three electric motors.',
    specs: { year: '2023', engine: '4.0L Twin-Turbo V8 Hybrid', power: '986 hp', location: 'Dubai, UAE' }
  },
  {
    id: 'car-super-2',
    name: 'Lamborghini Revuelto',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1669023030485-573b6a75ab64?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 140000,
    totalShares: 8,
    availableShares: 5,
    description: 'The first HPEV (High Performance Electrified Vehicle) hybrid super sports car.',
    specs: { year: '2024', engine: '6.5L V12 Hybrid', power: '1001 hp', location: 'Abu Dhabi, UAE' }
  },
  {
    id: 'car-desert-1',
    name: 'Mercedes-Benz G63 AMG',
    category: 'Cars',
    subcategory: 'Desert 4x4',
    imageUrl: 'https://images.unsplash.com/photo-1520050735087-1ed65d9b0273?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 45000,
    totalShares: 8,
    availableShares: 0,
    description: 'The ultimate luxury off-roader, combining rugged capability with opulent comfort.',
    specs: { year: '2023', engine: '4.0L Twin-Turbo V8', power: '577 hp', location: 'Dubai, UAE' }
  },
  {
    id: 'car-desert-2',
    name: 'Land Rover Defender 110 V8',
    category: 'Cars',
    subcategory: 'Desert 4x4',
    imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 35000,
    totalShares: 8,
    availableShares: 2,
    description: 'Unstoppable off-road capability meets modern luxury and V8 performance.',
    specs: { year: '2023', engine: '5.0L Supercharged V8', power: '518 hp', location: 'Dubai, UAE' }
  },
  {
    id: 'car-classic-1',
    name: 'Porsche 911 Carrera RS 2.7',
    category: 'Cars',
    subcategory: 'Classics',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 180000,
    totalShares: 10,
    availableShares: 4,
    description: 'One of the most sought-after classic Porsches, featuring the iconic ducktail spoiler.',
    specs: { year: '1973', engine: '2.7L Flat-6', power: '210 hp', location: 'Dubai, UAE' }
  },
  {
    id: 'car-classic-2',
    name: 'Mercedes-Benz 300 SL Gullwing',
    category: 'Cars',
    subcategory: 'Classics',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 450000,
    totalShares: 10,
    availableShares: 1,
    description: 'An automotive icon known for its distinctive gullwing doors and racing pedigree.',
    specs: { year: '1955', engine: '3.0L Inline-6', power: '215 hp', location: 'Abu Dhabi, UAE' }
  },
  {
    id: 'other-sail-1',
    name: 'Sunseeker Predator 74',
    category: 'Yachts',
    subcategory: 'Sailing',
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 350000,
    totalShares: 6,
    availableShares: 2,
    description: 'A masterpiece of design and performance, perfect for cruising the Arabian Gulf.',
    specs: { year: '2022', engine: 'Twin MAN V12', power: '3800 hp', location: 'Dubai Marina, UAE' }
  },
  {
    id: 'other-sail-2',
    name: 'Azimut Grande 27M',
    category: 'Yachts',
    subcategory: 'Sailing',
    imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 600000,
    totalShares: 8,
    availableShares: 3,
    description: 'Italian elegance and innovative use of space make this the ultimate luxury yacht.',
    specs: { year: '2023', engine: 'Twin MAN V12', power: '3800 hp', location: 'Dubai Harbor, UAE' }
  },
  {
    id: 'other-bike-1',
    name: 'Ducati Superleggera V4',
    category: 'Superbikes',
    subcategory: 'Superbikes',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 25000,
    totalShares: 4,
    availableShares: 1,
    description: 'The most powerful and technologically advanced production Ducati ever built.',
    specs: { year: '2023', engine: '998cc V4', power: '234 hp', location: 'Dubai, UAE' }
  },
  {
    id: 'other-bike-2',
    name: 'BMW M 1000 RR',
    category: 'Superbikes',
    subcategory: 'Superbikes',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000', // Reusing image for now
    pricePerShare: 15000,
    totalShares: 4,
    availableShares: 2,
    description: 'Born on the racetrack, built for the road. The pinnacle of BMW Motorrad engineering.',
    specs: { year: '2024', engine: '999cc Inline-4', power: '212 hp', location: 'Abu Dhabi, UAE' }
  }
];
