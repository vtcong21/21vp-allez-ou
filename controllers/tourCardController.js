const TourCard = require('../models/tourCard');

const getAllTourCards = async (req, res) => {
  try {
    const tourCards = await TourCard.find({}, 'name code startPlace endPlaces price promoDiscount date time remainSlots numOfDays cardImgUrl');
    res.status(200).json(tourCards);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
//
const searchTourCards = async (req, res) => {
  try {
    const { startPlaceCode, endPlaceCode, numOfPeople, numOfDays, travelDate, minPrice, maxPrice } = req.query;
    const query = TourCard.find({}, 'name code startPlace endPlaces price promoDiscount date time remainSlots numOfDays cardImgUrl');
    
    if (startPlaceCode) {
      query.where('startPlace.code').equals(startPlaceCode);
    }

    if (endPlaceCode && endPlaceCode.length > 0) {
      query.where('endPlaces.code').in(endPlaceCode);
    }

    if (numOfPeople) {
      query.where('remainSlots').gte(numOfPeople);
    }

    if (travelDate) {
      query.where('date').equals(new Date(travelDate));
    }

    if (numOfDays) {
      query.where('numOfDays').equals(numOfDays);
    }

    if (minPrice && maxPrice) {
      query.where('price').gte(minPrice).lte(maxPrice);
    }

    const results = await query.exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTourCardByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const tourCard = await TourCard.findOne({ code }, 'name code startPlace endPlaces price promoDiscount date time remainSlots numOfDays cardImgUrl');
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
    const tourCards = await TourCard.find({ date: { $gte: currentDate } }, 'name code startPlace endPlaces price promoDiscount date time remainSlots numOfDays cardImgUrl')
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
