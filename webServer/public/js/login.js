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
    if (response.status === 200) {
      const redirectUrl = response.data.redirectUrl;
      if(redirectUrl === '/')
      {
        location.reload();
      }
      else if(redirectUrl === '/admin')
      {
        window.location = redirectUrl;
      }
    }
  } catch (error) {
    console.error('Đã xảy ra lỗi:', error.message);
    // alert('Sai email hoặc mật khẩu');
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Đăng nhập sai! Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.',
      showCancelButton: true,
      confirmButtonText: 'Nhập lại',
      cancelButtonText: 'Hủy',
      customClass: {
        popup: 'swal2-popup',
        confirmButton: 'swal2-confirm-btn btn p-3',
        actions:'swal2-btn__container ',
        cancelButton: 'btn p-3'
      }
    }).then((result) => {
      if (!result.isConfirmed) {
        $('#loginModal').modal('hide')
      }
    });
  }
}

const loginButton = document.getElementById('login-btn');
loginButton.addEventListener('click', function (event) {
  event.preventDefault();
  login();
});
