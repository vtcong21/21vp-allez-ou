const getTourSearchPage = async (req, res) => {
  try {
    res.render('tourSearch', {});
  } catch (error) {
    console.error('Error getting user information:', error);
    res.status(500).send('Internal Server Error');
  }
};




module.exports = { getTourSearchPage };
  