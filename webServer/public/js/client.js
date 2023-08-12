function copyPhone(text) {
    navigator.clipboard.writeText(text);
    alert("Đã copy số điện thoại vào clip board");
}
function copyMail(text) {
    navigator.clipboard.writeText(text);
    alert("Đã copy emai vào clip board");
}

const itemsPerPage = 9;
let currentPage = 1;
let totalItems = 0;

async function getAllClient() {
    try {
        const response = await axios.get("/admin/getClientList");
        if (response.status === 200) {
            let clients = response.data;
            totalItems = clients.length;
            clients = clients.map((client) => {
                const formattedDateCreate = changeDateToString(client.dateCreate);
                const formattedDateOfBirth = changeDateToString(client.dateOfBirth);
                const formattedGender = convertGenderToVietnamese(client.gender)
                return { ...client, dateCreate: formattedDateCreate, gender:formattedGender, dateOfBirth:formattedDateOfBirth };
            });
            displayClientList(clients);
            displayPagination(totalItems);
        } else {
            throw new Error("Lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        console.log(error);
    }
}

function displayClientList(clients) {
    const listClient = document.getElementById("client-list__container");
    listClient.innerHTML = "";
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const clientToShow = clients.slice(startIndex, endIndex);
    clientToShow.forEach((client) => {
        const row = makeClientRow(client);
        listClient.insertAdjacentHTML("beforeend", row);
    });
}

function makeClientRow(client) {
    return `
<tr>
    <td>
        <div class="d-flex align-items-center">
            <img src="/img/client.png" alt="" style="width: 30px; height: 30px;" class="rounded-circle" />
            <div class="ms-3">
                <p class="fw-bold mb-1 name">${client.fullName}</p>
            </div>
        </div>
    </td>
    <td>
        <p class="fw-normal mb-1">${client._id}</p>
    </td>
    <td>
        <p class="fw-normal mb-1">${client.gender}</p>
    </td>
    <td>
        <p class="fw-normal mb-1">${client.dateCreate}</p>
    </td>
    <td>
        <div class="d-flex justify-content-end">
            <a onclick="copyMail('${client.email}')"><img src="/img/admin/users-role/paper-plane.png" class="client-icon" /></a>
            <a onclick="copyPhone('${client.phoneNumber}')"><img src="/img/admin/users-role/phone-call-1.png" class="client-icon" /></a>
            <a><img src="/img/admin/users-role/eye-1.png" class="client-icon" data-bs-toggle="modal" data-bs-target="#modalInfo" 
            data-fullName= "${client.fullName}" 
            data-id="${client._id}" 
            data-gender="${client.gender}" 
            data-date="${client.dateOfBirth}"
            data-phone="${client.phoneNumber}" 
            data-email="${client.email}" 
            onclick = "showModalInfo(event)"/></a>
        </div>
    </td>
</tr>
`;
}

function displayPagination(totalItems) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Tạo liên kết "Previous"
    const previousLink = `<li class="page-item">
                            <a class="page-link custom-prev-next" href="#" aria-label="Previous" onclick="changePage('previous')">
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>`;
    pagination.insertAdjacentHTML("beforeend", previousLink);

    // Tạo liên kết cho từng trang
    for (let i = 1; i <= totalPages; i++) {
        const liClass = i === currentPage ? "page-item active" : "page-item";
        const link = `<li class="${liClass}">
                      <a class="page-link custom-page-link" href="#" onclick="changePage(${i})">${i}</a>
                    </li>`;
        pagination.insertAdjacentHTML("beforeend", link);
    }

    // Tạo liên kết "Next"
    const nextLink = `<li class="page-item">
                        <a class="page-link custom-prev-next" href="#" aria-label="Next" onclick="changePage('next')">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>`;
    pagination.insertAdjacentHTML("beforeend", nextLink);
}

function changePage(page) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (page === "previous") {
        currentPage = Math.max(1, currentPage - 1);
    } else if (page === "next") {
        currentPage = Math.min(totalPages, currentPage + 1);
    } else {
        currentPage = page;
    }

    getAllClient(); // Gọi hàm load dữ liệu mới dựa vào trang hiện tại (currentPage) và itemsPerPage
    displayPagination(totalItems); // Hiển thị lại phân trang
}

getAllClient();

function showModalInfo(event) {
    const modalElement = document.querySelector("#modalInfo");
    const modalName = event.currentTarget.getAttribute("data-fullName");
    const modalClientID = event.currentTarget.getAttribute("data-id");
    const modalGender = event.currentTarget.getAttribute("data-gender");
    const modalDate = event.currentTarget.getAttribute("data-date");
    const modalPhone = event.currentTarget.getAttribute("data-phone");
    const modalEmail = event.currentTarget.getAttribute("data-email");

    modalElement.querySelector("#client-name").textContent = modalName;
    modalElement.querySelector("#client-id").textContent = modalClientID;
    modalElement.querySelector("#client-gender").textContent = modalGender;
    modalElement.querySelector("#client-date").textContent = modalDate;
    modalElement.querySelector("#client-phone").textContent = modalPhone;
    modalElement.querySelector("#client-email").textContent = modalEmail;
}

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

function convertGenderToVietnamese(gender) {
    if (gender === "Male") {
        return "Nam";
    } else if (gender === "Female") {
        return "Nữ";
    } else {
        return gender;
    }
}
