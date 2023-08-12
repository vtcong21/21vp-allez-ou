const Tour = require('../models/tour');
const User = require('../models/user');
const axios = require('axios');


// trước hết trang này lấy ra toàn bộ tour card
const getTourSearchPage = async (req, res) => {
  try {
    const response = await axios.get('/tourCards'); 
    const listTravel = response.data;
    const contentPerPage = 10;
    for(var i = 0; i < listTravel.length; i++) {
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
    const tours = await Tour.find({isHidden: false});
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getHiddenTours = async (req, res) => {
  try {
    const tours = await Tour.find({isHidden: true});
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

const deleteTour = async (req, res) => {
  try {
    const code = req.params.code;
    const deletedTour = await Tour.findOneAndDelete({ code });

    if (deletedTour) {
      res.status(200).json({ message: 'Tour deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tour not found' });
    }
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

    const query = Tour.find({isHidden: false});

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
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    console.log(tour);
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getTourByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const user = await User.findById(req.userId).select('fullName email dateOfBirth');
    const tour = await Tour.findOne({ code });
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    if (user) {
      // Kiểm tra dateOfBirth có giá trị hợp lệ không
      if (user.dateOfBirth instanceof Date && !isNaN(user.dateOfBirth)) {
        // Chuyển đổi thành chuỗi ngày/tháng/năm
        const dateOfBirth = user.dateOfBirth.toISOString().slice(0, 10);
        // Render view EJS và truyền dữ liệu vào
        res.render('tourInfo', { 
          tour,
          user: { 
            fullName: user.fullName,
            email: user.email,
            dateOfBirth,
            phoneNumber: user.phoneNumber,
            gender: user.gender
          }
        });
      } else {
        // Gán giá trị mặc định nếu dateOfBirth không hợp lệ
        const defaultDateOfBirth = '01/01/2000'; // Hoặc giá trị mặc định khác bạn muốn
        res.render('tourInfo', { tour ,user: { ...user, dateOfBirth: defaultDateOfBirth } });
      }
    } else {
      // Nếu không có user, render view EJS với dữ liệu user là null
      res.render('tourInfo', { tour, user: null });
    }
    // res.render('tourInfo', { tour, user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getAllTours,
  createTour,
  deleteTour,
  getTourByCode,
  searchTours,
  getTourInfoData,
  getTourSearchPage,
  getHiddenTours
};
