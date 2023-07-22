function loadNewForm3() {
    // Xóa nội dung phần tử "personal-info"
    var personal = document.getElementById("personal-info");
    personal.innerHTML = "";

    // Tạo các phần tử input và label cho biểu mẫu
    var personalInfoDiv = document.getElementById("personal-info"); 
    var formGroup = document.createElement("div"); 
    formGroup.classList.add("form-group"); 

    formGroup.innerHTML = `
        <div class="form-group-name">
            <label for="name">Họ và Tên:</label>
            <input type="name" class="form-control" id="name" placeholder="Nhập tên" />
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="Nhập email" />
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="pwd">Mật khẩu:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Nhập mật khẩu" />
            </div>
            <div class="form-group col-md-6 pwd-confirm-wrapper">
                <label for="pwd_confirm" style="margin-left: 10%;">Xác nhận mật khẩu:</label>
                <input type="password" class="form-control" id="pwd_confirm" placeholder="Xác nhận mật khẩu" style="margin-left: 10%;" />
            </div>
        </div>
    `;

    personalInfoDiv.appendChild(formGroup);

    // Gọi hàm LoadFormValues1() để tải dữ liệu đã lưu lên các phần tử input
    LoadFormValues1();

    // Thiết lập giá trị cho các phần tử input
    document.getElementById("name").value = localStorage.getItem("name");
    document.getElementById("email").value = localStorage.getItem("email");
    document.getElementById("pwd").value = localStorage.getItem("password");

    // Thiết lập giá trị cho nút "Tiếp Theo"
    var btnHomeRegister = document.getElementById("btn-home-register");
    btnHomeRegister.innerHTML = `
        <div class="row">
            <div class="col-6 text-center">
            </div>
            <div class="col-6 text-center">
                <button type="button" class="btn btn-primary" onclick="if (validateForm()) { SaveValues1(); loadNewForm(); }">Tiếp Theo</button>
            </div>
        </div>
    `;

    // Thiết lập kiểu hiển thị cho các tab
    document.getElementById("register").style.backgroundColor="#4b60ce";
    document.getElementById("register").style.fontWeight="900";
    document.getElementById("info").style.backgroundColor="#dadada";
    document.getElementById("info").style.fontWeight="normal";
    document.getElementById("bank-link").style.backgroundColor="#dadada";
    document.getElementById("bank-link").style.fontWeight="normal";
}
function loadNewForm() {
    console.log("Hàm loadNewForm() đã được gọi.");

    var personalInfoDiv = document.getElementById("personal-info");
    personalInfoDiv.innerHTML = "";
    document.getElementById("register").style.fontWeight = "normal";
    document.getElementById("register").style.backgroundColor = "#dadada"
    document.getElementById("info").style.fontWeight = "900";
    document.getElementById("info").style.backgroundColor = "#4b60ce"; 
    document.getElementById("bank-link").style.backgroundColor="#dadada"
   
    var formGroup = document.createElement("div");
    formGroup.classList.add("form-group-name");
    formGroup.innerHTML = `
    
        <div class="form-group-name" style="margin-left:0;padding-bottom:1.5em">
<div class="form-control-row">
<label for="gender">Giới tính:</label>
</div>
<div class="form-control-row">
<div class="form-control-inline">
<input type="radio" id="male" name="gender">
<label for="male">Nam</label>
</div>
<div class="form-control-inline">
<input type="radio" id="female" name="gender">

<label for="female">Nữ</label>
</div>
<div class="form-control-inline">
<input type="radio" id="other" name="gender">

<label for="other">Không muốn tiết lộ</label>
        </div>
    </div>
    <label for="dob">Ngày sinh:</label>
    <input type="date" class="form-control" id="dob" placeholder="Nhập ngày sinh" />
    <label for="phone">Số điện thoại:</label>
    <input type="tel" class="form-control" id="phone" placeholder="Nhập số điện thoại" />
</div>
`;
    personalInfoDiv.appendChild(formGroup);
    LoadFormValues2();
        document.getElementById("dob").value = localStorage.getItem("dob");
        document.getElementById("phone").value = localStorage.getItem("phone");
        var genderInput = document.querySelector(`input[name="gender"][value="${localStorage.getItem("gender")}"]`);
if (genderInput) {
    genderInput.checked = true;
}
    var btnHomeRegister = document.getElementById("btn-home-register");
    btnHomeRegister.innerHTML = `
<div class="row" id="next1">
    <div class="col-6 text-center">
    <button type="button" class="btn btn-primary2" onclick="loadNewForm3()">Quay lại</button>
    </div>
    <div class="col-6 text-center">
    <button type="button" class="btn btn-primary" onclick="if (validateForm2()) { SaveValues2(); loadNewForm2(); }">Tiếp Theo</button>
    </div>
</div>
`;
}


