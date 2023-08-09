const axios = require('axios');

const getTourSearchPage = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/tourCards'); 
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




module.exports = { getTourSearchPage };
  