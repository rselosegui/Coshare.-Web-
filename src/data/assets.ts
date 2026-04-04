export type AssetCategory = 'Cars' | 'Motorbikes' | 'Yachts' | 'Others';
export type AssetSubcategory = 'Supercars' | 'Desert 4x4' | 'Classics' | 'Sailing' | 'Superbikes' | 'Cross' | 'Villas' | 'Apartments' | 'High-Value Items';

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
  // SUPERCARS (10)
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
    specs: { year: '2023', engine: '4.0L Twin-Turbo V8 Hybrid', power: '986 hp', location: 'Miami, USA' }
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
    specs: { year: '2024', engine: '6.5L V12 Hybrid', power: '1001 hp', location: 'Monaco' }
  },
  {
    id: 'car-super-3',
    name: 'McLaren 765LT',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1620882814836-98eb180924ce?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 110000,
    totalShares: 8,
    availableShares: 2,
    description: 'A track-focused marvel, lighter and more powerful than its predecessors.',
    specs: { year: '2022', engine: '4.0L Twin-Turbo V8', power: '755 hp', location: 'London, UK' }
  },
  {
    id: 'car-super-4',
    name: 'Porsche 911 GT3 RS',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 95000,
    totalShares: 8,
    availableShares: 4,
    description: 'Street-legal track weapon with unparalleled aerodynamics and precision.',
    specs: { year: '2023', engine: '4.0L Naturally Aspirated Flat-6', power: '518 hp', location: 'Los Angeles, USA' }
  },
  {
    id: 'car-super-5',
    name: 'Aston Martin DBS Superleggera',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 85000,
    totalShares: 8,
    availableShares: 6,
    description: 'The ultimate British grand tourer, combining brute force with elegant styling.',
    specs: { year: '2022', engine: '5.2L Twin-Turbo V12', power: '715 hp', location: 'London, UK' }
  },
  {
    id: 'car-super-6',
    name: 'Ferrari 296 GTB',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1675453890666-3d2371901a12?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 105000,
    totalShares: 8,
    availableShares: 3,
    description: 'A new era of Ferrari V6 hybrid performance, offering thrilling agility.',
    specs: { year: '2023', engine: '3.0L Twin-Turbo V6 Hybrid', power: '819 hp', location: 'Miami, USA' }
  },
  {
    id: 'car-super-7',
    name: 'Lamborghini Huracan STO',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 115000,
    totalShares: 8,
    availableShares: 1,
    description: 'A road-homologated super sports car inspired by Lamborghini Squadra Corse.',
    specs: { year: '2022', engine: '5.2L Naturally Aspirated V10', power: '631 hp', location: 'Monaco' }
  },
  {
    id: 'car-super-8',
    name: 'McLaren Artura',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1621245084930-b976b91176b6?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 75000,
    totalShares: 8,
    availableShares: 5,
    description: 'The next generation of McLaren, featuring a high-performance hybrid powertrain.',
    specs: { year: '2023', engine: '3.0L Twin-Turbo V6 Hybrid', power: '671 hp', location: 'London, UK' }
  },
  {
    id: 'car-super-9',
    name: 'Maserati MC20',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1655210255104-5f808781615f?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 80000,
    totalShares: 8,
    availableShares: 4,
    description: 'A super sports car that pushes the boundaries of time, racing into a new era.',
    specs: { year: '2023', engine: '3.0L Twin-Turbo V6 Nettuno', power: '621 hp', location: 'Miami, USA' }
  },
  {
    id: 'car-super-10',
    name: 'Audi R8 V10 Performance',
    category: 'Cars',
    subcategory: 'Supercars',
    imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 65000,
    totalShares: 8,
    availableShares: 2,
    description: 'The everyday supercar, boasting a screaming naturally aspirated V10.',
    specs: { year: '2022', engine: '5.2L Naturally Aspirated V10', power: '602 hp', location: 'Los Angeles, USA' }
  },

  // DESERT 4x4 / SUVs (7)
  {
    id: 'car-desert-1',
    name: 'Mercedes-Benz G63 AMG',
    category: 'Cars',
    subcategory: 'Desert 4x4',
    imageUrl: 'https://images.unsplash.com/photo-1520050735087-1ed65d9b0273?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 45000,
    totalShares: 8,
    availableShares: 0,
    description: 'The ultimate off-roader, combining rugged capability with opulent comfort.',
    specs: { year: '2023', engine: '4.0L Twin-Turbo V8', power: '577 hp', location: 'Miami, USA' }
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
    description: 'Unstoppable off-road capability meets modern comfort and V8 performance.',
    specs: { year: '2023', engine: '5.0L Supercharged V8', power: '518 hp', location: 'London, UK' }
  },
  {
    id: 'car-desert-3',
    name: 'Lamborghini Urus Performante',
    category: 'Cars',
    subcategory: 'Desert 4x4',
    imageUrl: 'https://images.unsplash.com/photo-1658316886476-c4b64e1c2105?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 65000,
    totalShares: 8,
    availableShares: 3,
    description: 'A visionary concept: a super sports car soul inside an SUV body.',
    specs: { year: '2023', engine: '4.0L Twin-Turbo V8', power: '657 hp', location: 'Los Angeles, USA' }
  },
  {
    id: 'car-desert-4',
    name: 'Range Rover SV Autobiography',
    category: 'Cars',
    subcategory: 'Desert 4x4',
    imageUrl: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 55000,
    totalShares: 8,
    availableShares: 4,
    description: 'The pinnacle of Range Rover refinement, offering unparalleled comfort.',
    specs: { year: '2023', engine: '4.4L Twin-Turbo V8', power: '606 hp', location: 'London, UK' }
  },
  {
    id: 'car-desert-5',
    name: 'Porsche Cayenne Turbo GT',
    category: 'Cars',
    subcategory: 'Desert 4x4',
    imageUrl: 'https://images.unsplash.com/photo-1503376713246-1f17afcecf66?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 48000,
    totalShares: 8,
    availableShares: 2,
    description: 'Sports car performance wrapped in a versatile SUV package.',
    specs: { year: '2023', engine: '4.0L Twin-Turbo V8', power: '631 hp', location: 'Miami, USA' }
  },
  {
    id: 'car-desert-6',
    name: 'Bentley Bentayga Speed',
    category: 'Cars',
    subcategory: 'Desert 4x4',
    imageUrl: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 70000,
    totalShares: 8,
    availableShares: 5,
    description: 'One of the fastest and most luxurious SUVs in the world.',
    specs: { year: '2022', engine: '6.0L Twin-Turbo W12', power: '626 hp', location: 'Monaco' }
  },
  {
    id: 'car-desert-7',
    name: 'Rolls-Royce Cullinan',
    category: 'Cars',
    subcategory: 'Desert 4x4',
    imageUrl: 'https://images.unsplash.com/photo-1631835359902-149622d9b23f?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 110000,
    totalShares: 8,
    availableShares: 3,
    description: 'Supreme comfort meets absolute capability. Effortless, everywhere.',
    specs: { year: '2023', engine: '6.75L Twin-Turbo V12', power: '563 hp', location: 'London, UK' }
  },

  // CLASSICS (4)
  {
    id: 'car-classic-1',
    name: 'Porsche 911 Carrera RS 2.7',
    category: 'Cars',
    subcategory: 'Classics',
    imageUrl: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 180000,
    totalShares: 10,
    availableShares: 4,
    description: 'One of the most sought-after classic Porsches, featuring the iconic ducktail spoiler.',
    specs: { year: '1973', engine: '2.7L Flat-6', power: '210 hp', location: 'Los Angeles, USA' }
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
    specs: { year: '1955', engine: '3.0L Inline-6', power: '215 hp', location: 'Monaco' }
  },
  {
    id: 'car-classic-3',
    name: 'Ferrari F40',
    category: 'Cars',
    subcategory: 'Classics',
    imageUrl: 'https://images.unsplash.com/photo-1583122620071-5460a0f44f23?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 650000,
    totalShares: 10,
    availableShares: 2,
    description: 'The last Ferrari personally approved by Enzo Ferrari. A raw, twin-turbo masterpiece.',
    specs: { year: '1990', engine: '2.9L Twin-Turbo V8', power: '471 hp', location: 'Miami, USA' }
  },
  {
    id: 'car-classic-4',
    name: 'Jaguar E-Type Series 1',
    category: 'Cars',
    subcategory: 'Classics',
    imageUrl: 'https://images.unsplash.com/photo-1549615049-598286a6b8d4?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 85000,
    totalShares: 10,
    availableShares: 5,
    description: 'Famously described by Enzo Ferrari as "the most beautiful car ever made".',
    specs: { year: '1964', engine: '3.8L Inline-6', power: '265 hp', location: 'London, UK' }
  },

  // MOTORBIKES (2)
  {
    id: 'bike-super-1',
    name: 'Ducati Panigale V4 S',
    category: 'Motorbikes',
    subcategory: 'Superbikes',
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 12000,
    totalShares: 4,
    availableShares: 1,
    description: 'A symphony of Italian engineering, delivering track-ready performance for the street.',
    specs: { year: '2023', engine: '1,103cc Desmosedici Stradale V4', power: '210 hp', location: 'Miami, USA' }
  },
  {
    id: 'bike-cross-1',
    name: 'BMW R 1250 GS Adventure',
    category: 'Motorbikes',
    subcategory: 'Cross',
    imageUrl: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1000',
    pricePerShare: 8000,
    totalShares: 4,
    availableShares: 2,
    description: 'The undisputed king of adventure touring, ready to conquer any terrain.',
    specs: { year: '2023', engine: '1,254cc Flat-Twin Boxer', power: '136 hp', location: 'London, UK' }
  }
];
