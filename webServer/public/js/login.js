function logOut() {
  window.location.href = '/auth/logout';
}

function removeErrorNotify(){
  const emptyEmail = document.getElementById('emptyEmail');
    const emptyPwd = document.getElementById('emptyPwd');

    emptyEmail.classList.add('d-none');
    emptyPwd.classList.add('d-none');
}

async function login() {
  try {
    const email = document.getElementsByName('email')[0].value;
    const password = document.getElementsByName('password')[0].value;

    const emptyEmail = document.getElementById('emptyEmail');
    const emptyPwd = document.getElementById('emptyPwd');

    // Ẩn thông bá lỗi trước khi kiểm tra
    emptyEmail.classList.add('d-none');
    emptyPwd.classList.add('d-none');
    let flag = true;

    // Kiểm tra xem email và password có trống hay không
    if (email.trim() === '') {
      emptyEmail.classList.remove('d-none');
      flag = false;
    }
    if (password.trim() === '') {
      emptyPwd.classList.remove('d-none');
      flag = false;
    }
    // console.log(false);
    if (flag == false){
      return;
    }
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

async function sendBalanceToEmail(){
  try {
    Swal.showLoading();
    const response = await axios.get('/user/getBalanceEmail');
    Swal.close();
        await Swal.fire({
            icon: "success",
            title: "Đã gửi thành công",
            customClass: {
                popup: "swal2-popup",
                confirmButton: "swal2-confirm-btn btn p-3",
            },
    });
  } catch (error) {
    console.error('Đã xảy ra lỗi:', error.message);
    await Swal.fire({
      icon: "error",
      title: "Error!",
      showCancelButton: true,
      confirmButtonText: "Gửi lại",
      cancelButtonText: "Hủy",
      customClass: {
          popup: "swal2-popup",
          confirmButton: "swal2-confirm-btn btn p-3",
          actions: "swal2-btn__container ",
          cancelButton: "btn p-3",
      },
  }).then((result) => {
      if (result.isConfirmed) {
          sendBalanceToEmail();
      }
  });
  }
}