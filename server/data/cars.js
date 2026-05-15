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
      '/images/ms1.jpeg',
      '/images/ms2.jpeg',
      '/images/ms3.jpeg'
    ],
    overview: 'Well-maintained hatchback with excellent mileage and low maintenance cost.',
    features: [
      'ABS with EBD',
      'Dual airbags',
      'Touchscreen infotainment',
      'Rear parking sensors'
    ],
    color: 'Fusion Red',
    owners: 1,
    insurance: 'Valid until 2027',
    sellerName: 'CarBazzar',
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
      '/images/hc1.jpeg',
      '/images/hc2.jpeg',
      '/images/hc3.jpeg'
    ],
    overview: 'Spacious SUV with premium interiors and excellent road presence.',
    features: [
      'Apple CarPlay',
      'Rear AC vents',
      'Automatic gearbox',
      'LED DRLs'
    ],
    color: 'Silver',
    owners: 2,
    insurance: 'Valid until 2026',
    sellerName: 'CarBazzar',
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
      '/images/c1.jpeg',
      '/images/c2.jpeg',
      '/images/c3.jpeg'
    ],
    overview: 'Premium sedan with smooth driving experience and excellent comfort.',
    features: [
      'Sunroof',
      'Push button start',
      'Rear camera',
      'Auto climate control'
    ],
    color: 'Pearl White',
    owners: 1,
    insurance: 'Valid until 2028',
    sellerName: 'CarBazzar',
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
      '/images/s1.jpeg',
      '/images/s2.jpeg',
      '/images/s3.jpeg'
    ],
    overview: 'Rugged SUV ideal for highways and family road trips.',
    features: [
      '7 Seater',
      'Cruise control',
      'Touchscreen system',
      'Rear camera'
    ],
    color: 'Black',
    owners: 2,
    insurance: 'Valid until 2027',
    sellerName: 'CarBazzar',
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
      '/images/f1.jpeg',
      '/images/f2.jpeg',
      '/images/f3.jpeg'
    ],
    overview: 'Premium SUV with powerful engine and luxury interiors.',
    features: [
      'Leather seats',
      'Cruise control',
      'Automatic transmission',
      'LED headlamps'
    ],
    color: 'Midnight Black',
    owners: 1,
    insurance: 'Valid until 2028',
    sellerName: 'CarBazzar',
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
      '/images/p1.jpeg',
      '/images/p2.jpeg',
      '/images/p3.jpeg'
    ],
    overview: 'German-engineered hatchback with sporty performance.',
    features: [
      'DSG automatic',
      'ESP with ABS',
      'Touchscreen system',
      'Climate control'
    ],
    color: 'Blue',
    owners: 1,
    insurance: 'Valid until 2026',
    sellerName: 'CarBazzar',
    sellerLocation: 'Pune, India',
  }
]

export async function seedCars() {
  await Car.deleteMany()
  await Car.create(carSeed)
  console.log(`Reset MongoDB car inventory to ${carSeed.length} updated cars`)
}