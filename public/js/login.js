function logOut(){
    window.location.href = '/auth/logout';
 }
 
 function submitLoginForm() {
   const form = document.getElementById("loginForm");
   const formData = new FormData(form);
 
   fetch("/auth/login", {
       method: "POST",
       body: formData,
       credentials: "same-origin" // Đảm bảo gửi cookie nếu có
   })
   .then(response => {
       if (response.ok) {
           // Xử lý thành công nếu server trả về mã HTTP 200-299
           console.log("Đăng nhập thành công!");
           // Thực hiện các hành động sau khi đăng nhập thành công, ví dụ: lưu token vào Local Storage, chuyển hướng trang, v.v.
       } else if (response.status === 400) {
           // Xử lý khi người dùng nhập sai mật khẩu
           console.error("Sai mật khẩu. Vui lòng nhập lại.");
           // Hiển thị thông báo lỗi cho người dùng hoặc thực hiện các hành động cần thiết
       } else {
           console.error("Lỗi khi đăng nhập:", response.statusText);
           // Xử lý các trạng thái lỗi khác nếu có
       }
   })
   .catch(error => {
       console.error("Lỗi khi gửi yêu cầu đăng nhập:", error);
   });
 }
 
 function handleLoginResponse(response) {
  if (response && response.redirectUrl) {
    const { redirectUrl } = response;
    // Chuyển hướng đến trang (url này trong controller)
    window.location.href = redirectUrl;
  } else {
    // Xử lý khi không có đối tượng response hoặc không có thuộc tính redirectUrl
    // Ví dụ:
    alert('Có lỗi trong quá trình đăng nhập hoặc không có đường dẫn chuyển hướng.');
  }
}

//  function handleLoginResponse(response) {
//    const { redirectUrl } = response;
//    // Chuyển hướng đến trang (url này trong controller)
//    window.location.href = redirectUrl;
//  }
 
 function login() {
   const email = document.getElementsByName('email')[0].value;
   const password = document.getElementsByName('password')[0].value;
   fetch('/auth/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ email, password })
   })
   .then(response => {
     if (response.status === 400) {
       return response.json().then(data => {
         alert('Sai email hoặc mật khẩu');
       });
     } 
     else {
       return response.json();
     }
   })
   .then(data => handleLoginResponse(data))
   .catch(error => console.error('Error during login:', error));
 }
 
 const loginButton = document.getElementById('login-btn');
 loginButton.addEventListener('click', function(event) {
  console.log('done');
   event.preventDefault(); 
   login();
 });
 