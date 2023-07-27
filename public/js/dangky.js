
// Hàm xóa hết dữ liệu trong localStorage
function clearLocalStorage() {
    localStorage.clear();
  }
  
  // Gọi hàm clearLocalStorage() khi trang web được tải lên
  window.addEventListener('load', clearLocalStorage);
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
<input type="radio" value="male" id="male" name="gender">
<label for="male">Nam</label>
</div>
<div class="form-control-inline">
<input type="radio" value="female" id="female" name="gender">

<label for="female">Nữ</label>
</div>
<div class="form-control-inline">
<input type="radio" value="other" id="other" name="gender">

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
    var btnHomeRegister = document.getElementById("btn-home-register");
    btnHomeRegister.innerHTML = `
<div class="row" id="next1">
    <div class="col-6 text-center">
    <button type="button" class="btn btn-primary2" onclick="loadNewForm3()">Quay lại</button>
    </div>
    <div class="col-6 text-center">
    <button type="button" class="btn btn-primary" onclick="if (validateForm2()) {getinfo(); SaveValues2(); loadNewForm2();  }">Tiếp Theo</button>
    </div>
</div>
`;

}
function getinfo(){ 
    var gender=document.getElementsByName('gender'); 
    var genders=''; 
    for (var i=0;i<gender.length;i++) {
        if(gender[i].checked==true){ 
            genders=gender[i].value;
        }
    }
    console.log(gender);
    console.log(genders);
    localStorage.setItem('gender', genders);

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
    formGroup.classList.add("form-group");
    formGroup.innerHTML = `
<div class="form-group-name" style="text-align: center; margin-left:0">
<label for="confirm-account" id="confirm-account" style="font-family: Montserrat; font-weight: 800; font-size:2.5rem">XÁC THỰC TÀI KHOẢN</label>
    <p style="color: #6E6A8E;">Vui lòng nhập 6 sổ đã được gửi đến</p>
    <div id="cheemail"></div>
    <input type="text" style="margin-top:1em;padding: 0.5em 6em;border-radius: 5.25px; border: 1.5px solid #B9B9B9;" id="confirm-account1">
    <div id="myformrow" class="form-row" style="margin-top:1em" > 
        <div class="col-md-6 col-6" style=" padding:0"  >
            <p id="resend-code" style=" padding:0 " > 
                Vẫn chưa nhận được mã?
            </p>
            </div>
        <div class="col-md-6 col-6" style="text-align: left; padding:0 "> 
            <button type="button" style="border: 0; padding: 0; background-color:#ffffff ;color: #4F6CFF;">Gửi lại mã</button>
        </div> 
    </div>
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
    <button type="submit" class="btn btn-primary">Hoàn tất</button>
</form>
    </div>
</div>
`;
var resendCode = document.getElementById("resend-code");
var confirmaccount = document.getElementById("confirm-account");
var confirmaccount1 = document.getElementById("confirm-account1");
var formrow1 = document.getElementById("myformrow");
    if (window.innerWidth < 576) {
        resendCode.style.marginLeft = "1em";
        confirmaccount.style.fontSize = "2rem"; 
        confirmaccount.style.paddingTop="3em";
        confirmaccount1.style.padding ="0.5em 4.5em";
        formrow1.style.marginLeft="1.2em";
        formrow1.style.paddingBottom="3em";
    } else {
        resendCode.style.marginLeft = "15.73em";
    }

// Lấy giá trị email từ localStorage
let email = localStorage.getItem("email");

let atIndex = email.indexOf("@");
let prefix = email.substring(0, atIndex);
let postfix = email.substring(atIndex);
let maskedEmail = "*".repeat(prefix.length - 4) + prefix.slice(-4) + postfix;

// Gán giá trị email đã được che vào phần tử có id "cheemail"
let cheemailElement = document.getElementById("cheemail");
if (cheemailElement) {
  cheemailElement.innerHTML = maskedEmail;
} else {
  console.error("Cannot find element with id 'cheemail'");
}}
    
    const registerForm = document.getElementById("register-form");

    // registerForm.addEventListener("submit", (e) => {
    //     e.preventDefault();

    //     const name = document.getElementById("name").value;
    //     const email = document.getElementById("email").value;
    //     const password = document.getElementById("pwd").value;
    //     const dob = document.getElementById("dob").value;
    //     const phone = document.getElementById("phone").value;

    //     axios.post("/register", {
    //         name,
    //         email,
    //         password,
    //         dob,
    //         phone,
    //     })
    //     .then((response) => {
    //         console.log(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // });

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

      function SaveValues1(){
        localStorage.setItem("name", document.getElementById("name").value);
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("password", document.getElementById("pwd").value);
      }
      function SaveValues2(){
        localStorage.setItem("dob", document.getElementById("dob").value);
        localStorage.setItem("phone", document.getElementById("phone").value);
      }
      function LoadFormValues1(){ 
        document.getElementById("name").value = localStorage.getItem("name");
        document.getElementById("email").value = localStorage.getItem("email");
        document.getElementById("pwd").value = localStorage.getItem("password");
      }
      function LoadFormValues2(){ 
        document.getElementById("dob").value = localStorage.getItem("dob");
        document.getElementById("phone").value = localStorage.getItem("phone");
    
        // Lấy giá trị của các ô input radio trong localStorage
        var gender = localStorage.getItem("gender");

    // Gán giá trị của các ô input radio tương ứng
    if (gender === "male") {
        document.getElementById("male").checked = true;
    } else if (gender === "female") {
        document.getElementById("female").checked = true;
    } else if (gender === "other") {
        document.getElementById("other").checked = true;
    }
    }

     