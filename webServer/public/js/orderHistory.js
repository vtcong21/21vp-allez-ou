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

const myModal = new bootstrap.Modal(document.getElementById('modal_1'));

function openSuccessModal(i) {
    
    const modalElement = document.querySelector("#modal_1");
    modalElement.querySelector("#order-img-tour").src = ordersSuccess[i].tour.cardImgUrl;
    modalElement.querySelector("#order-name-tour").textContent = ordersSuccess[i].tour.name;
    modalElement.querySelector("#order-code-tour").textContent = ordersSuccess[i].item.tourCode;
    modalElement.querySelector("#order-representer-name").textContent = ordersSuccess[i].item.representer.name;
    modalElement.querySelector("#order-total-price").textContent = ordersSuccess[i].item.totalPrice;
    modalElement.querySelector("#order-start-date").textContent = ordersSuccess[i].tour.date;
    modalElement.querySelector("#order-number-ticket").textContent = ordersSuccess[i].item.tickets.length;
    modalElement.querySelector("#order-representer__email").textContent = ordersSuccess[i].item.representer.email;
    modalElement.querySelector("#order-representer__phone").textContent = ordersSuccess[i].item.representer.phoneNumber;
    modalElement.querySelector("#order-representer__address").textContent = ordersSuccess[i].item.representer.address;
    document.getElementById('confirmDeleteButton').setAttribute('data-index', i);

    const ticketsContainer = document.getElementById("order-tickets__container");
    ticketsContainer.innerHTML = "";
    for (let j = 0; j < ordersSuccess[i].item.tickets.length; j++) {
        let ticketRow = maketTicketRow(ordersSuccess[i].item.tickets[j], j + 1);
        ticketsContainer.insertAdjacentHTML("beforeend", ticketRow);
    }

    myModal.show();
}

const myModal2 = new bootstrap.Modal(document.getElementById('modal_2'));

function openCompletedModal(i) {
    
    const modalElement = document.querySelector("#modal_2");
    modalElement.querySelector("#order-img-tour2").src = ordersCompleted[i].tour.cardImgUrl;
    modalElement.querySelector("#order-name-tour2").textContent = ordersCompleted[i].tour.name;
    modalElement.querySelector("#order-code-tour2").textContent = ordersCompleted[i].item.tourCode;
    modalElement.querySelector("#order-representer-name2").textContent = ordersCompleted[i].item.representer.name;
    modalElement.querySelector("#order-total-price2").textContent = ordersCompleted[i].item.totalPrice;
    modalElement.querySelector("#order-start-date2").textContent = ordersCompleted[i].tour.date;
    modalElement.querySelector("#order-number-ticket2").textContent = ordersCompleted[i].item.tickets.length;
    modalElement.querySelector("#order-representer__email2").textContent = ordersCompleted[i].item.representer.email;
    modalElement.querySelector("#order-representer__phone2").textContent = ordersCompleted[i].item.representer.phoneNumber;
    modalElement.querySelector("#order-representer__address2").textContent = ordersCompleted[i].item.representer.address;

    const ticketsContainer = document.getElementById("order-tickets__container2");
    ticketsContainer.innerHTML = "";
  
    for (let j = 0; j < ordersCompleted[i].item.tickets.length; j++) {
        let ticketRow = maketTicketRow(ordersCompleted[i].item.tickets[j], j + 1);
        ticketsContainer.insertAdjacentHTML("beforeend", ticketRow);
    }

    myModal2.show();
}

const myModal3 = new bootstrap.Modal(document.getElementById('modal_3'));

