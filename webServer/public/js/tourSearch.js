let currentPage = 0;
let filter = {};

function renderPage(page, filter = {}) {
    $.ajax({
        url: "/tourSearch/filter",
        method: "GET",
        data: {
          page: page,
          filter: filter
        },
        success: function(data) {
            $("#travel-tour").html(data.travelTour);
            $("#page-info").html(data.pageInfo);
        },
        error: function(err) {
            console.error("Error:", err);
        }
    });
}

renderPage(currentPage, filter);

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    renderPage(currentPage, filter);
  }
}

function nextPage() {
  currentPage++;
  renderPage(currentPage, filter);
}

// ----------------------------------------------------

let sortButtonState1 = 0;
let sortButtonState2 = 0;

function sortButtonActive1(button) {
    sortButtonState2 = 0;
    sortButtonState1 = (sortButtonState1 + 1) % 3;
    var images = document.querySelectorAll("#travel .tour-sort .sort-block img");
    for(var i = 0; i < images.length; i++) {
        images[i].src = "/img/tourSearch/up-arrow.svg";
    }

    var image = button.querySelector('img');
    if(sortButtonState1 == 2) image.src = "/img/tourSearch/down-arrow.svg";
    else image.src = "/img/tourSearch/up-arrow.svg";

    var sortButtons = document.querySelectorAll("#travel .tour-sort .sort-block");
    for(var i = 0; i < sortButtons.length; i++) {
        sortButtons[i].style.backgroundColor = '#6E6A8E';
    }

    if(sortButtonState1 == 0) button.style.backgroundColor = '#6E6A8E';
    else button.style.backgroundColor = '#F14868';
}

function sortButtonActive2(button) {
    sortButtonState1 = 0;
    sortButtonState2 = (sortButtonState2 + 1) % 3;
    var images = document.querySelectorAll("#travel .tour-sort .sort-block img");
    for(var i = 0; i < images.length; i++) {
        images[i].src = "/img/tourSearch/up-arrow.svg";
    }

    var image = button.querySelector('img');
    if(sortButtonState2 == 2) image.src = "/img/tourSearch/down-arrow.svg";
    else image.src = "/img/tourSearch/up-arrow.svg";

    var sortButtons = document.querySelectorAll("#travel .tour-sort .sort-block");
    for(var i = 0; i < sortButtons.length; i++) {
        sortButtons[i].style.backgroundColor = '#6E6A8E';
    }

    if(sortButtonState2 == 0) button.style.backgroundColor = '#6E6A8E';
    else button.style.backgroundColor = '#F14868';
}

var priceSlider = document.getElementsByClassName('f-price-slider');
var priceMin = document.getElementsByClassName('f-price-min');
var priceMax = document.getElementsByClassName('f-price-max');

for(var i = 0; i < priceSlider.length; i++) {
    noUiSlider.create(priceSlider[i], {
        start: [2000000, 11000000], 
        connect: true,
        range: {
            'min': 0,
            'max': 20000000
        },
        step: 1000000
    });
}

function filterActive() {
  filter = {};
  if(sortButtonState1 != 0) filter.sort = ["date", sortButtonState1];
  else if(sortButtonState2 != 0) filter.sort = ["price", sortButtonState2];

  filter.budget = [priceSlider[0].noUiSlider.get()[0], priceSlider[0].noUiSlider.get()[1]];

  const check1 = document.querySelector('input[name="f1-radio"]:checked');
  filter.numday = check1.value;

  const check2 = document.querySelector('input[name="f2-radio"]:checked');
  filter.slot = check2.value;

  renderPage(0, filter);
}

function findButtonActive(button) {
    if(window.innerWidth <= 900) {
        var filter = document.querySelector("#travel .travel-container .travel-content .filter-screen");
        if (filter.style.display === 'none') {
            filter.style.display = 'block';
        } else {
            filter.style.display = 'none';
        }
    }
    else {
      filterActive();
    }
}

function toggleFilterVisibility() {
    var filterElement = document.querySelector('#travel .travel-container .travel-content .filter-screen');
    if (window.innerWidth > 900) {
        filterElement.style.display = 'none'; 
    }
}

window.addEventListener('load', toggleFilterVisibility);
window.addEventListener('resize', toggleFilterVisibility);

function formatPrice(price) {
    var parts = price.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
}

for(var i = 0; i < priceSlider.length; i++) {
    priceSlider[i].noUiSlider.on('update', (function (index) {
        return function (values, handle) {
            if (handle === 0) {
                priceMin[index].innerHTML = formatPrice(Math.round(values[0]));
            }
            if (handle === 1) {
                priceMax[index].innerHTML = formatPrice(Math.round(values[1]));
            }
        };
    })(i));
}