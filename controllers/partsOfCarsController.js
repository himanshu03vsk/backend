const PartsOfCars = require('../models/PartsOfCars');
const Part = require('../models/Part');
const Sequelize = require('sequelize');

exports.getAllPartsOfCars = (req, res) => {
    res.status(200).json({ message: 'getAllPartsOfCars' });
}

exports.getMakeModelYear = async (req, res) => {
  const { part_id } = req.query;
  try {
      const part = await PartsOfCars.findAll({
          where: { part_id },
          attributes: ['make', 'model', 'car_year']
      });

      if (!part) return res.status(404).json({ message: 'Part not found' });

      // Wrap the single object in an array
      res.status(200).json(part);  // Send part as an array
  } catch (err) {
      console.error('Error in getMakeModelYear:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
  }
}

exports.getPartsOfCarsById = (req, res) => {
    res.status(200).json({ message: 'getPartsOfCarsById' });
}

exports.createPartsOfCars = (req, res) => {
    res.status(200).json({ message: 'createPartsOfCars' });
}

exports.updatePartsOfCars = (req, res) => {
    res.status(200).json({ message: 'updatePartsOfCars' });
}

exports.deletePartsOfCars = (req, res) => {
    res.status(200).json({ message: 'deletePartsOfCars' });
}

// returns a list of products and their relative information when searching by car make, model and year
exports.searchParts = async (req, res) => {
    const { make, model, year } = req.query;
  
    try {
      const whereClause = {};
      if (make) whereClause.make = make;
      if (model) whereClause.model = model;
      if (year) whereClause.car_year = year;
  
      const matched = await PartsOfCars.findAll({
        where: whereClause,
        attributes: ['part_id', 'make', 'model', 'car_year']
      });
  
      if (!matched.length) return res.json([]);
  
      const partIds = matched.map(p => p.part_id);
      const carMap = {};
      matched.forEach(p => {
        carMap[p.part_id] = {
          make: p.make,
          model: p.model,
          car_year: p.car_year
        };
      });
  
      const parts = await Part.findAll({
        where: { part_id: partIds }
      });
  
      const result = parts.map(part => ({
        ...part.toJSON(),
        ...carMap[part.part_id] // attach car info
      }));
  
      res.json(result);
    } catch (err) {
      console.error('Error in searchParts:', err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };