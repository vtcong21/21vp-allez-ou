
var price = parseInt(tourData.price);
var teenDiscount = parseFloat(tourData.teenDiscount);
var kidDiscount = parseFloat(tourData.kidDiscount);
var babyDiscount = parseFloat(tourData.babyDiscount);
var quantities = [1, 0, 0, 0];
var prices = [price, price * (1 - teenDiscount), price * (1 - kidDiscount), price * (1 - babyDiscount)];
var type = ['Adult', 'Teen', 'Kid', 'Baby'];
document.addEventListener('DOMContentLoaded', function () {
    const orderButton = document.getElementById('button-order-btn');
    function getFormData() {
        var formData = [];
        for (let index = 0; index < 4; index++) {
            if (quantities[index] > 0) {
                var firstGroup = document.querySelector(`.first-group${(index * 2) + 1}`);
                var nameInput = firstGroup.querySelector(`#ho-ten1`);
                var genderInput = firstGroup.querySelector(`#gender`);
                var dobInput = firstGroup.querySelector(`#ngay-sinh`);
                if (nameInput && genderInput && dobInput) {
                    var data = {
                        type: type[index],
                        fullName: nameInput.value,
                        gender: genderInput.value,
                        dateOfBirth: dobInput.value,
                        price: prices[index]
                    };
                    formData.push(data);
                }
                if (quantities[index] > 1) {
                    var firstGroup2 = document.querySelector(`.first-group${(index + 1) * 2}`);
                    var hoTenList = firstGroup2.querySelectorAll(`.ho-ten-${index}`);
                    var genderList = firstGroup2.querySelectorAll(`.gender-${index}`);
                    var ngaySinhList = firstGroup2.querySelectorAll(`.ngay-sinh-${index}`);
                    for (let j = 0; j < quantities[index] - 1; j++) {
                        if (hoTenList[j] && genderList[j] && ngaySinhList[j]) {
                            var data = {
                                type: type[index],
                                fullName: hoTenList[j].value,
                                gender: genderList[j].value,
                                dateOfBirth: ngaySinhList[j].value,
                                price: prices[index]
                            };
                            formData.push(data);
                        }
                    }
                }
            }
        }
        console.log(formData); // In ra formData để kiểm tra
        return formData;
    }

    if (orderButton) {
        orderButton.onclick = async () => {
            const hoTenInput = document.getElementById('ho-ten');
            const soDienThoaiInput = document.getElementById('so-dien-thoai');
            const diaChiInput = document.getElementById('dia-chi');
            const emailInput = document.getElementById('email');
            const genderInput = document.getElementById('gender');
            const hoten1Input = document.getElementById('ho-ten1');
            const ngaysinhInput = document.getElementById('ngay-sinh');

            const soDienThoaiPattern = /^0\d{9}$/;
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Biểu thức chính quy để kiểm tra email
            if (!hoTenInput.value || !soDienThoaiInput.value || !diaChiInput.value || !emailInput.value || !genderInput.value ||
                !hoten1Input.value || !ngaysinhInput.value) {
                alert('Vui lòng điền đầy đủ thông tin!');

                return false;

            }
            else if (!soDienThoaiInput.value.match(soDienThoaiPattern)) {
                alert('Số điện thoại không hợp lệ. Vui lòng nhập lại số điện thoại đúng định dạng!');
                return false;
            }
            else if (!emailInput.value.match(emailPattern)) {
                alert('Email không hợp lệ. Vui lòng nhập lại email đúng định dạng!');
                return false;
            }

            // Lưu giá trị total vào LocalStorage với key là "totalValue"-------------------------------------------------------------------------------------------------
            const representer = {
                name: hoten1Input.value,
                email: emailInput.value,
                phoneNumber: soDienThoaiInput.value,
                address: diaChiInput.value
            };
            const tickets = getFormData();
            const totalPrice = tickets.reduce((total, ticket) => total + ticket.price, 0);
            const item = {
                _id: itemId,
                tourCode: tourData.code,
                representer: representer,
                tickets: tickets,
                totalPrice: totalPrice,
                orderDate: new Date(),
                status: 'Success',
                shippingAddress: representer.address,
                isPaid: true
            }
            const button = document.getElementById('button-order-btn');
            button.dataset.bsTarget = '#exampleModalToggle';
            const modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
            modal.show();

            const modal2 = new bootstrap.Modal(document.getElementById('exampleModalToggle2'));
            const buttonxacnhan = document.getElementById('button-xacnhan');
            buttonxacnhan.onclick = async () => {
                const xacnhanmatkhauInput = document.getElementById('xacnhanmatkhauinput').value;
                try {
                  const password = xacnhanmatkhauInput; // Lấy giá trị mật khẩu từ xacnhanmatkhauInput
                    console.log(password);
                  const checkPasswordResponse = await axios.post('/auth/checkPassword', {
                    password: password // Gửi mật khẩu vào body của yêu cầu POST
                  });
                  if (checkPasswordResponse){
                    try {
                        const payResponse = await axios.post('/user/pay',item);
                        if (payResponse.status === 200) {
                            // Đã thanh toán thành công, mở cửa sổ modal thứ 3
                            modal2.hide(); // Ẩn cửa sổ modal thứ 2
                            const modal3 = new bootstrap.Modal(document.getElementById('exampleModalToggle3'));
                            modal3.show(); // Hiển thị cửa sổ modal thứ 3
                        } else {
                            // Xử lý lỗi nếu có
                            alert('Đã xảy ra lỗi khi gọi API thanh toán');
                        }
                    } catch (error) {
                        // Xử lý lỗi nếu có
                        alert('Đã xảy ra lỗi khi gọi API thanh toán: ' + error.message);
                    }
                  }
                  else { 
                    alert('mat khau nhap vao khong dung');
                  }
                  // Xử lý kết quả trả về nếu cần
              
                } catch (error) {
                  // Xử lý lỗi nếu có
                  alert('Mật Khẩu Nhập Vào Không Đúng ');
                }
              };
        };

    }
});

