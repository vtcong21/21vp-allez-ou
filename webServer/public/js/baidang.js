
let tourDataList = [];
let currentPage = 1;

async function fetchTourInformation() {
    try {
        const response = await axios.get('/tours');
        tourDataList = response.data;
        totaltours=tourDataList.length;
        renderTourPage(currentPage);
    } catch (error) {
        console.log(error);
    }
}

function renderTourPage(page) {
    // Xác định vị trí bắt đầu và kết thúc của danh sách tour trên trang hiện tại
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Lấy danh sách tour trên trang hiện tại
    const currentTourDataList = tourDataList.slice(startIndex, endIndex);

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
const maxLength = 96;
// function calculateProgressBarWidth(slots, remainSlots) {
//     const usedSlots = slots - remainSlots;
//     const progressbar = (usedSlots / slots) * 100;
//     return progressbar;
//   }
//   const progressbarwidth = calculateProgressBarWidth(slots,remainSlots); 
//     const progressbaredit = document.getElementsByClassName(`progress-bar`);
//     progressbaredit.style.width = progressbarwidth + "%";  

let truncatedName = tourName;
if (tourName.length > maxLength) {
  truncatedName = tourName.substring(0, maxLength - 10) + "...";
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
    });

    // Tạo phân trang
    renderPagination();
    
}

function renderPagination() {
    const totalPages = Math.ceil(tourDataList.length / 12);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
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
    // Xóa các thẻ button phân trang cũ trước khi tạo lại
    // const paginationContainer = document.querySelector('#pagination');
    // paginationContainer.innerHTML = '';

    // // Tạo các thẻ button phân trang
    // for (let i = 1; i <= totalPages; i++) {
    //     const pageButton = document.createElement('button');
    //     pageButton.classList.add('page-button');
    //     pageButton.textContent = i;

    //     // Đặt lắng nghe sự kiện khi nhấp vào button phân trang
    //     pageButton.addEventListener('click', () => {
    //         currentPage = i;
    //         renderTourPage(currentPage);
    //     });

    //     paginationContainer.appendChild(pageButton);
    // }
}
function changePage(page) {
    const totalPages = Math.ceil(tourDataList.length / 12);
  
    if (page === "previous") {
      currentPage = Math.max(1, currentPage - 1);
    } else if (page === "next") {
      currentPage = Math.min(totalPages, currentPage + 1);
    } else {
      currentPage = page;
    }
  
    renderTourPage(currentPage);
  
    // Hiển thị lại phân trang
    renderPagination();
  }

document.addEventListener("DOMContentLoaded", () => {
    fetchTourInformation();
});