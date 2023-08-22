const Tour = require('../models/tour');
const User = require('../models/user');
const axios = require('axios');

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

// trước hết trang này lấy ra toàn bộ tour card
const getTourSearchPage = async (req, res) => {
  try {
    const response = await axios.get('/tourCards');
    const listTravel = response.data;
    const contentPerPage = 10;
    for (var i = 0; i < listTravel.length; i++) {
      listTravel[i].priceformat = listTravel[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
    }
    const currentArea = 'north';
    const limitPage = Math.ceil(listTravel.length / contentPerPage);
    res.render('tourSearch', {
      currentPage: 0,
      currentArea: currentArea,
      limitPage: limitPage,
      listTravel: listTravel,
      contentPerPage: contentPerPage
    });
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).send('Internal Server Error');
  }
};


const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({ isHidden: false });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getHiddenTours = async (req, res) => {
  try {
    const tours = await Tour.find({ isHidden: true });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};



const createTour = async (req, res) => {
  try {
    const tourData = req.body;
    const newTour = new Tour(tourData);
    const savedTour = await newTour.save();
    res.status(201).json(savedTour);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tour' });
  }
};

const hideTour = async (req, res) => {
  try {
    const code = req.params.code;
    const tour = await Tour.findOne({ code });

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    if(tour.isHidden == true) {
      return res.status(400).json({ error: 'Tour has been hidden' });
    }

    tour.isHidden = true;
    await tour.save();

    res.status(200).json({ message: 'Tour hidden successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tour' });
  }
};

const displayTour = async (req, res) => {
  try {
    const code = req.params.code;
    const tour = await Tour.findOne({ code });

    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    if(tour.isHidden == false) {
      return res.status(400).json({ error: 'Tour is being displayed' });
    }

    tour.isHidden = false;
    await tour.save();

    res.status(200).json({ message: 'Tour displayed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tour' });
  }
};

const searchTours = async (req, res) => {
  try {
    const {
      startPlaceCode,
      endPlaceCode,
      numOfPeople,
      numOfDays,
      travelDate,
      minPrice,
      maxPrice,
    } = req.query;

    const query = Tour.find({ isHidden: false });

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


const getTourInfoData = async (req, res) => {
  try {
    const { code } = req.params;
    const tour = await Tour.findOne({ code });
    if (!tour || tour.isHidden === true) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    //console.log(tour);
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getTourByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const user = req.user;
    let tour = await Tour.findOne({ code });
    if (!tour || tour.isHidden === true) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    const formattedDate = changeDateToString(tour.date);
    tour = { ...tour.toObject(), date: formattedDate};
    res.render('tourInfo', { tour, user, title:'travel' })

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const editTourByCode = async (req, res) => {
  const tourCode = req.params.code;
  const updatedInfo = req.body;

  try {
    const updatedTour = await Tour.findOneAndUpdate({ code: tourCode }, updatedInfo, {
      new: true,
    });

    if (updatedTour) {
      res.status(200).json({ message: 'Tour updated successfully' });
    } else {
      return res.status(404).json({ message: 'Tour not found' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getAllTours,
  createTour,
  hideTour,
  displayTour,
  getTourByCode,
  searchTours,
  getTourInfoData,
  getTourSearchPage,
  getHiddenTours,
  editTourByCode
};