function loadNewForm2() {
    
    var personalInfoDiv = document.getElementById("personal-info");
    personalInfoDiv.innerHTML = "";
    var formGroup = document.createElement("div");
    document.getElementById("register").style.fontWeight = "normal";
    document.getElementById("register").style.backgroundColor = "#dadada"
    document.getElementById("info").style.backgroundColor = "#dadada"; 
    document.getElementById("info").style.fontWeight = "normal";
    document.getElementById("bank-link").style.backgroundColor="#4b60ce"
    document.getElementById("bank-link").style.fontWeight="900";   
    formGroup.classList.add("form-group-name");
    formGroup.innerHTML = `
<div class="form-group-name" style="margin-left:0;padding-bottom:1.5em">
<div>
<label for="bank">Chọn ngân hàng:</label>
</div>
<div>
<select class="select" id="bank" >
<option value="ACB">Ngân hàng ACB</option>
<option value="VCB">Ngân hàng Vietcombank</option>
<option value="MB">Ngân hàng MBBank</option>
<option value="Techcom">Ngân hàng Techcombank</option>
</select>
</div>
<label for="account_number">Số tài khoản:</label>
<input type="text" class="form-control" id="account_number" placeholder="Nhập số tài khoản" />
<label for="account_name">Tên chủ tài khoản:</label>
<input type="text" class="form-control" id="account_name" placeholder="Nhập tên chủ tài khoản" />
`;
    personalInfoDiv.appendChild(formGroup);
    var btnHomeRegister = document.getElementById("btn-home-register");
    btnHomeRegister.innerHTML = `
<div class="row" id="next2">
    <div class="col-6 text-center">
        <button type="button" class="btn btn-primary2" onclick="loadNewForm()">Quay lại</button>
    </div>
    <div class="col-6 text-center">
    <form id="register-form" action="/register" method="post">
    <button type="submit" class="btn btn-primary">Đăng ký</button>
</form>
    </div>
</div>
`;
}
    
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("pwd").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const dob = document.getElementById("dob").value;
        const phone = document.getElementById("phone").value;
        const bank = document.getElementById("bank").value;
        const accountNumber = document.getElementById("account_number").value;
        const accountName = document.getElementById("account_name").value;

        axios.post("/register", {
            name,
            email,
            password,
            gender,
            dob,
            phone,
            bank,
            accountNumber,
            accountName,
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    });

    function validateForm() {
        var nameField = document.getElementById("name");
        if (nameField.value == "") {
          alert("Vui lòng nhập họ và tên!");
          return false;
        }
      
        var emailField = document.getElementById("email");
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          alert("Địa chỉ email không hợp lệ!");
          return false;
        }
      
        var passwordField = document.getElementById("pwd");
        if (passwordField.value == "") {
          alert("Vui lòng nhập mật khẩu!");
          return false;
        }
      
        var passwordConfirmField = document.getElementById("pwd_confirm");
        if (passwordField.value != passwordConfirmField.value) {
          alert("Xác nhận mật khẩu không khớp!");
          return false;
        }
            return true;
      }
      function validateForm2() {
        var genderInputs = document.querySelectorAll('input[name="gender"]');
        var genderChecked = false;
        for (var i = 0; i < genderInputs.length; i++) {
            if (genderInputs[i].checked) {
                genderChecked = true;
                break;
            }
        }
        if (!genderChecked) {
            alert("Vui lòng chọn giới tính!");
            return false;
        }
        var dobInput = document.getElementById("dob");
        if (dobInput.value === "") {
            alert("Vui lòng nhập ngày sinh!");
            return false;
        }
        var phoneInput = document.getElementById("phone");
        var phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            alert("Vui lòng nhập số điện thoại đúng định dạng (10 số)!");
            return false;
        }
        return true;
    }
    function validateForm3() {
        var accountNumberInput = document.getElementById("account_number");
        var accountNameInput = document.getElementById("account_name");
        if (accountNumberInput.value === "" || accountNameInput.value === "") {
            alert("Vui lòng điền đầy đủ thông tin số tài khoản và tên chủ tài khoản!");
            return false;
        }
        return true;
    }
    document.getElementById("register-form").addEventListener("submit", function(event) {
        if (!validateForm3()) {
            event.preventDefault(); 
            alert("Vui lòng nhập đầy đủ thông tin!"); 
        } else {
            document.getElementById("register-form").submit(); 
        }
    });

      function SaveValues1(){
        localStorage.setItem("name", document.getElementById("name").value);
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("password", document.getElementById("pwd").value);
      }
      function SaveValues2(){
        localStorage.setItem("gender", document.querySelector('input[name="gender"]:checked').value);
        localStorage.setItem("dob", document.getElementById("dob").value);
        localStorage.setItem("phone", document.getElementById("phone").value);
      }
      function LoadFormValues1(){ 
        document.getElementById("name").value = localStorage.getItem("name");
        document.getElementById("email").value = localStorage.getItem("email");
        document.getElementById("pwd").value = localStorage.getItem("password");
      }
      function LoadFormValues2(){
        var genderInput = document.querySelector(`input[name="gender"][value="${localStorage.getItem("gender")}"]`);
        if (genderInput) {
            genderInput.checked = true;
        }        
        document.getElementById("dob").value = localStorage.getItem("dob");
        document.getElementById("phone").value = localStorage.getItem("phone");
      }
      function SaveValues3(){ 
        localStorage.setItem("bank", document.getElementById("bank").value);
        localStorage.setItem("accountNumber", document.getElementById("account_number").value);
        localStorage.setItem("accountName", document.getElementById("account_name").value);
      }
      function LoadFormValues3(){
        document.getElementById("bank").value = localStorage.getItem("bank");
        document.getElementById("account_number").value = localStorage.getItem("accountNumber");
        document.getElementById("account_name").value = localStorage.getItem("accountName");
      }
     