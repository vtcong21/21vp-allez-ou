function logOut() {
  window.location.href = '/auth/logout';
}

async function login() {
  try {
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;
    const response = await axios.post('/auth/login', {
      email: email,
      password: password
    });
    if(response.status===200){
        const redirectUrl = response.data.redirectUrl;
        window.location=redirectUrl;
    }
  } catch (error) {
    console.error('Đã xảy ra lỗi:', error.message);
    alert('Sai email hoặc mật khẩu');
  }
}

const loginButton = document.getElementById('login-btn');
loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  login();
});

