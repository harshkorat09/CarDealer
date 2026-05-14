import Car from '../models/Car.js'

export const carSeed = [
  {
    name: 'Maruti Suzuki Swift VXI',
    brand: 'Maruti Suzuki',
    price: 650000,
    year: 2020,
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '45,000 km',
    seats: 5,
    bodyType: 'Hatchback',
    images: [
      'https://images.unsplash.com/photo-1549399735-cef2e2c3f638?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1471478337293-9845f618fedb?auto=format&fit=crop&w=1400&q=80'
    ],
    overview: 'Popular hatchback known for reliability, fuel efficiency, and low maintenance costs.',
    features: ['ABS with EBD', 'Dual airbags', 'Touchscreen infotainment', 'Rear parking sensors'],
    sellerName: 'AutoVault Premium',
    sellerLocation: 'Delhi, India',
  },
  {
    name: 'Hyundai Creta SX',
    brand: 'Hyundai',
    price: 1250000,
    year: 2019,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: '68,000 km',
    seats: 5,
    bodyType: 'SUV',
    images: [
      'https://images.unsplash.com/photo-1549399735-cef2e2c3f638?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80'
    ],
    overview: 'Spacious compact SUV with modern features and strong resale value.',
    features: ['6-speed automatic', 'Touchscreen with Apple CarPlay', 'Rear AC vents', 'LED DRLs'],
    sellerName: 'AutoVault Premium',
    sellerLocation: 'Mumbai, India',
  },
  {
    name: 'Honda City ZX',
    brand: 'Honda',
    price: 950000,
    year: 2021,
    fuelType: 'Petrol',
    transmission: 'Manual',
    mileage: '32,000 km',
    seats: 5,
    bodyType: 'Sedan',
    images: [
      'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80'
    ],
    overview: 'Reliable sedan with excellent build quality and low ownership costs.',
    features: ['Honda Connect', 'Multi-angle rear camera', 'Auto climate control', 'Smart keyless entry'],
    sellerName: 'AutoVault Premium',
    sellerLocation: 'Bangalore, India',
  },
  {
    name: 'Mahindra Scorpio S11',
    brand: 'Mahindra',
    price: 1350000,
    year: 2022,
    fuelType: 'Diesel',
    transmission: 'Manual',
    mileage: '28,000 km',
    seats: 7,
    bodyType: 'SUV',
    images: [
      'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1498598452786-0a4fe5e26269?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80'
    ],
    overview: 'Rugged 7-seater SUV perfect for family trips and off-road adventures.',
    features: ['4x4 capability', 'Touchscreen infotainment', 'Hill hold control', 'Roof rails'],
    sellerName: 'AutoVault Premium',
    sellerLocation: 'Chennai, India',
  },
  {
    name: 'Toyota Fortuner Sigma 4',
    brand: 'Toyota',
    price: 2850000,
    year: 2020,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    mileage: '55,000 km',
    seats: 7,
    bodyType: 'SUV',
    images: [
      'https://images.unsplash.com/photo-1549921296-3ec0a4c528ea?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d0?auto=format&fit=crop&w=1400&q=80'
    ],
    overview: 'Premium SUV with legendary reliability and strong resale value.',
    features: ['TRD body kit', '7-inch touchscreen', 'Cruise control', 'Multi-terrain select'],
    sellerName: 'AutoVault Premium',
    sellerLocation: 'Hyderabad, India',
  },
  {
    name: 'Volkswagen Polo Highline Plus',
    brand: 'Volkswagen',
    price: 725000,
    year: 2018,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    mileage: '42,000 km',
    seats: 5,
    bodyType: 'Hatchback',
    images: [
      'https://images.unsplash.com/photo-1511910849309-8e8a9f73a8a2?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1549921296-3ec0a4c528ea?auto=format&fit=crop&w=1400&q=80'
    ],
    overview: 'German engineering with premium interiors and advanced safety features.',
    features: ['Multi-function steering', 'Composition Media', 'ESP with ABS', 'Climatronic AC'],
    sellerName: 'AutoVault Premium',
    sellerLocation: 'Pune, India',
  }
]

export async function seedCars() {
  const count = await Car.countDocuments()
  if (count === 0) {
    await Car.create(carSeed)
    console.log('Seeded car inventory to MongoDB')
  }
}
