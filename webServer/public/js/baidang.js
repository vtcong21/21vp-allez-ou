// Trước khi gọi API
// Trước khi gọi API
// document.getElementById("loading-spinner").classList.add("show");

const activeTab = document.getElementById("ex1-tab-1");
const endedTab = document.getElementById("ex1-tab-2");

// Gắn sự kiện bấm vào tab "Đang hoạt động"
activeTab.addEventListener("click", function () {
    const navPill1 = document.getElementById("ex1-tab-1");
    const navPill2 = document.getElementById("ex1-tab-2");
    navPill2.classList.remove("active");

    navPill1.classList.add("active");

    fetchTourInformation(); // Gọi hàm để lấy danh sách tour đang hoạt động
});

// Gắn sự kiện bấm vào tab "Đã kết thúc"
endedTab.addEventListener("click", function () {
    const navPill1 = document.getElementById("ex1-tab-1");
    const navPill2 = document.getElementById("ex1-tab-2");
    navPill1.classList.remove("active");

    navPill2.classList.add("active");
    fetchHiddenToursInformation(); // Gọi hàm để lấy danh sách tour đã kết thúc
});
var tourDataList = [];
let currentPage = 1;

async function fetchTourInformation() {
    try {
        const response = await axios.get(`/tours`);
        tourDataList = response.data;
        renderTourPage(currentPage);
    } catch (error) {
        console.log(error);
    }
}
fetchTourInformation()
async function fetchHiddenToursInformation() {
    try {
        const response = await axios.get(`/tours/hiddentTours`);
        const hiddenTourDataList = response.data;
        isHidden = true; // Đặt biến isHidden thành true để chỉ định đang hiển thị hidden tours

        console.log(hiddenTourDataList);
        renderTourPage(currentPage, hiddenTourDataList);
        renderPagination(true);
    } catch (error) {
        console.log(error);
    }
}


