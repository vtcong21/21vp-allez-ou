const express = require('express');
const router = express.Router();
const axios = require("axios");
const ejs = require("ejs");
const fs = require("fs/promises"); 
const authMiddleware = require('../middlewares/authMiddleware');
const tourSearchController = require('../controllers/tourSearchController');

function compareEvents(event1, event2) {
    const date1 = new Date(event1.date);
    const date2 = new Date(event2.date);
    const time1 = event1.time;
    const time2 = event2.time;

    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else {
        if (time1 < time2) {
        return -1;
        } else if (time1 > time2) {
        return 1;
        } else {
        return 0;
        }
    }
}

router.get('/', authMiddleware.authenticateToken, tourSearchController.getTourSearchPage);

let response = null;
router.get("/filter", async (req, res) => {
  try {
    if(!response) {
      response = await axios.get("http://localhost:5000/tourCards");
    }
    let listTravel = response.data;
    for(var i = 0; i < listTravel.length; i++) {
      listTravel[i].priceformat = listTravel[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
    }
    const filter = req.query.filter;
    console.log(filter);
    for(const key in filter) {
      if(key == "budget") {
        listTravel = listTravel.filter(item => item.price >= parseInt(filter[key][0]) && item.price <= parseInt(filter[key][1]));
      }
      else if(key == "sort") {
        if(filter[key][0] == "price") {
          if(filter[key][1] == "1") listTravel.sort((travel1, travel2) => travel1.price - travel2.price);
          else listTravel.sort((travel1, travel2) => travel2.price - travel1.price);
        }
        else {
          listTravel.sort(compareEvents);
          if(filter[key][1] == "2") listTravel.reverse();
        }
      }
      else if(key == "numday") {
        if(filter[key] == "option1") {
          listTravel = listTravel.filter(item => item.numOfDays >= 1 && item.numOfDays <= 3);
        }
        else if(filter[key] == "option2") {
          listTravel = listTravel.filter(item => item.numOfDays >= 4 && item.numOfDays <= 7);
        }
        else if(filter[key] == "option3") {
          listTravel = listTravel.filter(item => item.numOfDays >= 8 && item.numOfDays <= 14);
        }
        else {
          listTravel = listTravel.filter(item => item.numOfDays >= 14);
        }
      }
      else if(key == "slot") {
        if(filter[key] == "option1") {

        }
        else if(filter[key] == "option2") {

        }
        else if(filter[key] == "option3") {

        }
        else {

        }
      }
    }

    const contentPerPage = 10;
    const limitPage = Math.ceil(listTravel.length / contentPerPage);
    const currentPage = parseInt(req.query.page);

    if(currentPage + 1 > limitPage) return;

    const startIndex = currentPage * contentPerPage;
    const endIndex = startIndex + contentPerPage;

    listTravel = listTravel.slice(startIndex, endIndex);

    const filePath = "./views/tourSearchContent.ejs"; 
    const template = await fs.readFile(filePath, "utf8");
    const travelTour = await ejs.render(template, { listTravel: listTravel });
    res.send({ travelTour: travelTour, pageInfo: `${currentPage + 1} / ${limitPage}` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
