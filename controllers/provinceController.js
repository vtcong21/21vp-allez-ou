const Province = require('../models/province');


const getAllProvinces = async (req, res) => {
  try {
    const provinces = await Province.find();
    res.status(200).json(provinces);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

const getProvinceByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const province = await Province.findOne({ code });
    if (!province) {
      return res.status(404).json({ message: 'province not found' });
    }
    res.status(200).json(province);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  getAllProvinces,
  getProvinceByCode
}