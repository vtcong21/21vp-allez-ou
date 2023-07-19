	var quantity = 0;
    var quantityDisplay = 0;
    
document.addEventListener("DOMContentLoaded", function () {
var minusButtons = document.querySelectorAll(".minus-button");
var plusButtons = document.querySelectorAll(".plus-button");
var quantityElements = document.querySelectorAll(".quantity");
var informationNguoiLon = document.querySelector(".information-nguoilon1");
var informationNguoiLonParent = informationNguoiLon.parentNode;
var firstGroup2 = document.querySelector(".first-group2");
var firstGroup2parent = firstGroup2.parentNode;
checkQuantity();
updateQuantityDisplay();
var quantityElements = document.querySelectorAll(".quantity");
quantityElements.forEach(function (element) {
  quantity = parseInt(element.textContent);
  var quantityDisplay = document.querySelector(".quantity-display");
var quantityDisplay2 = document.querySelector(".quantity-display2");
var total = parseInt(quantityDisplay.textContent) + parseInt(quantityDisplay2.textContent);
var totalDiv = document.querySelector(".total5");
});



checkQuantity();

function minusQuantity(event) {
var quantityElement = event.target.closest(".input-group").querySelector(".quantity");
if (quantity > 0) {
quantity--;
quantityElement.textContent = quantity;
console.log(quantity);
}
checkQuantity();
minusInputs();
updateQuantityDisplay();
}

function plusQuantity(event) {
var quantityElement = event.target.closest(".input-group").querySelector(".quantity");
quantity++;
quantityElement.textContent = quantity;
console.log(quantity);
if(quantity>=2) {
addInputs();
}
checkQuantity();
updateQuantityDisplay();
}

function checkQuantity() {
if (quantity === 0 && informationNguoiLonParent && informationNguoiLonParent.contains(informationNguoiLon)) {
informationNguoiLonParent.removeChild(informationNguoiLon);
} else if (quantity > 0 && informationNguoiLonParent && !informationNguoiLonParent.contains(informationNguoiLon)) {
informationNguoiLonParent.appendChild(informationNguoiLon);
updateQuantityDisplay();
}
}

function minusInputs() {
    if(quantity>=1){ 
        var col3 = firstGroup2.lastElementChild;
var col2 = col3.previousElementSibling;
var col1 = col2.previousElementSibling;
firstGroup2.removeChild(col1);
firstGroup2.removeChild(col2);
firstGroup2.removeChild(col3);
updateQuantityDisplay();
    }

}

function addInputs() {
// Tạo một div mới có class first-group2 nếu nó chưa tồn tại trong cây DOM
if (!firstGroup2) {
firstGroup2 = document.createElement("div");
firstGroup2.classList.add("first-group2");
var form = document.querySelector("form[name='information-nguoilon']");
form.appendChild(firstGroup2);
}

var col1 = document.createElement("div");
col1.classList.add("col-md-5", "col-5");

var input1 = document.createElement("input");
input1.type = "text";
input1.classList.add("form-control");
input1.placeholder = "Nhập họ và tên";
input1.id = "ho-ten-" + quantity;
col1.appendChild(input1);

var col2 = document.createElement("div");
col2.classList.add("col-md-3", "col-3");

var input2 = document.createElement("input");
input2.type = "text";
input2.classList.add("form-control");
input2.placeholder = "Nhập giới tính";
input2.id = "gender-" + quantity;
col2.appendChild(input2);

var col3 = document.createElement("div");
col3.classList.add("col-md-4","col-4");

var input3 = document.createElement("input");
input3.type = "date";
input3.classList.add("form-control");
input3.placeholder = "Nhập ngày sinh";
input3.id = "ngay-sinh-" + quantity;
col3.appendChild(input3);

firstGroup2.appendChild(col1);
firstGroup2.appendChild(col2);
firstGroup2.appendChild(col3);
}
minusButtons.forEach(function (minusButton) {
minusButton.addEventListener("click", minusQuantity);
});

plusButtons.forEach(function (plusButton) {
plusButton.addEventListener("click", plusQuantity);
});
function updateQuantityDisplay() {
  var quantityDisplay = document.querySelector(".quantity-display"); // Lấy phần tử HTML đầu tiên có class là "quantity-display"
    quantityDisplay.textContent = quantity;
    var quantityDisplay = document.querySelector(".quantity-display");
var quantityDisplay2 = document.querySelector(".quantity-display2");
var quantityDisplay3 = document.querySelector(".quantity-display3"); 
var quantityDisplay4 = document.querySelector(".quantity-display4");

 var total = parseInt(quantityDisplay.textContent) + parseInt(quantityDisplay2.textContent) + parseInt(quantityDisplay3.textContent) + parseInt(quantityDisplay4.textContent);
var totalDiv = document.querySelector(".total5");
totalDiv.textContent = total;
}
});
                var quantity2 = 0;
                document.addEventListener("DOMContentLoaded", function () {
                var minusButtons2 = document.querySelectorAll(".minus-button2");
                var plusButtons2 = document.querySelectorAll(".plus-button2");
                var quantityElements2 = document.querySelectorAll(".quantity2");
                var informationNguoiLon2 = document.querySelector(".information-nguoilon2");
                var informationNguoiLonParent2 = informationNguoiLon2.parentNode;
                var firstGroup4 = document.querySelector(".first-group4");
                var firstGroup4parent = firstGroup4.parentNode;
                checkQuantity2();

quantityElements2.forEach(function (element2) {
quantity2 = parseInt(element2.textContent);
});
checkQuantity2();

                function minusQuantity2(event) {
                    var quantityElement2 = event.target.closest(".input-group").querySelector(".quantity2");
                    if (quantity2 > 0) {
                    quantity2--;
                    quantityElement2.textContent = quantity2;
                    console.log(quantity2);
                    }
                    checkQuantity2();
                    minusInputs2();
                    updateQuantityDisplay2();
                }

                function plusQuantity2(event) {
                    var quantityElement2 = event.target.closest(".input-group").querySelector(".quantity2");
                    quantity2++;
                    quantityElement2.textContent = quantity2;
                    console.log(quantity2);
                    if(quantity2>=2) {
                            addInputs2();
                            }
                            checkQuantity2();
                            updateQuantityDisplay2();
                }
                function checkQuantity2() {
if (quantity2 === 0 && informationNguoiLonParent2 && informationNguoiLonParent2.contains(informationNguoiLon2)) {
informationNguoiLonParent2.removeChild(informationNguoiLon2);
} else if (quantity2 > 0 && informationNguoiLonParent2 && !informationNguoiLonParent2.contains(informationNguoiLon2)) {
informationNguoiLonParent2.appendChild(informationNguoiLon2);

}
}

function minusInputs2() {
    if(quantity2>=1) { 
        var col3 = firstGroup4.lastElementChild;
var col2 = col3.previousElementSibling;
var col1 = col2.previousElementSibling;
firstGroup4.removeChild(col1);
firstGroup4.removeChild(col2);
firstGroup4.removeChild(col3);
    }

}
function addInputs2() {
// Tạo một div mới có class first-group2 nếu nó chưa tồn tại trong cây DOM
if (!firstGroup4) {
firstGroup4  = document.createElement("div");
firstGroup4.classList.add("first-group4");
var form = document.querySelector("form[name='information-nguoilon']");
form.appendChild(firstGroup4);
}

var col1 = document.createElement("div");
col1.classList.add("col-md-5");

var input1 = document.createElement("input");
input1.type = "text";
input1.classList.add("form-control");
input1.placeholder = "Nhập họ và tên";
input1.id = "ho-ten-" + quantity;
col1.appendChild(input1);

var col2 = document.createElement("div");
col2.classList.add("col-md-3");

var input2 = document.createElement("input");
input2.type = "text";
input2.classList.add("form-control");
input2.placeholder = "Nhập giới tính";
input2.id = "gender-" + quantity;
col2.appendChild(input2);

var col3 = document.createElement("div");
col3.classList.add("col-md-4");

var input3 = document.createElement("input");
input3.type = "date";
input3.classList.add("form-control");
input3.placeholder = "Nhập ngày sinh";
input3.id = "ngay-sinh-" + quantity;
col3.appendChild(input3);

firstGroup4.appendChild(col1);
firstGroup4.appendChild(col2);
firstGroup4.appendChild(col3);
}
                
                minusButtons2.forEach(function (minusButton2) {
                    minusButton2.addEventListener("click", minusQuantity2);
                });

                plusButtons2.forEach(function (plusButton2) {
                    plusButton2.addEventListener("click", plusQuantity2);
                });
                function updateQuantityDisplay2() {
  var quantityDisplay2 = document.querySelector(".quantity-display2"); // Lấy phần tử HTML đầu tiên có class là "quantity-display"
    quantityDisplay2.textContent = quantity2;
    var quantityDisplay = document.querySelector(".quantity-display");
var quantityDisplay2 = document.querySelector(".quantity-display2");
var quantityDisplay3 = document.querySelector(".quantity-display3"); 
var quantityDisplay4 = document.querySelector(".quantity-display4");

 var total = parseInt(quantityDisplay.textContent) + parseInt(quantityDisplay2.textContent) + parseInt(quantityDisplay3.textContent) + parseInt(quantityDisplay4.textContent);
var totalDiv = document.querySelector(".total5");
totalDiv.textContent = total;
}
            });

            var quantity3 = 0;
                document.addEventListener("DOMContentLoaded", function () {
                var minusButtons3 = document.querySelectorAll(".minus-button3");
                var plusButtons3 = document.querySelectorAll(".plus-button3");
                var quantityElements3 = document.querySelectorAll(".quantity3");
                var informationNguoiLon3 = document.querySelector(".information-nguoilon3");
                var informationNguoiLonParent3 = informationNguoiLon3.parentNode;
                var firstGroup6 = document.querySelector(".first-group6");
                var firstGroup6parent = firstGroup6.parentNode;
                checkQuantity3();

quantityElements3.forEach(function (element3) {
quantity3 = parseInt(element3.textContent);
});
checkQuantity3();
function updateQuantityDisplay3() {
  var quantityDisplay3 = document.querySelector(".quantity-display3"); // Lấy phần tử HTML đầu tiên có class là "quantity-display"
    quantityDisplay3.textContent = quantity3;
    var quantityDisplay = document.querySelector(".quantity-display");
var quantityDisplay2 = document.querySelector(".quantity-display2");
var quantityDisplay3 = document.querySelector(".quantity-display3"); 
var quantityDisplay4 = document.querySelector(".quantity-display4");

 var total = parseInt(quantityDisplay.textContent) + parseInt(quantityDisplay2.textContent) + parseInt(quantityDisplay3.textContent) + parseInt(quantityDisplay4.textContent);
var totalDiv = document.querySelector(".total5");
totalDiv.textContent = total;
}

                function minusQuantity3(event) {
                    var quantityElement3 = event.target.closest(".input-group").querySelector(".quantity3");
                    if (quantity3 > 0) {
                    quantity3--;
                    quantityElement3.textContent = quantity3;
                    console.log(quantity3);
                    }
                    checkQuantity3();
                    minusInputs3();
                    updateQuantityDisplay3();
                }

                function plusQuantity3(event) {
                    var quantityElement3 = event.target.closest(".input-group").querySelector(".quantity3");
                    quantity3++;
                    quantityElement3.textContent = quantity3;
                    console.log(quantity3);
                    if(quantity3>=2) {
                            addInputs3();
                            }
                            updateQuantityDisplay3();
                            checkQuantity3();
                }
                function checkQuantity3() {
if (quantity3 === 0 && informationNguoiLonParent3 && informationNguoiLonParent3.contains(informationNguoiLon3)) {
informationNguoiLonParent3.removeChild(informationNguoiLon3);
} else if (quantity3 > 0 && informationNguoiLonParent3 && !informationNguoiLonParent3.contains(informationNguoiLon3)) {
informationNguoiLonParent3.appendChild(informationNguoiLon3);

}
}

function minusInputs3() {
if(quantity3>=1){ 
    var col3 = firstGroup6.lastElementChild;
var col2 = col3.previousElementSibling;
var col1 = col2.previousElementSibling;
firstGroup6.removeChild(col1);
firstGroup6.removeChild(col2);
firstGroup6.removeChild(col3);
}
}
function addInputs3() {
// Tạo một div mới có class first-group3 nếu nó chưa tồn tại trong cây DOM
if (!firstGroup6) {
firstGroup6  = document.createElement("div");
firstGroup6.classList.add("first-group6");
var form = document.querySelector("form[name='information-nguoilon']");
form.appendChild(firstGroup6);
}

var col1 = document.createElement("div");
col1.classList.add("col-md-5");

var input1 = document.createElement("input");
input1.type = "text";
input1.classList.add("form-control");
input1.placeholder = "Nhập họ và tên";
input1.id = "ho-ten-" + quantity;
col1.appendChild(input1);

var col2 = document.createElement("div");
col2.classList.add("col-md-3");

var input2 = document.createElement("input");
input2.type = "text";
input2.classList.add("form-control");
input2.placeholder = "Nhập giới tính";
input2.id = "gender-" + quantity;
col2.appendChild(input2);

var col3 = document.createElement("div");
col3.classList.add("col-md-4");

var input3 = document.createElement("input");
input3.type = "date";
input3.classList.add("form-control");
input3.placeholder = "Nhập ngày sinh";
input3.id = "ngay-sinh-" + quantity;
col3.appendChild(input3);

firstGroup6.appendChild(col1);
firstGroup6.appendChild(col2);
firstGroup6.appendChild(col3);
}
                
                minusButtons3.forEach(function (minusButton3) {
                    minusButton3.addEventListener("click", minusQuantity3);
                });

                plusButtons3.forEach(function (plusButton3) {
                    plusButton3.addEventListener("click", plusQuantity3);
                });
            });
            var quantity4 = 0;
                document.addEventListener("DOMContentLoaded", function () {
                var minusButtons4 = document.querySelectorAll(".minus-button4");
                var plusButtons4 = document.querySelectorAll(".plus-button4");
                var quantityElements4 = document.querySelectorAll(".quantity4");
                var informationNguoiLon4 = document.querySelector(".information-nguoilon4");
                var informationNguoiLonParent4 = informationNguoiLon4.parentNode;
                var firstGroup8 = document.querySelector(".first-group8");
                var firstGroup8parent = firstGroup8.parentNode;
                checkQuantity4();
                function updateQuantityDisplay4() {
  var quantityDisplay4 = document.querySelector(".quantity-display4"); // Lấy phần tử HTML đầu tiên có class là "quantity-display"
    quantityDisplay4.textContent = quantity4;
    var quantityDisplay = document.querySelector(".quantity-display");
var quantityDisplay2 = document.querySelector(".quantity-display2");
var quantityDisplay3 = document.querySelector(".quantity-display3"); 
var quantityDisplay4 = document.querySelector(".quantity-display4");

 var total = parseInt(quantityDisplay.textContent) + parseInt(quantityDisplay2.textContent) + parseInt(quantityDisplay3.textContent) + parseInt(quantityDisplay4.textContent);
var totalDiv = document.querySelector(".total5");
totalDiv.textContent = total;
}

quantityElements4.forEach(function (element4) {
quantity4 = parseInt(element4.textContent);
});
checkQuantity4();

                function minusQuantity4(event) {
                    var quantityElement4 = event.target.closest(".input-group").querySelector(".quantity4");
                    if (quantity4 > 0) {
                    quantity4--;
                    quantityElement4.textContent = quantity4;
                    console.log(quantity4);
                    }
                    checkQuantity4();
                    minusInputs4();
                    updateQuantityDisplay4();
                }

                function plusQuantity4(event) {
                    var quantityElement4 = event.target.closest(".input-group").querySelector(".quantity4");
                    quantity4++;
                    quantityElement4.textContent = quantity4;
                    console.log(quantity4);
                    if(quantity4>=2) {
                            addInputs4();
                            }
                            updateQuantityDisplay4();
                            checkQuantity4();
                }
                function checkQuantity4() {
if (quantity4 === 0 && informationNguoiLonParent4 && informationNguoiLonParent4.contains(informationNguoiLon4)) {
informationNguoiLonParent4.removeChild(informationNguoiLon4);
} else if (quantity4 > 0 && informationNguoiLonParent4 && !informationNguoiLonParent4.contains(informationNguoiLon4)) {
informationNguoiLonParent4.appendChild(informationNguoiLon4);

}
}

function minusInputs4() {
if(quantity4>=1){ 
    var col3 = firstGroup8.lastElementChild;
var col2 = col3.previousElementSibling;
var col1 = col2.previousElementSibling;
firstGroup8.removeChild(col1);
firstGroup8.removeChild(col2);
firstGroup8.removeChild(col3);
}
}
function addInputs4() {
// Tạo một div mới có class first-group4 nếu nó chưa tồn tại trong cây DOM
if (!firstGroup8) {
firstGroup8  = document.createElement("div");
firstGroup8.classList.add("first-group8");
var form = document.querySelector("form[name='information-nguoilon']");
form.appendChild(firstGroup8);
}

var col1 = document.createElement("div");
col1.classList.add("col-md-5");

var input1 = document.createElement("input");
input1.type = "text";
input1.classList.add("form-control");
input1.placeholder = "Nhập họ và tên";
input1.id = "ho-ten-" + quantity;
col1.appendChild(input1);

var col2 = document.createElement("div");
col2.classList.add("col-md-3");

var input2 = document.createElement("input");
input2.type = "text";
input2.classList.add("form-control");
input2.placeholder = "Nhập giới tính";
input2.id = "gender-" + quantity;
col2.appendChild(input2);

var col3 = document.createElement("div");
col3.classList.add("col-md-4");

var input3 = document.createElement("input");
input3.type = "date";
input3.classList.add("form-control");
input3.placeholder = "Nhập ngày sinh";
input3.id = "ngay-sinh-" + quantity;
col3.appendChild(input3);

firstGroup8.appendChild(col1);
firstGroup8.appendChild(col2);
firstGroup8.appendChild(col3);
}
                
                minusButtons4.forEach(function (minusButton4) {
                    minusButton4.addEventListener("click", minusQuantity4);
                });

                plusButtons4.forEach(function (plusButton4) {
                    plusButton4.addEventListener("click", plusQuantity4);
                });
            });
            document.addEventListener('DOMContentLoaded', function() {
              const orderButton = document.getElementById('button-order-btn');
              console.log(orderButton); // Kiểm tra xem orderButton có tồn tại và là một phần tử HTML hợp lệ không
            
              if (orderButton) {
                orderButton.onclick = () => {
                  const hoTenInput = document.getElementById('ho-ten');
                  const soDienThoaiInput = document.getElementById('so-dien-thoai');
                  const diaChiInput = document.getElementById('dia-chi');
                  const emailInput = document.getElementById('email');
                  const genderInput = document.getElementById('gender'); 
                  const hoten1Input = document.getElementById('ho-ten1'); 
                  const ngaysinhInput = document.getElementById('ngay-sinh'); 

                  const soDienThoaiPattern = /^0\d{9}$/; 
                  const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; // Biểu thức chính quy để kiểm tra email
                   if (!hoTenInput.value || !soDienThoaiInput.value || !diaChiInput.value || !emailInput.value || !genderInput.value ||
                    !hoten1Input.value||!ngaysinhInput.value) {
                    alert('Vui lòng điền đầy đủ thông tin!');
                  }
                  else if (!soDienThoaiInput.value.match(soDienThoaiPattern)) {
                    alert('Số điện thoại không hợp lệ. Vui lòng nhập lại số điện thoại đúng định dạng!');
                  } 
                  else if (!emailInput.value.match(emailPattern)) {
                    alert('Email không hợp lệ. Vui lòng nhập lại email đúng định dạng!');
                  }
                };
              }
            });