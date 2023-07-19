const TourCard = require('../models/tourCard');

const getAllTourCards = async (req, res) => {
  try {
    const tourCards = await TourCard.find({}, 'name code start_place_code end_place_code price promo_discount date time remain_slots num_of_days card_img_url');
    res.status(200).json(tourCards);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
//
const searchTourCards = async (req, res) => {
  try {
    const { startPlaceCode, endPlaceCode, numOfPeople, numOfDays, travelDate, minPrice, maxPrice } = req.query;
    const query = TourCard.find({}, 'name code start_place_code end_place_code price promo_discount date time remain_slots num_of_days card_img_url');
    if (startPlaceCode) {
      query.where('start_place_code').equals(startPlaceCode);
    }
    if (endPlaceCode && endPlaceCode.length > 0) {
      query.where('end_place_code').in(endPlaceCode);
    }
    if (numOfPeople) {
      query.where('remain_slots').gte(numOfPeople);
    }
    if (travelDate) {
      query.where('date').equals(travelDate);
    }
    if (numOfDays) {
      query.where('num_of_days').equals(numOfDays);
    }
    if (minPrice && maxPrice) {
      query.where('price').gte(minPrice).lte(maxPrice);
    }
    const results = await query.exec();
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTourCardByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const tourCard = await TourCard.findOne({ code }, 'name code start_place_code end_place_code price promo_discount date time remain_slots num_of_days card_img_url');
    if (!tourCard) {
      return res.status(404).json({ message: 'Tour card not found' });
    }
    res.status(200).json(tourCard);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getRandom3TourCards = async (req, res) => {
  try {
    const currentDate = new Date();
    const tourCards = await TourCard.find({ date: { $gte: currentDate } }, 'name code start_place_code end_place_code price promo_discount date time remain_slots num_of_days card_img_url')
      .limit(3);
      
    res.status(200).json(tourCards);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  searchTourCards,
  getAllTourCards,
  getTourCardByCode,
  getRandom3TourCards
};
