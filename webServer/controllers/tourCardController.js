const TourCard = require('../models/tourCard');
const User = require('../models/tourCard');


function changeDateToString(currentTime) {
  var day = currentTime.getDate();
  var month = currentTime.getMonth() + 1;
  var year = currentTime.getFullYear();

  if (day.toString().length === 1) {
    day = "0" + day.toString();
  }
  if (month.toString().length === 1) {
    month = "0" + month.toString();
  }

  return day + "/" + month + "/" + year;
}

function convertGenderToVietnamese(gender) {
  if (gender === "Male") {
    return "Nam";
  } else if (gender === "Female") {
    return "Nữ";
  } else {
    return gender;
  }
}

const getAllTourCards = async (req, res) => {
  try {
    const tourCards = await TourCard.find({ isHidden: false }, 'name code startPlace endPlaces price promoDiscount date time remainSlots numOfDays cardImgUrl');
    //res.status(200).json(tourCards);
    // render cái gì tự bỏ vô đi
    //res.render('tourSearch', {tourCards});

    let user = await User.findById(req.userId).select('fullName email dateOfBirth phoneNumber gender');
    if (!tourCards) {
      return res.status(404).json({ message: 'Tour cards not found' });
    }
    if (user) {
      const formattedDateOfBirth = changeDateToString(user.dateOfBirth);
      const formattedGender = convertGenderToVietnamese(user.gender);
      user = { ...user.toObject(), dateOfBirth: formattedDateOfBirth, gender: formattedGender };
      res.render('tourSearch', { tourCards, user })
    } else {
      // Nếu không có user, render view EJS với dữ liệu user là null

      res.render('tourSearch', { tourCards, user: null });
    }
    //--------------------------------------
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const searchTourCards = async (req, res) => {
  try {
    const { startPlaceCode, endPlaceCode, numOfPeople, numOfDays, travelDate, minPrice, maxPrice } = req.query;
    const query = TourCard.find({ isHidden: false }, 'name code startPlace endPlaces price promoDiscount date time remainSlots numOfDays cardImgUrl');
    const user = req.user;
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

    let results = await query.exec();
    results = results.map(tourCard => {
      const formattedDate = changeDateToString(tourCard.date);
      return { ...tourCard.toObject(), date: formattedDate };
    });
    res.render('tourSearch', { tourCards: results, user, title:'travel' });
    

    // res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTourCardByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const tourCard = await TourCard.findOne({ isHidden: false, code }, 'name code startPlace endPlaces price promoDiscount date time remainSlots numOfDays cardImgUrl');
    let user = await User.findById(req.userId).select('fullName email dateOfBirth phoneNumber gender');
    if (!tourCard) {
      return res.status(404).json({ message: 'Tour card not found' });
    }
    if (user) {
      const formattedDateOfBirth = changeDateToString(user.dateOfBirth);
      const formattedGender = convertGenderToVietnamese(user.gender);
      user = { ...user.toObject(), dateOfBirth: formattedDateOfBirth, gender: formattedGender };
      res.render('tourSearch', { tourCards: tourCard, user })
    } else {
      // Nếu không có user, render view EJS với dữ liệu user là null

      res.render('tourSearch', { tourCards: tourCard, user: null });
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getRandom3TourCards = async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const randomTourCards = await TourCard.aggregate([
      {
        $match: {
          date: { $gte: currentDate },
          isHidden: false,
        },
      },
      { $sample: { size: 3 } },
      {
        $project: {
          _id: 0,
          name: 1,
          code: 1,
          startPlace: 1,
          endPlaces: 1,
          price: 1,
          promoDiscount: 1,
          date: 1,
          time: 1,
          remainSlots: 1,
          numOfDays: 1,
          cardImgUrl: 1,
        },
      },
    ]);

    res.status(200).json(randomTourCards);
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
