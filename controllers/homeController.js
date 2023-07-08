const getHomePage = (req, res) => {
    try {
        res.render('home');
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
};

module.exports = getHomePage;