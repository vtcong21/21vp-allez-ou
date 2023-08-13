function changeDateToString(currentTimeString) {
  var currentTime = new Date(currentTimeString); // Chuyển chuỗi thành đối tượng Date
  var day = currentTime.getDate();
  var month = currentTime.getMonth() + 1;
  var year = currentTime.getFullYear();

  if (day.toString().length === 1) {
      day = "0" + day.toString();
  }
  if (month.toString().length === 1) {
      month = "0" + month.toString();
  }

  return day + "/" + month + "/" + year;
}
function translateStatusToVietnamese(status) {
  switch (status) {
      case "Success":
          return "Đặt thành công";
      case "Completed":
          return "Hoàn thành";
      case "Cancelled":
          return "Đã hủy";
      default:
          return "Chờ xác nhận";
  }
}

function translateGenderToVietnamese(gender) {
  switch (gender) {
      case "Male":
          return "Nam";
      case "Female":
          return "Nữ";
      case "Undefined":
          return "Không xác định";
      default:
          return "Giới tính không xác định";
  }
}

function translateTypeToVietnamese(type) {
  switch (type) {
      case "Adult":
          return "Người lớn";
      case "Teen":
          return "Trẻ em";
      case "Kid":
          return "Trẻ nhỏ";
      case "Baby":
          return "Em bé";
      default:
          return "Không xác định";
  }
}

// get All order

const itemsPerPage = 10; // Số lượng đơn hàng hiển thị trên mỗi trang
let currentPage = 1;
let groupedOrders = {}; // Thêm biến groupedOrders để lưu trạng thái đơn hàng đã được nhóm
let totalItems = 0; // Khai báo biến totalItems và gán giá trị ban đầu là 0

async function getAllOrders() {
  try {
      const response = await axios.get("/admin/getAllOrders");
      if (response.status === 200) {
          let orders = response.data;
          totalItems = orders.length;
          orders.forEach((order) => {
              const formattedOrderDate = changeDateToString(order.orderDate);
              const formattedStatus = translateStatusToVietnamese(order.status);
              const translatedTickets = order.tickets.map((ticket) => ({
                  ...ticket,
                  gender: translateGenderToVietnamese(ticket.gender),
                  type: translateTypeToVietnamese(ticket.type),
                  dateOfBirth: changeDateToString(ticket.dateOfBirth),
              }));

              if (!groupedOrders[formattedStatus]) {
                  groupedOrders[formattedStatus] = [];
              }
              groupedOrders[formattedStatus].push({
                  ...order,
                  orderDate: formattedOrderDate,
                  status: formattedStatus,
                  tickets: translatedTickets,
              });
          });

          const tabSuccess = document.getElementById("tab-success");
          const tabCompleted = document.getElementById("tab-completed");
          const tabCancelled = document.getElementById("tab-cancelled");

          displayOrdersByStatus("Đặt thành công", tabSuccess, "pagination-success");
          displayOrdersByStatus("Hoàn thành", tabCompleted, "pagination-completed");
          displayOrdersByStatus("Đã hủy", tabCancelled, "pagination-cancelled");
      } else {
          throw new Error("Lỗi khi gửi yêu cầu đến API");
      }
  } catch (error) {
      console.log(error);
  }
}

function displayOrdersByStatus(status, orderTab, orderTabId) {
  if (groupedOrders[status]) {
      displayOrderList(groupedOrders[status], orderTab, status);
      displayPagination(totalItems, currentPage, itemsPerPage, orderTabId);
  } else {
      orderTab.innerHTML = "<p>Không có đơn hàng nào trong trạng thái này.</p>";
      displayPagination(totalItems, currentPage, itemsPerPage, orderTabId);
  }
}

function displayOrderList(orders, orderTab, orderStatus) {
  const statusClass = getStatusClass(orderStatus); // Gọi hàm getStatusClass để lấy class tương ứng với trạng thái
  orderTab.innerHTML = "";
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const orderToShow = orders.slice(startIndex, endIndex);
  orderToShow.forEach((order) => {
      const row = makeOrderRow(order, orderStatus, statusClass);
      orderTab.insertAdjacentHTML("beforeend", row);
  });
}

function makeOrderRow(order, status, className) {
  return `
<tr>
<td>
    <div class="d-flex align-items-center">
        <img src="/img/client.png" alt="" style="width: 30px; height: 30px;" class="rounded-circle" />
        <div class="ms-3">
            <p class="fw-bold mt-2 name">${order.representer.name}</p>
        </div>
    </div>
</td>
<td>
    <p class="fw-normal mt-2 name">${order.tourCode}</p>
</td>
<td>
    <p class="fw-normal mt-2">4</p>
</td>
<td>
    <p class="fw-normal mt-2">${order.orderDate}</p>
</td>
<td>
    <p class="mt-2 badge ${className}">${status}</p>
</td>
<td>
    <div class="d-flex justify-content-end mt-2">
        <a data-bs-toggle="modal" data-bs-target="#orderModal"
        data-codeTour=${order.tourCode}
        data-representer=${order.representer.name}
        data-totalPrice=${order.totalPrice}
        data-status=${status}
        data-startDate=${order.orderDate}
        data-numberTicket=${order.tickets.length}
        data-tickets=${order.tickets}><img src="/img/admin/adminOrder/showMore.png" /></a>
    </div>
</td>
</tr>
`;
}

function getStatusClass(orderStatus) {
  switch (orderStatus) {
      case "Đặt thành công":
          return "text-bg-success";
      case "Hoàn thành":
          return "text-bg-primary";
      case "Đã hủy":
          return "text-bg-danger";
      default:
          return "";
  }
}

function displayPagination(totalItems, currentPage, itemsPerPage, orderTabId) {
  const pagination = document.getElementById(orderTabId);
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Tạo liên kết "Previous"
  const previousLink = `<li class="page-item">
                        <a class="page-link custom-prev-next" href="#" aria-label="Previous" onclick="changePage('previous', '${orderTabId}')">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>`;
  pagination.insertAdjacentHTML("beforeend", previousLink);

  // Tạo liên kết cho từng trang
  console.log(totalItems);
  for (let i = 1; i <= totalPages; i++) {
      const liClass = i === currentPage ? "page-item active" : "page-item";
      const link = `<li class="${liClass}">
                  <a class="page-link custom-page-link" href="#" onclick="changePage(${i}, '${orderTabId}')">${i}</a>
                </li>`;
      pagination.insertAdjacentHTML("beforeend", link);
  }

  // Tạo liên kết "Next"
  const nextLink = `<li class="page-item">
                    <a class="page-link custom-prev-next" href="#" aria-label="Next" onclick="changePage('next', '${orderTabId}')">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>`;
  pagination.insertAdjacentHTML("beforeend", nextLink);
}

// Hàm xử lý thay đổi trang
function changePage(pageNumber, activeTab) {
  currentPage = pageNumber;

  // Lấy lại dữ liệu và hiển thị danh sách đơn hàng và pagination tương ứng với trang hiện tại
  const status = activeTab.textContent.trim();
  displayOrdersByStatus(status, activeTab);
}

// Gọi hàm để lấy và hiển thị đơn hàng
getAllOrders();