function renderTourPage(page, hiddenTourDataList) {
    // Xác định vị trí bắt đầu và kết thúc của danh sách tour trên trang hiện tại
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    let currentTourDataList;
    if (hiddenTourDataList) {
        currentTourDataList = hiddenTourDataList.slice(startIndex, endIndex);
    } else {
        currentTourDataList = tourDataList.slice(startIndex, endIndex);
    }
    // Xóa các thẻ div tour cũ trước khi tạo lại
    const container = document.querySelector(".row");
    container.innerHTML = "";

    // Tạo thẻ div cho từng tour trên trang hiện tại
    for(let i = 0; i < currentTourDataList.length; i++){
        tourData = currentTourDataList[i];
        const tourCode = tourData.code;
        const tourDate = tourData.date;
        const slots = tourData.slots;
        const remainSlots = tourData.remainSlots;
        const tourName = tourData.name;
        const startPlace = tourData.startPlace;
        const endPlaces = tourData.endPlaces.map((place) => place.name);
        const price = tourData.price;
        const date = tourData.date;
        const time = tourData.time;
        const numOfDays = tourData.numOfDays;
        const promoDiscount = tourData.promoDiscount;
        const kidDiscount = tourData.kidDiscount;
        const babyDiscount = tourData.babyDiscount;
        const teenDiscount = tourData.teenDiscount;
        const cardImgUrl = tourData.cardImgUrl;
        const imgUrls = tourData.imgUrls;
        const transport = tourData.transport;
        const food = tourData.food;
        const hotel = tourData.hotel;
        const schedules = tourData.schedules;
        const isHidden = tourData.isHidden;
        const maxLength = 80;
        let truncatedName = tourName;
        if (tourName.length > maxLength) {
            truncatedName = tourName.substring(0, maxLength - 3) + "...";
        }
        const formattedDate = new Date(tourDate).toLocaleDateString("en-GB");
        const dateParts = formattedDate.split("/");
        const departureDate = `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
        const tourDate1 = departureDate;

        // Tạo thẻ div cho tour
        const tourDiv = document.createElement("div");
        tourDiv.classList.add("col-md-6", "col-xxl-3");

        // Tạo nội dung cho thẻ div
        tourDiv.innerHTML = `

        <div class="pageContainer">
    <div class="card d-block">
        <div class="card-body">
            <div class="row">
                <div class="col-9 text-left" id="name-tour">
                    <div id="tour-title-${tourCode}">
                        <div class="name-tour">${truncatedName}</div>
                    </div>
                </div>
                <div class="col-3 text-right">
                <div class="dropdown">
                <button class="btn btn-secondary" id="dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                ...
                </button>
                <ul class="dropdown-menu">
                <li><a data-bs-toggle="modal" data-bs-target="#confirmdisplayModal" class="dropdown-item" href="#" data-id="${tourCode}" onclick="getTourId(event)"><img src="/img/admin/admins-role/trash-bin.png" />Hiện Tour</a></li>
                <li><a data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" class="dropdown-item" href="#" data-id="${tourCode}" onclick="getTourId(event)"><img src="/img/admin/admins-role/trash-bin.png" />Ẩn Tour</a></li>
                <li><a id="edit-tour-link" data-bs-toggle="modal" data-bs-target="#chinh-sua-tour-modal" class="dropdown-item" href="#" 
                data-code="${tourCode}"
                data-tour-id="${tourData._id}"
                onclick="showEditModal(event)"
                ><img src="/img/admin/admins-role/edit.png" />Chỉnh sửa tour</a></li>
                </ul>
            </div>
                </div>
            </div>
            <div class="row" id="code-tour">
                <div class="col-11 text-left">
                    <div id="tour-title-${tourCode}">
                        <div class="code-tour">${tourCode}</div>
                        <div class="code-tour">${tourDate1}</div>
                    </div>
                </div>
                <div class="col-1 text-right">
                </div>
            </div>

        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item p-3">
                <h3 class="mb-2 fw-bold">
                    Còn trống
                    <span id="floatValue-${tourCode}" class="float-end">${remainSlots}</span>
                </h3>
                <div class="progress progress-sm">
                    <div id="progressBar-${tourCode}" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="10"></div>
                </div>
            </li>
        </ul>
    </div>
</div>


        `;
        // Thêm thẻ div vào container
        container.appendChild(tourDiv);
        function calculateProgressBarWidth(slots, remainSlots) {
            const usedSlots = slots - remainSlots;
            const progressbar = (usedSlots / slots) * 100;
            return progressbar;
        }
        const progressbarwidth = calculateProgressBarWidth(slots, remainSlots);
        const progressBarElement = document.getElementById(`progressBar-${tourCode}`); // Thay "tourCode" bằng giá trị thích hợp
        progressBarElement.style.width = progressbarwidth + "%";
        progressBarElement.setAttribute("aria-valuenow", remainSlots);

        const tenTourInput = document.getElementById("ten-tour-change");
        // Gán giá trị và placeholder từ tourData
        tenTourInput.value = tourName;
        tenTourInput.placeholder = tourName;
        const pricetourInput = document.getElementById("gia-ve-nguoi-lon-change");
        pricetourInput.value = price;
        pricetourInput.placeholder = price;
        const ngaykhoihanhtourInput = document.getElementById("ngay-khoi-hanh-change");
        ngaykhoihanhtourInput.value = formattedDate;
        ngaykhoihanhtourInput.placeholder = formattedDate;
        const giokhoihanhtourInput = document.getElementById("gio-khoi-hanh-change");
        giokhoihanhtourInput.value = time;
        giokhoihanhtourInput.placeholder = time;
        const sovetourInput = document.getElementById("so-ve-ban-change");
        sovetourInput.value = slots;
        sovetourInput.placeholder = slots;
    }

    // Tạo phân trang
    renderPagination();
}
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
let tourId = null;
function getTourId(event) {
    tourId = event.currentTarget.getAttribute("data-id");
} 
const confirmdisplayButton = document.getElementById("confirmdisplayButton"); 
confirmdisplayButton.addEventListener("click",function() { 
    console.log(tourId);
    axios
        .put(`/tours/displayTour/${tourId}`,{})
        .then((response) => {
            console.log(response.data);
            fetchTourInformation();
            fetchHiddenToursInformation();
            alert('Hiện tour thành công, load lại trang web để gọi api');
            location.reload(); 
        })
        .catch((error) => {
            console.error("Error:", error);
        });
})
// Xóa chuyến đi
confirmDeleteButton.addEventListener("click", function () {
  console.log(tourId);
  axios
      .put(`/tours/hideTour/${tourId}`, {}) // Sửa thành phương thức "put" và endpoint "/hideTour"
      .then((response) => {
          console.log(response.data);
          fetchTourInformation();
          fetchHiddenToursInformation();
          alert('Ẩn tour thành công, load lại trang để gọi lại api'); 
          location.reload();
      })
      .catch((error) => {
          console.error("Error:", error);
      });
});
let isHidden = false; // Khai báo biến isHidden mặc định là false
function renderPagination(hiddenTourDataList) {
    const dataList = hiddenTourDataList ? hiddenTourDataList : tourDataList;
    const totalPages = Math.ceil(dataList.length / 12);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    if (totalPages > 1) {
        const previousLink = `<li class="page-item">
                                <a class="page-link custom-prev-next"  aria-label="Previous" onclick="changePage('previous')">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>`;
        pagination.insertAdjacentHTML("beforeend", previousLink);

        for (let i = 1; i <= totalPages; i++) {
            const liClass = i === currentPage ? "page-item active" : "page-item";
            const link = `<li class="${liClass}">
                            <a class="page-link custom-page-link"  onclick="changePage(${i})">${i}</a>
                          </li>`;
            pagination.insertAdjacentHTML("beforeend", link);
        }

        const nextLink = `<li class="page-item">
                            <a class="page-link custom-prev-next"  aria-label="Next" onclick="changePage('next')">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>`;
        pagination.insertAdjacentHTML("beforeend", nextLink);
    }
}
let hiddenTourDataList; // Khai báo biến hiddenTourDataList

function changePage(page, hiddenTourDataList) {
    const dataList = hiddenTourDataList ? hiddenTourDataList : tourDataList;
    const totalPages = Math.ceil(dataList.length / 12);

    if (page === "previous") {
        currentPage = Math.max(1, currentPage - 1);
    } else if (page === "next") {
        currentPage = Math.min(totalPages, currentPage + 1);
    } else {
        currentPage = page;
    }

    renderTourPage(currentPage);
    renderPagination(hiddenTourDataList);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchTourInformation();
});
let currentNgay_create = 3;
document.addEventListener("DOMContentLoaded", function (event) {
    // Lấy đối tượng button và container chứa các ngày
    const buttonThemNgay = document.getElementById("button-them-ngay");
    const ngayContainer = document.getElementById("ngay-container");

    // Số lượng ngày hiện tại

    // Xử lý sự kiện khi bấm vào nút "Thêm Ngày"
    buttonThemNgay.addEventListener("click", function () {
        // Tạo phần tử div mới
        const newNgayDiv = document.createElement("div");
        newNgayDiv.classList.add("d-flex", "flex-column", "fv-row", "container-ngay");

        // Tạo các phần tử con bên trong div mới
        const newLabel = document.createElement("label");
        newLabel.classList.add("fs-5", "fw-semibold", "mb-2");
        newLabel.textContent = "Ngày " + currentNgay_create;

        const newInput = document.createElement("input");
        newInput.classList.add("form-control");
        newInput.setAttribute("placeholder", "");
        newInput.setAttribute("id", "ngay" + currentNgay_create);

        const newTextInput = document.createElement("div");
        newTextInput.classList.add("text-input");
        newTextInput.setAttribute("contenteditable", "");
        newTextInput.setAttribute("id", "ngay" + currentNgay_create + "-input");

        // Chèn các phần tử con vào div mới
        newNgayDiv.appendChild(newLabel);
        newNgayDiv.appendChild(newInput);
        newNgayDiv.appendChild(newTextInput);

        // Chèn div mới vào container ngày
        ngayContainer.appendChild(newNgayDiv);

        // Tăng số lượng ngày hiện tại
        currentNgay_create++;
        console.log(currentNgay_create);
    });
    const buttonBotNgay = document.getElementById("button-bot-ngay");

    // Xử lý sự kiện khi bấm vào nút "Bớt Ngày"
    buttonBotNgay.addEventListener("click", function () {
        // Lấy danh sách tất cả các ngày
        const ngayDivs = document.getElementsByClassName("container-ngay");

        // Kiểm tra nếu vẫn còn ngày trong container
        if (ngayDivs.length > 0) {
            // Lấy ngày cuối cùng
            const lastNgayDiv = ngayDivs[ngayDivs.length - 1];

            // Xóa ngày cuối cùng khỏi container
            ngayContainer.removeChild(lastNgayDiv);
        }
        if (currentNgay_create > 3) {
            currentNgay_create--;
        } else {
            alert("Số ngày tối thiểu là 2.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function (event) {
    // Lấy đối tượng button và container chứa các ngày
    const buttonThemNgay = document.getElementById("button-them-ngay-change");
    const ngayContainer = document.getElementById("ngay-container2");

    // Số lượng ngày hiện tại

    // Xử lý sự kiện khi bấm vào nút "Thêm Ngày"
    buttonThemNgay.addEventListener("click", function () {
          event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
        // Tạo phần tử div mới
        const newNgayDiv = document.createElement("div");
        newNgayDiv.classList.add("d-flex", "flex-column", "fv-row", "container-ngay");

        // Tạo các phần tử con bên trong div mới
        const newLabel = document.createElement("label");
        newLabel.classList.add("fs-5", "fw-semibold", "mb-2");
        newLabel.textContent = "Ngày " + currentNgay;

        const newInput = document.createElement("input");
        newInput.classList.add("form-control");
        newInput.setAttribute("placeholder", "");
        newInput.setAttribute("id", "ngay" + currentNgay + "-change");

        const newTextInput = document.createElement("div");
        newTextInput.classList.add("text-input");
        newTextInput.setAttribute("contenteditable", "");
        newTextInput.setAttribute("id", "ngay" + currentNgay + "-change-input");

        // Chèn các phần tử con vào div mới
        newNgayDiv.appendChild(newLabel);
        newNgayDiv.appendChild(newInput);
        newNgayDiv.appendChild(newTextInput);

        // Chèn div mới vào container ngày
        ngayContainer.appendChild(newNgayDiv);

        // Tăng số lượng ngày hiện tại
        currentNgay++;
    });

    const buttonBotNgay = document.getElementById("button-bot-ngay-change");

    // Xử lý sự kiện khi bấm vào nút "Bớt Ngày"
    buttonBotNgay.addEventListener("click", function () {
        // Lấy danh sách tất cả các ngày
        const ngayDivs = document.getElementsByClassName("container-ngay");

        // Kiểm tra nếu vẫn còn ngày trong container
        if (ngayDivs.length > 0) {
            // Lấy ngày cuối cùng
            const lastNgayDiv = ngayDivs[ngayDivs.length - 1];

            // Xóa ngày cuối cùng khỏi container
            ngayContainer.removeChild(lastNgayDiv);
        }
        if (currentNgay > 3) {
            currentNgay--;
        } else {
            alert("Số ngày tối thiểu là 2.");
        }
    });
});

const createTour = async (currentNgay_create) => {
    // Lấy giá trị từ các ô input HTML
    const name = document.getElementById("ten-tour-input").value;
    const code = document.getElementById("ma-tour-input").value;
    const price = parseFloat(document.getElementById("gia-ve-nguoi-lon-input").value);
    const startPlaceCode = document.getElementById("diem-khoi-hanh-input").value;
    const selectElement = document.getElementById("diem-khoi-hanh-input");

// Lấy index (vị trí) của option được chọn
const selectedIndex = selectElement.selectedIndex;

// Lấy phần tử option được chọn
const selectedOption = selectElement.options[selectedIndex];

// Lấy textContent của option được chọn
const selectedText = selectedOption.textContent;
    const startPlaceName = selectedText;
    const endPlaceCode = document.getElementById("code-diem-den-input").value;
    const endPlaceName = document.getElementById("diem-den-input").value;
    const date = document.getElementById("ngay-khoi-hanh-input").value;
    const time = document.getElementById("gio-khoi-hanh-input").value;
    const remainSlots = parseInt(document.getElementById("so-ve-ban-input").value);
    const cardImgUrl = document.getElementById("hinh1-input").value;
    const img1Url = document.getElementById("hinh2-input").value;
    const img2Url = document.getElementById("hinh3-input").value;
    const img3Url = document.getElementById("hinh4-input").value;
    const img4Url = document.getElementById("hinh5-input").value;
    const transport = document.getElementById("phuong-tien-input").value;
    const food = document.getElementById("am-thuc-input").value;
    const hotel = document.getElementById("khach-san-input").value;

    // Lấy dữ liệu từ các ô input của schedules
    const schedules = [];

    for (let i = 1; i < currentNgay_create; i++) {
        const dayInput = document.getElementById(`ngay${i}`).value;
        const dayDetail = document.getElementById(`ngay${i}-input`).innerText;
        const schedule = {
            schedule_detail: dayDetail,
            name: dayInput,
        };

        schedules.push(schedule);
    }

    // Tạo đối tượng dữ liệu JSON
    const tourData = {
        name: name,
        code: code,
        price: price,
        startPlace: {
            code: startPlaceCode,
            name: startPlaceName,
        },
        endPlaces: [
            {
                code: endPlaceCode,
                name: endPlaceName,
            },
        ],
        date: date,
        time: time,
        remainSlots: remainSlots,
        cardImgUrl: cardImgUrl,
        imgUrls: [img1Url, img2Url, img3Url, img4Url],
        transport: transport,
        food: food,
        hotel: hotel,
        schedules: schedules,
        numOfDays: currentNgay_create - 1,
        slots: remainSlots,
        // Thêm các trường dữ liệu khác vào đối tượng JSON
    };

    try {
        // Gửi yêu cầu tạo tour tới API
        const response = await axios.post(`/tours`, tourData);
        console.log(response.data); 
        if (response.status === 201) { 
            // Đóng modal
            const modalElement = document.getElementById("kt_modal_new_address");
            const bootstrapModal = new bootstrap.Modal(modalElement);
            bootstrapModal.hide();
    
            // Hiển thị cảnh báo
            alert('Tạo tour thành công, load lại trang web để lấy lại api');
            setTimeout(function() {
                // Tải lại trang web
                location.reload();
             }, 500);
        }
    } catch (error) {
        console.error(error);
    }
    
};

// Gọi hàm createTour và truyền giá trị của currentNgay_create khi người dùng nhấn nút "Tạo tour"
document.getElementById("done-tao-tour").addEventListener("click", () => createTour(currentNgay_create));



function findTourById(tourId) {
    const foundTour = tourDataList.find(tour => tour._id === tourId);
    if (foundTour) {
        return foundTour;
    }
    return null; // Trả về null nếu không tìm thấy đơn hàng
}
// Show Edit tour
function showEditModal(event) {
    const modalTourId = event.currentTarget.getAttribute("data-tour-id");
    const tour = findTourById(modalTourId);
    document.getElementById("ma-tour-change").value = tour.code;
    document.getElementById("ten-tour-change").value = tour.name;
    document.getElementById("gia-ve-nguoi-lon-change").value = tour.price;
    document.getElementById("so-ve-ban-change").value = tour.slots;
    document.getElementById("hinh1-change").value = tour.cardImgUrl;
    document.getElementById("hinh2-change").value = tour.imgUrls[0];
    document.getElementById("hinh3-change").value = tour.imgUrls[1] ;
    document.getElementById("hinh4-change").value = tour.imgUrls[2];
    document.getElementById("hinh5-change").value = tour.imgUrls[3];
    document.getElementById("phuong-tien-change").value = tour.transport;
    document.getElementById("am-thuc-change").value = tour.food;
    document.getElementById("khach-san-change").value = tour.hotel;
    showScheduleDetail(tour.schedules);
    showdiemden(tour.endPlaces);
    document.getElementById("diem-khoi-hanh-change").value = tour.startPlace.code;
    // showdiemden(tour.endPlaces);
} 
 let currentNgay = 0;
function showScheduleDetail(schedules){

    const scheduleContainer = document.getElementById('ngay-container2');
    for(let i = currentNgay; i < schedules.length; i++){
        scheduleRow = displayScheduleRow(schedules[i], i+1)
        scheduleContainer.insertAdjacentHTML("beforeend", scheduleRow);
        currentNgay = i+2;
    }

    console.log(currentNgay);
    const closeModalButton = document.getElementById('closeModalButton');
closeModalButton.addEventListener('click', myFunction);
function myFunction() {
  // Gọi hàm xử lý sự kiện tại đây
  currentNgay =0; 
  initialValues = [];
  selectedValues = [];
  console.log(currentNgay);
  while (scheduleContainer.firstChild) {
    scheduleContainer.firstChild.remove();
}
}
}
function displayScheduleRow(schedule, index){
    return `
    <div class="d-flex flex-column fv-row" id="container-ngay-${index}">
    <label class="fs-5 fw-semibold mb-2" id="thongtintungngay-${index}">Ngày ${index}</label>
    <input class="form-control" value="${schedule.name}" id="ngay${index}-change" />
    <div class="text-input" contenteditable id="ngay${index}-change-input">${schedule.schedule_detail}</div>
    </div>
    `;
}
const editTour = async (currentNgay,selectedValues,selectedOptions) => {
    // Lấy giá trị từ các ô input HTML
    const code = document.getElementById("ma-tour-change").value;
    const name = document.getElementById("ten-tour-change").value;
    const price = parseFloat(document.getElementById("gia-ve-nguoi-lon-change").value);
    const startPlaceCode = document.getElementById("diem-khoi-hanh-change").value;
    const selectElement = document.getElementById("diem-khoi-hanh-change");

// Lấy index (vị trí) của option được chọn
const selectedIndex = selectElement.selectedIndex;

// Lấy phần tử option được chọn
const selectedOption = selectElement.options[selectedIndex];

// Lấy textContent của option được chọn
const selectedText = selectedOption.textContent;
    const startPlaceName = selectedText;
    // const endPlaceCode = document.getElementById("code-diem-den-input").value;
    // const endPlaceName = document.getElementById("diem-den-input").value;
    const date = document.getElementById("ngay-khoi-hanh-change").value;
    const time = document.getElementById("gio-khoi-hanh-change").value;
    const remainSlots = parseInt(document.getElementById("so-ve-ban-change").value);
    const cardImgUrl = document.getElementById("hinh1-change").value;
    const img1Url = document.getElementById("hinh2-change").value;
    const img2Url = document.getElementById("hinh3-change").value;
    const img3Url = document.getElementById("hinh4-change").value;
    const img4Url = document.getElementById("hinh5-change").value;
    const transport = document.getElementById("phuong-tien-change").value;
    const food = document.getElementById("am-thuc-change").value;
    const hotel = document.getElementById("khach-san-change").value;

    // Lấy dữ liệu từ các ô input của schedules
    const schedules = [];

    for (let i = 1; i < currentNgay; i++) {
        const dayInput = document.getElementById(`ngay${i}-change`).value;
        const dayDetail = document.getElementById(`ngay${i}-change-input`).innerText;
        const schedule = {
            schedule_detail: dayDetail,
            name: dayInput,
        };

        schedules.push(schedule);
    }
    const endPlaces = [];
    for (let i = 0; i < selectedValues.length; i++) {
        const endPlace = { 
            code: selectedValues[i], 
            name: selectedOptions[i]
        }; 
        endPlaces.push(endPlace);
    }
    

    // Tạo đối tượng dữ liệu JSON
    const tourData = {
        name: name,
        code: code,
        startPlace: {
            code: startPlaceCode,
            name: startPlaceName,
        },
        endPlaces: endPlaces,
        price: price,
        date: date,
        time: time,
        slots: remainSlots,
        remainSlots: remainSlots,
        numOfDays: currentNgay - 1,
        cardImgUrl: cardImgUrl,
        imgUrls: [img1Url, img2Url, img3Url, img4Url],
        transport: transport,
        food: food,
        hotel: hotel,
        schedules: schedules,
        // Thêm các trường dữ liệu khác vào đối tượng JSON
    };
    console.log(name); 
    console.log(code); 
    console.log(price); 
    console.log(startPlaceCode); 
    console.log(startPlaceName);
    console.log(endPlaces);
    console.log(date); 
    console.log(time); 
    console.log(remainSlots); 
    console.log(cardImgUrl);
    console.log(img1Url);
    console.log(img2Url);
    console.log(img3Url);
    console.log(img4Url);
    console.log(transport);
    console.log(food);
    console.log(hotel);
    console.log(schedules);
    console.log(currentNgay); 


    try {
        // Gửi yêu cầu sửa tour tới API
        const response = await axios.put(`/tours/edit/${code}`, tourData);
        console.log(response.data); 
        if (response.status === 200) { 
        alert('Sửa tour thành công, load lại trang web để lấy lại api');
        setTimeout(function() {
        location.reload();
    }, 500);
}

    } catch (error) {
        console.error(error);
    }
    
}; 
document.getElementById("kt_modal_new_address_submit").addEventListener("click", () => editTour(currentNgay,selectedValues,selectedOptions));

let initialValues = []; // Mảng giá trị ban đầu
let selectedValues = []; // Mảng giá trị đã chọn
var selectedOptions = []; // Mảng lưu trữ textContent các option đã chọn

function selectEndPlaces() {    
    // Thiết lập sự kiện change cho phần tử select
    $('#diem-den-change-input').change(function() {
      selectedValues = []; // Đặt lại mảng khi có sự thay đổi trong phần tử select
      selectedOptions = []; // Đặt lại mảng khi có sự thay đổi trong phần tử select
      
      $(this).find('option:selected').each(function() {
        var value = $(this).val();
        var textContent = $(this).text();
        selectedValues.push(value); // Thêm giá trị value vào mảng
        selectedOptions.push(textContent); // Thêm textContent vào mảng
      });
      console.log(selectedValues); 
      console.log(selectedOptions);
    });
    
    // Cập nhật giá trị value của các tùy chọn bằng mảng giá trị ban đầu
    $('#diem-den-change-input option').each(function() {
      var value = $(this).val();
      
      if (initialValues.includes(value)) {
        $(this).prop('selected', true);
        selectedValues.push(value); // Thêm giá trị value vào mảng
        selectedOptions.push($(this).text()); // Thêm textContent vào mảng
      }
    });
    return [selectedValues, selectedOptions];
}

function showdiemden(endPlaces) {
  initialValues = []; // Xóa các giá trị cũ của mảng
  for (let i = 0; i < endPlaces.length; i++) {
    let code = endPlaces[i].code;
    initialValues.push(code);
    console.log(code);
  }
  console.log(initialValues);
  selectEndPlaces();
}
