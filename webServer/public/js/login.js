function logOut(){
    window.location.href = '/auth/logout';
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
 