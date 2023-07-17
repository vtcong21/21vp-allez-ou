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

let currentPage = 0;
let contentPerPage = 10;
let limPage = 0;
var listTravelTour = [];

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
	// list.find('.col').on('click', function (e) {
	// 	e.preventDefault();
	// 	var tourIndex = $(this).data('index');
	// 	window.location.hash = '#traveltour/' + tourIndex;
	// })
}

$(function(){
    $.getJSON("traveltour.json", function( data ) {
		listTravelTour = data;
		limPage = Math.floor((listTravelTour.length + contentPerPage - 1) / contentPerPage);
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