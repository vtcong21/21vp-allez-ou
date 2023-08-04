const form = document.getElementById("registrationForm");
const passwordInput = document.getElementById("password");
const verifyPasswordInput = document.getElementById("verifyPassword");
const passwordMismatchMessage = document.getElementById("passwordMismatch");


form.addEventListener("submit", function (event) {
    if (passwordInput.value !== verifyPasswordInput.value) {
        event.preventDefault(); // Ngăn form được gửi đi
        passwordMismatchMessage.classList.remove("d-none"); // Hiển thị thông báo lỗi
    }
});

// lấy cúc ki, gửi request gì cũng phải gửi kèm, tạm thời comment ---------------------------------------------------
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
//--------------------------------------------------------------------------------------------------

// xoá tài khoản (phần này làm sao để lúc bấm cái nút "XÓA" trong modal thì lấy được cái userId nhé, k rõ fe)-----------------------------------------------------------------------------------
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
let adminId = null;
function getUserId(event) {
    adminId = event.currentTarget.getAttribute("data-id");
}
confirmDeleteButton.addEventListener("click", function () {
    console.log(adminId);
    const token = getCookie("token");
    //     if (!token) return;

    axios
        .delete(`/admin/deleteAdminAccount`, {
            // headers: { Authorization: `Bearer ${token}` } ,
            data: {
                adminId: adminId,
            },
        })
        .then((response) => {
            console.log(response.data);
            const confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
            confirmDeleteModal.hide();
            loadUsers();
        })
        .catch((error) => {
            confirmDeleteModal.hide();
            console.error("Error:", error);
        });
});
//------------------------------------------------------------------------------------------------------------

// load danh sách acc admin từ server và render -------------------------------------------------------------
// function loadUsers() {
//     const token = getCookie("token");
//     //     if (!token) return;

//     axios
//         .get(
//             "/admin/getAdminList"
//             // , { headers: { Authorization: `Bearer ${token}` } }
//         )
//         .then((response) => {
//             const users = response.data;
//             console.log(response.date);
//             const tbody = document.querySelector(".table tbody");
//             tbody.innerHTML = "";
//             users.forEach((user) => {
//                 const row = makeUserRow(user);
//                 tbody.insertAdjacentHTML("beforeend", row);
//             });
//         })
//         .catch((error) => {
//             console.error("Error fetching user data:", error);
//         });
// }
document.addEventListener("DOMContentLoaded", loadUsers);
//-----------------------------------------------------------------------------------------------------------

const itemsPerPage = 10;
let currentPage = 1;

function loadUsers() {
    axios
        .get("/admin/getAdminList")
        .then((response) => {
            const users = response.data;
            const totalPages = Math.ceil(users.length / itemsPerPage);
            displayUsers(users, totalPages);
            displayPagination(totalPages);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
}

function displayUsers(users, totalPages) {
    const tbody = document.querySelector(".table tbody");
    tbody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usersToShow = users.slice(startIndex, endIndex);
    console.log(usersToShow);
    usersToShow.forEach((user) => {
        const row = makeUserRow(user);
        tbody.insertAdjacentHTML("beforeend", row);
    });
}

function displayPagination(totalPages) {
    const pagination = document.getElementById("pagination");
pagination.innerHTML = "";

// Tạo liên kết "Previous"
const previousLink = `<li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous" onclick="changePage('previous')">
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>`;
pagination.insertAdjacentHTML("beforeend", previousLink);

// Tạo liên kết cho từng trang
for (let i = 1; i <= totalPages; i++) {
    const liClass = i === currentPage ? "page-item active" : "page-item";
    const link = `<li class="${liClass}">
                      <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                    </li>`;
    pagination.insertAdjacentHTML("beforeend", link);
}

// Tạo liên kết "Next"
const nextLink = `<li class="page-item">
                        <a class="page-link" href="#" aria-label="Next" onclick="changePage('next')">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>`;
pagination.insertAdjacentHTML("beforeend", nextLink);

}

function changePage(page) {
    currentPage = page;
    loadUsers();
}


// tạo tài khoản mới, render dòng user mới tương ứng ------------------------------------------------------------
document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const verifyPassword = document.getElementById("verifyPassword").value;

    if (password !== verifyPassword) {
        document.getElementById("passwordMismatch").classList.remove("d-none");
        return;
    }
    console.log("sent");
    axios
        .post("/admin/createAdminAccount", {
            fullName: name,
            email: email,
            password: password,
        })
        .then((response) => {
            console.log(response.data);
            loadUsers();
            $('#registrationModal').modal('hide');
            
            // modal.hide();
            // sao tạo r modal k tắt?? sửa hay chỉnh sao đi k rõ fe
        })
        .catch((error) => {
            console.error("Error creating admin account:", error);
            $('#registrationModal').modal('hide');
        });
});
// ----------------------------------------------------------------------------------------------

// này tạo hàng trong cái ô admin acc-----------------------------------------------------------------------------------------------
function makeUserRow(user) {
    return `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <img src="https://mdbootstrap.com/img/new/avatars/8.jpg" alt="" style="width: 30px; height: 30px;" class="rounded-circle" />
                    <div class="ms-3">
                        <p class="fw-bold mb-1 name">${user.fullName}</p>
                    </div>
                </div>
            </td>
            <td>
                <p class="fw-normal mb-1">${String(user._id)}</p>
            </td>
            <td>
                <div class="d-flex justify-content-end">
                    <a data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" data-id="${user._id}" onclick="getUserId(event)"><img src="img/admin/admins-role/trash-bin.png" /></a>
                </div>
            </td>
        </tr>
    `;
}
