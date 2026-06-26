import express from 'express';
import Car from '../models/Car.js';

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().sort({ brand: 1, name: 1 });
    res.json({ success: true, count: cars.length, cars });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch cars' });
  }
});

// Seed cars in the database
router.post('/seed', async (req, res) => {
  try {
    // Check if cars already exist
    const count = await Car.countDocuments();
    if (count > 0 && !req.query.force) {
      return res.json({ success: true, message: 'Database already seeded', count });
    }

    // Delete existing if force query is provided
    if (req.query.force) {
      await Car.deleteMany({});
    }

    const defaultCars = [
      // Hatchback
      { name: 'Altroz', brand: 'Tata', category: 'Hatch Back Cars', seats: 5, bags: 2, price: 1800, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/17385822631.jpg' },
      { name: 'Swift Desire', brand: 'Maruti Suzuki', category: 'Hatch Back Cars', seats: 5, bags: 2, price: 1800, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/17385822932.jpg' },
      { name: 'i 10', brand: 'Hyundai', category: 'Hatch Back Cars', seats: 5, bags: 2, price: 1700, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/17385823253.jpg' },
      { name: 'Tigor', brand: 'Tata', category: 'Hatch Back Cars', seats: 5, bags: 3, price: 1900, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/17385823624.jpg' },

      // Sedan
      { name: 'City', brand: 'Honda', category: 'Sedan Cars', seats: 5, bags: 3, price: 2500, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/17385824055.jpg' },
      { name: 'Dzire', brand: 'Maruti Suzuki', category: 'Sedan Cars', seats: 5, bags: 3, price: 2200, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/17385825246.jpg' },
      { name: 'Amaze', brand: 'Honda', category: 'Sedan Cars', seats: 5, bags: 3, price: 2300, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/17385825657.jpg' },
      { name: 'Zest', brand: 'Tata', category: 'Sedan Cars', seats: 5, bags: 3, price: 2200, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/17385825978.jpg' },
      { name: 'Xcent', brand: 'Hyundai', category: 'Sedan Cars', seats: 5, bags: 3, price: 2200, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/17385826279.jpg' },
      { name: 'Baleno', brand: 'Maruti Suzuki', category: 'Sedan Cars', seats: 5, bags: 3, price: 2300, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858272411.jpg' },
      { name: 'Punch', brand: 'Tata', category: 'Sedan Cars', seats: 5, bags: 3, price: 2200, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/173858301812.jpg' },

      // SUV
      { name: 'Scorpio', brand: 'Mahindra', category: 'SUV Cars', seats: 7, bags: 4, price: 3500, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/173858314713.jpg' },
      { name: 'Ertiga', brand: 'Maruti Suzuki', category: 'SUV Cars', seats: 7, bags: 4, price: 3200, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858319614.jpg' },
      { name: 'XL6', brand: 'Maruti Suzuki', category: 'SUV Cars', seats: 6, bags: 3, price: 3400, type: 'Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858324215.jpg' },
      { name: 'Bolero', brand: 'Mahindra', category: 'SUV Cars', seats: 7, bags: 5, price: 3000, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/173858327516.jpg' },
      { name: 'Thar', brand: 'Mahindra', category: 'SUV Cars', seats: 4, bags: 2, price: 3500, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858331617.jpg' },
      { name: 'XUV 3XO', brand: 'Mahindra', category: 'SUV Cars', seats: 5, bags: 3, price: 3200, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858333918.jpg' },
      { name: 'Brezza', brand: 'Maruti Suzuki', category: 'SUV Cars', seats: 5, bags: 3, price: 3000, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858337319.jpg' },
      { name: 'Nexon', brand: 'Tata', category: 'SUV Cars', seats: 5, bags: 3, price: 3000, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858348834.jpg' },

      // MUV
      { name: 'Innova', brand: 'Toyota', category: 'MUV Cars', seats: 7, bags: 5, price: 4200, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858353220.jpg' },
      { name: 'XUV 700', brand: 'Mahindra', category: 'MUV Cars', seats: 7, bags: 4, price: 4500, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858355921.jpg' },

      // Luxury
      { name: 'TT', brand: 'Audi', category: 'Luxury Cars', seats: 2, bags: 2, price: 15000, type: 'Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858358722.jpg' },
      { name: 'M6', brand: 'BMW', category: 'Luxury Cars', seats: 4, bags: 2, price: 16000, type: 'Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858360723.jpg' },
      { name: 'Benz S-Class', brand: 'Mercedes-Benz', category: 'Luxury Cars', seats: 5, bags: 4, price: 18000, type: 'Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858367224.jpg' },
      { name: 'Fortuner', brand: 'Toyota', category: 'Luxury Cars', seats: 7, bags: 5, price: 5500, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858370925.jpg' },
      { name: 'Range Rover', brand: 'Land Rover', category: 'Luxury Cars', seats: 5, bags: 5, price: 20000, type: 'Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858376726.jpg' },

      // Premium Sedan
      { name: 'Honda City', brand: 'Honda', category: 'Premium Sedan Cars', seats: 5, bags: 3, price: 2800, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858380427.jpg' },
      { name: 'Verna', brand: 'Hyundai', category: 'Premium Sedan Cars', seats: 5, bags: 3, price: 2800, type: 'Manual/Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858383028.jpg' },

      // Bus Services
      { name: 'Premium Coach B11R', brand: 'Volvo', category: 'Bus Services', seats: 45, bags: 30, price: 22000, type: 'Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858387029.jpg' },
      { name: 'AC Bus Volvo 9700', brand: 'Volvo', category: 'Bus Services', seats: 40, bags: 25, price: 20000, type: 'Automatic', image: 'https://thecarclub.in/admin/uploads/car/173858389730.jpg' },
      { name: 'Non-AC Bus', brand: 'Volvo', category: 'Bus Services', seats: 40, bags: 25, price: 15000, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/173858391631.jpg' },
      { name: 'Traveller Standard', brand: 'Force Traveller', category: 'Bus Services', seats: 17, bags: 12, price: 7500, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/173858393932.jpg' },
      { name: 'Winger Vans', brand: 'Tata', category: 'Bus Services', seats: 12, bags: 8, price: 5500, type: 'Manual', image: 'https://thecarclub.in/admin/uploads/car/173858397933.jpg' }
    ];

    await Car.insertMany(defaultCars);
    res.status(251).json({ success: true, message: 'Cars seeded successfully', count: defaultCars.length });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ success: false, message: 'Failed to seed database', error: error.message });
  }
});

export default router;
