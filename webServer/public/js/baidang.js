// Trước khi gọi API
// Trước khi gọi API
// document.getElementById("loading-spinner").classList.add("show");
// Lấy các phần tử tab
const activeTab = document.getElementById('ex1-tab-1');
const endedTab = document.getElementById('ex1-tab-2');

// Gắn sự kiện bấm vào tab "Đang hoạt động"
activeTab.addEventListener('click', function () {
    fetchTourInformation(); // Gọi hàm để lấy danh sách tour đang hoạt động
});

// Gắn sự kiện bấm vào tab "Đã kết thúc"
endedTab.addEventListener('click', function () {
    fetchHiddenToursInformation(); // Gọi hàm để lấy danh sách tour đã kết thúc
});
let tourDataList = [];
let currentPage = 1;

// async function fetchTourInformation() {
//     try {
//         const response = await axios.get('/tours');
//         tourDataList = response.data;
//         totaltours=tourDataList.length;
//         renderTourPage(currentPage);
//     } catch (error) {
//         console.log(error);
//     }
// } 
// async function fetchHiddenToursInformation() {
//     try {
//         const response = await axios.get('/tours/hiddenTours');
//         const hiddenTourDataList = response.data;
//         // Thêm danh sách tour đã kết thúc vào danh sách tour hiện tại
//         tourDataList = [...tourDataList, ...hiddenTourDataList];
//         // Gọi hàm renderTourPage để hiển thị danh sách tour mới
//         renderTourPage(currentPage);
//     } catch (error) {
//         console.log(error);
//     }
// } 

async function fetchTourInformation() {
    try {
        const response = await axios.get(`/tours`);
        tourDataList = response.data;
        renderTourPage(currentPage);
    } catch (error) {
        console.log(error);
    }
}

async function fetchHiddenToursInformation() {
    try {
        const response = await axios.get(`/tours/hiddentTours`);
        const hiddenTourDataList = response.data;
        isHidden = true; // Đặt biến isHidden thành true để chỉ định đang hiển thị hidden tours

        console.log(hiddenTourDataList);
        renderTourPage(currentPage,hiddenTourDataList);
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
    const container = document.querySelector('.row');
    container.innerHTML = '';

    // Tạo thẻ div cho từng tour trên trang hiện tại
    currentTourDataList.forEach(tourData => {
        const tourCode = tourData.code;
        const tourDate = tourData.date;
        const slots = tourData.slots;
        const remainSlots = tourData.remainSlots;
        const tourName = tourData.name;
const maxLength = 80;

let truncatedName = tourName;
if (tourName.length > maxLength) {
  truncatedName = tourName.substring(0, maxLength - 3) + "...";
}
const formattedDate = new Date(tourDate).toLocaleDateString('en-GB');
const dateParts = formattedDate.split('/');
const departureDate = `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
const tourDate1 = departureDate;

        // Tạo thẻ div cho tour
        const tourDiv = document.createElement('div');
        tourDiv.classList.add('col-md-6', 'col-xxl-3');

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
                    <button id="tacvu" type="button">&#8230;</button>
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


    });


    
// Sau khi nhận được dữ liệu từ API
// document.getElementById("loading-spinner").classList.remove("show");

    // Tạo phân trang
    renderPagination();
    
}
let isHidden = false; // Khai báo biến isHidden mặc định là false

function renderPagination(hiddenTourDataList) {
    const dataList = hiddenTourDataList ? hiddenTourDataList : tourDataList;
    const totalPages = Math.ceil(dataList.length / 12);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    if (totalPages > 1) {
        const previousLink = `<li class="page-item">
                                <a class="page-link custom-prev-next" href="#" aria-label="Previous" onclick="changePage('previous')">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>`;
        pagination.insertAdjacentHTML("beforeend", previousLink);

        for (let i = 1; i <= totalPages; i++) {
            const liClass = i === currentPage ? "page-item active" : "page-item";
            const link = `<li class="${liClass}">
                            <a class="page-link custom-page-link" href="#" onclick="changePage(${i})">${i}</a>
                          </li>`;
            pagination.insertAdjacentHTML("beforeend", link);
        }

        const nextLink = `<li class="page-item">
                            <a class="page-link custom-prev-next" href="#" aria-label="Next" onclick="changePage('next')">
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

    // Hiển thị lại phân trang
    renderPagination(hiddenTourDataList);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchTourInformation();
});
document.addEventListener("DOMContentLoaded", function() {
    // Lấy đối tượng button và container chứa các ngày
    const buttonThemNgay = document.getElementById("button-them-ngay");
    const ngayContainer = document.getElementById("ngay-container");
  
    // Số lượng ngày hiện tại
    let currentNgay = 3;
  
    // Xử lý sự kiện khi bấm vào nút "Thêm Ngày"
    buttonThemNgay.addEventListener("click", function () {
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
  
      const newTextInput = document.createElement("div");
      newTextInput.classList.add("text-input");
      newTextInput.setAttribute("contenteditable", "");
      newTextInput.setAttribute("id", "ngay" + currentNgay + "-input");
  
      // Chèn các phần tử con vào div mới
      newNgayDiv.appendChild(newLabel);
      newNgayDiv.appendChild(newInput);
      newNgayDiv.appendChild(newTextInput);
  
      // Chèn div mới vào container ngày
      ngayContainer.appendChild(newNgayDiv);
  
      // Tăng số lượng ngày hiện tại
      currentNgay++;
    });
  });