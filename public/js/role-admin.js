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


const confirmDeleteButton = document.getElementById("confirmDeleteButton");
const deleteApiUrl = "https://example.com/delete"; // Thay thế bằng URL API xóa tài khoản

confirmDeleteButton.addEventListener("click", function () {
    // Gọi hàm API xóa tài khoản ở đây
    // Ví dụ sử dụng fetch API:
    fetch(deleteApiUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        // Thêm thông tin tài khoản cần xóa vào body request nếu cần
        body: JSON.stringify({
            // Thông tin tài khoản cần xóa
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Xử lý kết quả trả về từ API (nếu cần)
            console.log(data);
            // Ẩn modal sau khi xóa thành công
            const confirmDeleteModal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
            confirmDeleteModal.hide();
        })
        .catch((error) => {
            // Xử lý lỗi (nếu có)
            console.error("Error:", error);
        });
});
