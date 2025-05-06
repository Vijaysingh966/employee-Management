const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

//   CREATE - POST /api/employee
router.post('/', async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.status(201).send(emp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//   READ - GET /api/employee?search=
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const data = await Employee.find(query);
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//   READ BY ID - GET /api/employee/:id
router.get('/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.send(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//   UPDATE - PUT /api/employee/:id
router.put('/:id', async (req, res) => {
  try {
    const updates = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updates) return res.status(404).json({ message: 'Employee not found' });
    res.send(updates);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//  DELETE - DELETE /api/employee/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
