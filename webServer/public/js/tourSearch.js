const contentPerPage = 10;

let response = null;
let filter = {};
let searchParams = {
    startPlaceCode: null,
    endPlaceCode: null,
    numOfPeople: null,
    minNumOfDays: null,
    maxNumOfDays: null,
    travelDate: null,
    minPrice: null,
    maxPrice: null
};

var listTravel;
var currentPage;
var limitPage;
let sortButtonState = [0, 0];

getAPIResponse();

async function getAPIResponse() {
    try {
        response = await axios.get("/tourCards/search", {
            params: searchParams
        });
        loadData();
        renderPage();
    }
    catch (error) {
        console.error("Error:", error);
    }
}

function sortData(type, dir) {
    if(type == "price") {
        if(dir == 1) listTravel.sort((travel1, travel2) => travel1.price - travel2.price);
        else listTravel.sort((travel1, travel2) => travel2.price - travel1.price);
    }
    else {
        listTravel.sort(compareEvents);
        if(dir == 2) listTravel.reverse();
    }
    currentPage = 0;
}

function loadData() {
    listTravel = response.data.slice();
    for(const key in filter) {
        if(key == "budget") {
            listTravel = listTravel.filter(item => item.price >= parseInt(filter[key][0]) && item.price <= parseInt(filter[key][1]));
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

    if(sortButtonState[0] != 0) {
        sortData("date", sortButtonState[0]);
    }
    else if(sortButtonState[1] != 0) {
        sortData("price", sortButtonState[1]);
    }

    for(var i = 0; i < listTravel.length; i++) {
        listTravel[i].priceformat = listTravel[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
    }
    currentPage = 0;
    limitPage = Math.ceil(listTravel.length / contentPerPage);
}

function cardTravelTour(travel) {
    return `
    <div class="col">
        <img src="${travel.cardImgUrl}" alt="">
        <div class="content">
            <div class="sub-content">
                <h3>${travel.date} - ${travel.numOfDays}N${travel.numOfDays - 1}Đ - Giờ đi: ${travel.time}</h3>
                <h1>${travel.name}</h1>
            </div>
            <h2>${travel.priceformat}</h2>
            <div class="content-more"><a href="/tours/${travel.code}">Xem thêm</a></div>
        </div>
    </div>
    `;
}

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

function renderPage() {
    listTravelCurrent = listTravel.slice(currentPage * contentPerPage, (currentPage + 1) * contentPerPage);
    const travelTour = document.getElementById('travel-tour');
    const pageInfo = document.getElementById('page-info');
    var buttons = document.querySelectorAll("#page-control .page-button");
    travelTour.innerHTML = "";

    if(listTravelCurrent.length == 0) {
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].style.display = "none";
        } 
        pageInfo.innerHTML = "Không tìm thấy kết quả";
        return;
    }
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "block";
    } 
    listTravelCurrent.forEach(travel => {
        const card = cardTravelTour(travel);
        travelTour.insertAdjacentHTML('beforeend', card);
    });
    pageInfo.innerHTML = (currentPage + 1).toString() + " / " + limitPage.toString();
}

getAllProvince() 

async function getAllProvince() {
    try {
        const response = await axios.get('/provinces');

        if (response.status === 200) {
        const provinces = response.data;
        displayProvinces(provinces);
        } else {
        throw new Error('Lỗi khi gửi yêu cầu đến API');
        }
    } catch (error) {
        console.error('Đã xảy ra lỗi:', error.message);
    }
}


function displayProvinces(provinces)
{
    startPoint.innerHTML ="";
    endPoint.innerHTML ="";

    const chooseStartPoint = '<option class="form-option" value = "">Hãy chọn điểm đi</option>';
    const chooseEndPoint = '<option class="form-option" value ="">Hãy chọn điểm đến</option>';

    startPoint.insertAdjacentHTML('beforeend', chooseStartPoint);
    endPoint.insertAdjacentHTML('beforeend', chooseEndPoint);

    provinces.forEach(province => {
    const provinceSelection = makeProvinceSelection(province);
    startPoint.insertAdjacentHTML('beforeend', provinceSelection);
    endPoint.insertAdjacentHTML('beforeend', provinceSelection);
    });
}

