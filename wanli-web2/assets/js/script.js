function navButtonActive(button) {
    var buttons = document.getElementsByClassName("nav-button");
    
    for (var i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains("nav-button-active")) {
            buttons[i].classList.remove("nav-button-active");
        }
    }
    button.classList.add("nav-button-active");

    var element = document.getElementById("header");
    if(!element.classList.contains("header-background")) {
        element.classList.add("header-background");
    }
}

function removeHeaderBackground() {
    var element = document.getElementById("header");
    if(element.classList.contains("header-background")) {
        element.classList.remove("header-background");
    }
}

let sortButtonState1 = 0;
let sortButtonState2 = 0;

let currentPage = 0;
let contentPerPage = 10;
let limPage = 0;
var listTravelTour = [];

function compareEvents(event1, event2) {
  const date1 = new Date(event1.detail.date);
  const date2 = new Date(event2.detail.date);
  const time1 = event1.detail.time;
  const time2 = event2.detail.time;

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

function sortButtonActive1(button) {
	sortButtonState2 = 0;
	sortButtonState1 = (sortButtonState1 + 1) % 3;
	var images = document.querySelectorAll("#travel .listtour .tour-sort .sort-block img");
	for(var i = 0; i < images.length; i++) {
		images[i].src = "./assets/img/up-arrow.svg";
	}

	var image = button.querySelector('img');
	if(sortButtonState1 == 2) image.src = "./assets/img/down-arrow.svg";
	else image.src = "./assets/img/up-arrow.svg";

	var sortButtons = document.querySelectorAll("#travel .listtour .tour-sort .sort-block");
	for(var i = 0; i < sortButtons.length; i++) {
		sortButtons[i].style.backgroundColor = '#6E6A8E';
	}

	if(sortButtonState1 == 0) button.style.backgroundColor = '#6E6A8E';
	else button.style.backgroundColor = '#F14868';

	if(sortButtonState1 == 1) {
		listTravelTour.sort(compareEvents);
		console.log(listTravelTour);
	}
	else if(sortButtonState1 == 2) {
		listTravelTour.sort(compareEvents);
		listTravelTour.reverse();
		console.log(listTravelTour);
	}
	generateTravelTour(listTravelTour);
}

function sortButtonActive2(button) {
	sortButtonState1 = 0;
	sortButtonState2 = (sortButtonState2 + 1) % 3;
	var images = document.querySelectorAll("#travel .listtour .tour-sort .sort-block img");
	for(var i = 0; i < images.length; i++) {
		images[i].src = "./assets/img/up-arrow.svg";
	}

	var image = button.querySelector('img');
	if(sortButtonState2 == 2) image.src = "./assets/img/down-arrow.svg";
	else image.src = "./assets/img/up-arrow.svg";

	var sortButtons = document.querySelectorAll("#travel .listtour .tour-sort .sort-block");
	for(var i = 0; i < sortButtons.length; i++) {
		sortButtons[i].style.backgroundColor = '#6E6A8E';
	}

	if(sortButtonState2 == 0) button.style.backgroundColor = '#6E6A8E';
	else button.style.backgroundColor = '#F14868';

	if(sortButtonState2 == 1) {
		listTravelTour.sort((travel1, travel2) => travel1.detail.price - travel2.detail.price);
	}
	else if(sortButtonState2 == 2) {
		listTravelTour.sort((travel1, travel2) => travel2.detail.price - travel1.detail.price);
	}
	generateTravelTour(listTravelTour);
}

function generateTravelTour(data){
	data = data.slice(currentPage * contentPerPage, currentPage * contentPerPage + contentPerPage);
	var list = $('#travel .travel-content .listtour .row2');
	list.empty();
	var theTemplateScript = $('#list-traveltour').html();
	var theTemplate = Handlebars.compile(theTemplateScript);
	list.append(theTemplate(data));

	const pageInfo = document.getElementById('page-info');
	const pageInfoVal = (currentPage + 1).toString() + " / " + limPage.toString();

	pageInfo.innerHTML = pageInfoVal;

	var listTravels = document.querySelectorAll('#travel .travel-content .listtour .row2 h2');
	for(var i = 0; i < listTravels.length; i++) {
		var price = listTravels[i].innerHTML;
		listTravels[i].innerHTML = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
	}
	// list.find('.col').on('click', function (e) {
	// 	e.preventDefault();
	// 	var tourIndex = $(this).data('index');
	// 	window.location.hash = '#traveltour/' + tourIndex;
	// })
}

$(function(){
    $.getJSON("traveltour.json", function( data ) {
		listTravelTour = data;
		limPage = Math.ceil(listTravelTour.length / contentPerPage);
		generateTravelTour(data);
	});
})

function previousPage() {
	if (currentPage > 0) {
		currentPage--;
		generateTravelTour(listTravelTour);
	}
}
function nextPage() {
	if ((currentPage + 1) * contentPerPage < listTravelTour.length) {
		currentPage++;
		generateTravelTour(listTravelTour);
	}
}

var priceSlider = document.getElementById('f-price-slider');
var priceMin = document.getElementById('f-price-min');
var priceMax = document.getElementById('f-price-max');

noUiSlider.create(priceSlider, {
	start: [2000000, 11000000], 
	connect: true,
	range: {
		'min': 0,
		'max': 20000000
	},
	step: 1000000
});

function formatPrice(price) {
	var parts = price.toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	return parts.join(".");
}

priceSlider.noUiSlider.on('update', function (values, handle) {
	if (handle === 0) {
		priceMin.innerHTML = formatPrice(Math.round(values[0]));
	}
	if (handle === 1) {
		priceMax.innerHTML = formatPrice(Math.round(values[1]));
	}
});