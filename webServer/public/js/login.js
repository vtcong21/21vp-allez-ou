function logOut() {
  window.location.href = '/auth/logout';
}


//  function handleLoginResponse(response) {
//   if (response && response.redirectUrl) {
//     const { redirectUrl } = response;
//     // Chuyển hướng đến trang (url này trong controller)
//     window.location.href = redirectUrl;
//   } else {
//     // Xử lý khi không có đối tượng response hoặc không có thuộc tính redirectUrl
//     // Ví dụ:
//     alert('Có lỗi trong quá trình đăng nhập hoặc không có đường dẫn chuyển hướng.');
//   }
// }

//  function login() {
//    const email = document.getElementsByName('email')[0].value;
//    const password = document.getElementsByName('password')[0].value;
//    fetch('/auth/login', {
//      method: 'POST',
//      headers: {
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({ email, password })
//    })
//    .then(response => {
//      if (response.status === 400) {
//        return response.json().then(data => {
//          alert('Sai email hoặc mật khẩu');
//        });
//      } 
//      else {
//        return response.json();
//      }
//    })
//    .then(data => handleLoginResponse(data))
//    .catch(error => console.error('Error during login:', error));
//  }


async function login() {
  try {
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;
    const response = await axios.post('/auth/login', {
      email: email,
      password: password
    })
   
    if (response.status === 200) {
      
      window.location.reload();
    }



  } catch (error) {
    console.error('Đã xảy ra lỗi:', error.message);
  }
}

const loginButton = document.getElementById('login-btn');
loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  login();
});