function makeProvinceSelection(province)
{
    return `
    <option class="form-option" value="${province.code}">${province.name}</option>
    `
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        renderPage();
    }
}

function nextPage() {
    if(currentPage + 1 < limitPage) {
        currentPage++;
        renderPage();
    }
}

// ----------------------------------------------------
function sortButtonReset() {
    var images = document.querySelectorAll("#travel .tour-sort .sort-block img");
    for(var i = 0; i < images.length; i++) {
        images[i].src = "/img/tourSearch/up-arrow.svg";
    }

    var sortButtons = document.querySelectorAll("#travel .tour-sort .sort-block");
    for(var i = 0; i < sortButtons.length; i++) {
        sortButtons[i].style.backgroundColor = '#6E6A8E';
    }
}

function sortButtonActive(button, index) {
    sortButtonState[1 - index] = 0;
    sortButtonState[index] = (sortButtonState[index] + 1) % 3;

    sortButtonReset();

    var image = button.querySelector('img');
    if(sortButtonState[index] == 2) image.src = "/img/tourSearch/down-arrow.svg";
    else image.src = "/img/tourSearch/up-arrow.svg";

    if(sortButtonState[index] == 0) button.style.backgroundColor = '#6E6A8E';
    else button.style.backgroundColor = '#F14868';

    if(sortButtonState[0] != 0) {
        sortData("date", sortButtonState[0]);
        renderPage();
    }
    else if(sortButtonState[1] != 0) {
        sortData("price", sortButtonState[1]);
        renderPage();
    }
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

function filterDelete() {
    // if(filter == {}) return;
    sortButtonState = [0, 0];
    sortButtonReset();
    filter = {};
    loadData();
    renderPage();
}

function filterActive() {
    filter = {};

    var sliderIndex = (window.innerWidth > 900) ? 0 : 1;
    filter.budget = [priceSlider[sliderIndex].noUiSlider.get()[0], priceSlider[sliderIndex].noUiSlider.get()[1]];

    var check1;
    var check2;
    if (window.innerWidth > 900) {
        check1 = document.querySelector('input[name="f1-radio"]:checked');
        check2 = document.querySelector('input[name="f2-radio"]:checked');
    }
    else {
        check1 = document.querySelector('.f1-dropbox');
        check2 = document.querySelector('.f2-dropbox');
    }
    filter.numday = check1.value;
    filter.slot = check2.value;

    loadData();
    renderPage();
}

function findButtonActive() {
    var filter = document.querySelector("#travel .travel-container .travel-content .filter-screen");
    if (filter.style.display === 'none') {
        filter.style.display = 'block';
    } else {
        filter.style.display = 'none';
    }
}

function searchTour() {
    var startPlaceSelect = document.getElementById('startPoint');
    if(startPlaceSelect.value == "") searchParams.startPlaceCode = null;
    else searchParams.startPlaceCode = parseInt(startPlaceSelect.value);

    var endPlaceSelect = document.getElementById('endPoint');
    if(endPlaceSelect.value == "") searchParams.endPlaceCode = null;
    else searchParams.endPlaceCode = parseInt(endPlaceSelect.value);

    var travelDateSelect = document.getElementById('search_travel-date');
    if(travelDateSelect.value == "") searchParams.travelDate = null;
    else searchParams.travelDate = travelDateSelect.value;

    var numOfDaysSelect = document.getElementById('search_num-of-date');
    if(numOfDaysSelect.value == "") {
        searchParams.minNumOfDays = null; searchParams.maxNumOfDays = null;
    }
    else if(numOfDaysSelect.value == "1") {
        searchParams.minNumOfDays = 1; searchParams.maxNumOfDays = 3;
    }
    else if(numOfDaysSelect.value == "2") {
        searchParams.minNumOfDays = 4; searchParams.maxNumOfDays = 7;
    }
    else if(numOfDaysSelect.value == "3") {
        searchParams.minNumOfDays = 14; searchParams.maxNumOfDays = null;
    }

    getAPIResponse();
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