// xử lí front end
document.addEventListener("DOMContentLoaded", function () {
    // số vé tối đa, dựa vào remain slot của tour đi
    var maxQuantity = parseInt(tourData.remainSlots);
    var tonghanhkhachDisplay = document.querySelector(".tonghanhkhach");


    // lấy mấy cái khung thông tin
    var informationGroups = [document.querySelector(".information-nguoilon1"),
    document.querySelector(".information-nguoilon2"),
    document.querySelector(".information-nguoilon3"),
    document.querySelector(".information-nguoilon4")];
    var totalDisplay = document.querySelector(".total5");
    var modalTongCong = document.querySelector('.tongcong');

    // update lần đầu khi load trang
    updateQuantityDisplay(0);
    updateTotalQuantityDisplay();

    function updateQuantityDisplay(index) {
        var quantity = document.querySelector(`.quantity${index === 0 ? '' : index + 1}`);
        var quantityDisplay = document.querySelector(`.quantity-display${index === 0 ? '' : index + 1}`);
        quantity.textContent = quantities[index];
        quantityDisplay.textContent = Math.round(quantities[index] * prices[index]).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        updateTotalDisplay();
        updateTotalQuantityDisplay();


    }
    function updateTotalQuantityDisplay() {
        var totalQuantity = quantities.reduce((sum, quantity) => sum + quantity, 0);
        tonghanhkhachDisplay.textContent = totalQuantity + " hành khách";
    }


    function updateTotalDisplay() {
        var total = 0;
        for (let i = 0; i < quantities.length; i++) {
            total += quantities[i] * prices[i];
        }
        modalTongCong.textContent = totalDisplay.textContent = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }


    // 4 cái button minus, 4 cái button plus, lặp từng cái để tính 
    for (let index = 0; index < 4; index++) {
        updateInformationGroup(index);
        var minusButton = document.querySelector(`.minus-button${index === 0 ? '' : index + 1}`);
        minusButton.addEventListener("click", function () {
            minusQuantity(index);
            updateInformationGroup(index);
        });
        var plusButton = document.querySelector(`.plus-button${index === 0 ? '' : index + 1}`);
        plusButton.addEventListener("click", function () {
            plusQuantity(index);
            updateInformationGroup(index);
        });
    }
    function plusQuantity(index) {
        if (quantities.reduce((sum, quantity) => sum + quantity, 0) < maxQuantity) {
            quantities[index]++;
            updateQuantityDisplay(index);
            if (quantities[index] >= 2) {
                addInputs(index);
            }
        } else if (quantities[index] == maxQuantity) {
            alert('Vượt quá số lượng vé');
        }
    }
    function minusQuantity(index) {
        if (index === 0 && quantities[0] === 1) {
            alert('Ít nhất 1 người lớn');
            return false;
        }
        if (quantities[index] > 0) {
            quantities[index]--;
            updateQuantityDisplay(index);
            if (quantities[index] >= 1) {
                removeInputs(index);
                updateQuantityDisplay(index);
            }
        }
    }
    function addInputs(index) {
        var firstGroup = document.querySelector(`.first-group${(index + 1) * 2}`);
        if (!firstGroup) {
            firstGroup = document.createElement("div");
            firstGroup.classList.add(`first-group${(index + 1) * 2}`);
            var form = document.querySelector("form[name='information-nguoilon']");
            form.appendChild(firstGroup);
        }

        var col1 = document.createElement("div");
        col1.classList.add("col-md-5", "col-5");

        var input1 = document.createElement("input");
        input1.type = "text";
        input1.classList.add("form-control");
        input1.placeholder = "Nhập họ và tên";
        input1.classList.add(`ho-ten-${index}`);
        col1.appendChild(input1);

        var col2 = document.createElement("div");
        col2.classList.add("col-md-3", "col-3");

        var select = document.createElement("select");
select.classList.add("form-control");
select.classList.add(`gender-${index}`);

var option1 = document.createElement("option");
option1.value = "";
option1.text = "Chọn giới tính";
select.appendChild(option1);

var option2 = document.createElement("option");
option2.value = "Male";
option2.text = "Nam";
select.appendChild(option2);

var option3 = document.createElement("option");
option3.value = "Female";
option3.text = "Nữ";
select.appendChild(option3);

var option4 = document.createElement("option");
option4.value = "Undefined";
option4.text = "Khác";
select.appendChild(option4);

col2.appendChild(select);

        var col3 = document.createElement("div");
        col3.classList.add("col-md-4", "col-4");

        var input3 = document.createElement("input");
        input3.type = "date";
        input3.classList.add("form-control");
        input3.placeholder = "Nhập ngày sinh";
        input3.classList.add(`ngay-sinh-${index}`);
        col3.appendChild(input3);

        firstGroup.appendChild(col1);
        firstGroup.appendChild(col2);
        firstGroup.appendChild(col3);
    }

    function removeInputs(index) {
        var firstGroup = document.querySelector(`.first-group${(index + 1) * 2}`);
        var col3 = firstGroup.lastElementChild;
        var col2 = col3.previousElementSibling;
        var col1 = col2.previousElementSibling;
        firstGroup.removeChild(col1);
        firstGroup.removeChild(col2);
        firstGroup.removeChild(col3);
    }

    function updateInformationGroup(index) {
        var informationGroup = informationGroups[index];

        if (quantities[index] === 0) {
            informationGroup.style.display = "none";
        } else if (quantities[index] > 0) {
            informationGroup.style.display = "block";
        }
    }
});

