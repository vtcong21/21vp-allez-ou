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
    console.log(ordersSuccess[i]);
    
    const modalElement = document.querySelector("#modal_1");
    modalElement.querySelector("#order-name-tour").textContent = ordersSuccess[i].tour.name;
    modalElement.querySelector("#order-code-tour").textContent = ordersSuccess[i].item.tourCode;
    modalElement.querySelector("#order-representer-name").textContent = ordersSuccess[i].item.representer.name;
    modalElement.querySelector("#order-total-price").textContent = ordersSuccess[i].item.totalPrice;
    modalElement.querySelector("#order-start-date").textContent = ordersSuccess[i].tour.date;
    modalElement.querySelector("#order-number-ticket").textContent = ordersSuccess[i].item.tickets.length;
    modalElement.querySelector("#order-representer__email").textContent = ordersSuccess[i].item.representer.email;
    modalElement.querySelector("#order-representer__phone").textContent = ordersSuccess[i].item.representer.phone;
    modalElement.querySelector("#order-representer__address").textContent = ordersSuccess[i].item.representer.address;

    const ticketsContainer = document.getElementById("order-tickets__container");
    ticketsContainer.innerHTML = "";
    console.log(ordersSuccess[i].item.tickets);
    for (let j = 0; j < ordersSuccess[i].item.tickets.length; j++) {
        let ticketRow = maketTicketRow(ordersSuccess[i].item.tickets[j], j + 1);
        ticketsContainer.insertAdjacentHTML("beforeend", ticketRow);
    }

    myModal.show();
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


