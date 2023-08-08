 // Lấy giá trị float-end
//  var floatEnd = document.getElementById('floatValue').textContent;
    
//  // Lấy giá trị floatEnd và chuyển đổi thành phần số
//  var percentage = parseFloat(floatEnd);
 
//  // Lấy giá trị của aria-valuemax
//  var maxValue = parseFloat(document.getElementById('progressBar').getAttribute('aria-valuemax'));
 
//  // Tính toán giá trị width dựa trên giá trị floatEnd và maxValue
//  var widthValue = (percentage / maxValue) * 100;
 
//  // Set giá trị width trong style của progress-bar
//  var progressBar = document.getElementById('progressBar');
//  progressBar.style.width = widthValue + "%";
// // Khai báo biến global để lưu trữ danh sách tour và số trang hiện tại
let tourDataList = [];
let currentPage = 1;

async function fetchTourInformation() {
    try {
        const response = await axios.get('/tours');
        tourDataList = response.data;

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
        const remainSlots = tourData.remainSlots;

        // Tạo thẻ div cho tour
        const tourDiv = document.createElement('div');
        tourDiv.classList.add('col-md-6', 'col-xxl-3');

        // Tạo nội dung cho thẻ div
        tourDiv.innerHTML = `
            <div class="pageContainer">
                <div class="card d-block">
                    <div class="card-body">
                        <div id="tour-title-${tourCode}">
                            <div style="text-align: center;">
                                <label for="information-tour" style="text-decoration: underline;">Thông tin chuyến đi</label>
                            </div>
                            <div class="name-tour">
                                ${tourData.name}
                            </div>
                        </div>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item p-3">
                            <h3 class="mb-2 fw-bold">Còn trống
                                <span id="floatValue-${tourCode}" class="float-end">${remainSlots}</span>
                            </h3>
                            <div class="progress progress-sm">
                                <div id="progressBar-${tourCode}" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="10">
                                </div>
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

    // Xóa các thẻ button phân trang cũ trước khi tạo lại
    const paginationContainer = document.getElementById('pagination');

    // Tạo các thẻ button phân trang
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('page-button');
        pageButton.textContent = i;

        // Đặt lắng nghe sự kiện khi nhấp vào button phân trang
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderTourPage(currentPage);
        });

        paginationContainer.appendChild(pageButton);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchTourInformation();
});