function openCancelledModal(i) {
    
    const modalElement = document.querySelector("#modal_3");
    modalElement.querySelector("#order-img-tour3").src = ordersCancelled[i].tour.cardImgUrl;
    modalElement.querySelector("#order-name-tour3").textContent = ordersCancelled[i].tour.name;
    modalElement.querySelector("#order-code-tour3").textContent = ordersCancelled[i].item.tourCode;
    modalElement.querySelector("#order-representer-name3").textContent = ordersCancelled[i].item.representer.name;
    modalElement.querySelector("#order-total-price3").textContent = ordersCancelled[i].item.totalPrice;
    modalElement.querySelector("#order-start-date3").textContent = ordersCancelled[i].tour.date;
    modalElement.querySelector("#order-number-ticket3").textContent = ordersCancelled[i].item.tickets.length;
    modalElement.querySelector("#order-representer__email3").textContent = ordersCancelled[i].item.representer.email;
    modalElement.querySelector("#order-representer__phone3").textContent = ordersCancelled[i].item.representer.phoneNumber;
    modalElement.querySelector("#order-representer__address3").textContent = ordersCancelled[i].item.representer.address;

    const ticketsContainer = document.getElementById("order-tickets__container3");
    ticketsContainer.innerHTML = "";
    for (let j = 0; j < ordersCancelled[i].item.tickets.length; j++) {
        let ticketRow = maketTicketRow(ordersCancelled[i].item.tickets[j], j + 1);
        ticketsContainer.insertAdjacentHTML("beforeend", ticketRow);
    }

    myModal3.show();
}

function maketTicketRow(ticket, index) {
    return `
    <ul class="list-group list-group-borderless">
    <p class="more-title">Khách hàng ${index} <span class="badge rounded-pill bg-success"> ${translateTypeToVietnamese(ticket.type)}</span></p>
    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
        <span class="mb-0 h6-v2">Họ tên: </span>
        <span class="h6-v2 fw-normal mb-0">${ticket.fullName}</span>
    </li>
    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
        <span class="mb-0 h6-v2">Giới tính: </span>
        <span class="h6-v2 fw-normal mb-0">${translateGenderToVietnamese(ticket.gender)}</span>
    </li>
    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
        <span class="mb-0 h6-v2">Ngày sinh: </span>
        <span class="h6-v2 fw-normal mb-0">${changeDateToString(ticket.dateOfBirth)}</span>
    </li>
</ul>
    `;
}



const mModalPW = new bootstrap.Modal(document.getElementById('confirmDeleteModalbyPW'));

function callModalConfirmPW() {
    const index = document.getElementById('confirmDeleteButton').getAttribute('data-index');
  
    const mName = document.getElementById('nameTour');
    const mDate = document.getElementById('dateTour');
    const mTicket = document.getElementById('ticketsTourLength');
    const mPrice = document.getElementById('priceTour');

    mName.textContent = ordersSuccess[index].tour.name;
    mDate.textContent = ordersSuccess[index].tour.date;
    mTicket.textContent = ordersSuccess[index].item.tickets.length;
    mPrice.textContent = ordersSuccess[index].item.totalPrice;

    mModalPW.show();
}

async function CancelOrderFunc() {
    try {
        Swal.showLoading();
        const password = document.getElementById('input-pw').value // Lấy giá trị mật khẩu từ xacnhanmatkhauInput
  
        const response = await axios.post('/auth/checkPassword', {
            password: password
        });
        Swal.close();
        if (response){
            putCancelTour();
        }
    } catch (error) {
        console.error("Error:", error);
        await Swal.fire({
            icon: "error",
            title: "Mật khẩu không đúng!",
            customClass: {
                popup: "swal2-popup",
                confirmButton: "swal2-confirm-btn btn p-3",
            },
        });
    }
              
}

async function putCancelTour() {
    try {
        Swal.showLoading();
        const index = document.getElementById('confirmDeleteButton').getAttribute('data-index');
        const orderId = ordersSuccess[index].item._id;
 
        const response = await axios.put(`/cart/orderHistory/${orderId}`);
        Swal.close();

        if (response.status == 200) {
            await Swal.fire({
                icon: "success",
                title: "Hủy chuyến du lịch thành công!",
                customClass: {
                    popup: "swal2-popup",
                    confirmButton: "swal2-confirm-btn btn p-3",
                },
            });
            location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
        Swal.fire({
            icon: "error",
            title: "Hủy chuyến du lịch thất bại!",
            customClass: {
                popup: "swal2-popup",
                confirmButton: "swal2-confirm-btn btn p-3",
            },
        });
    }
}



