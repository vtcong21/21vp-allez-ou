
// const navEl = document.querySelector('.navbar');
// function checkMediaQuery() {
//     const mediaQuery = window.matchMedia('(max-width: 576px)');

//     // Nếu media query khớp
//     if (mediaQuery.matches) {
//       const myElement = document.querySelector('.navbar');
//       myElement.classList.add('navbar-scrolled');
//     }
//   }

//   window.addEventListener('DOMContentLoaded', checkMediaQuery);
//   window.addEventListener('resize', checkMediaQuery);



// window.addEventListener('scroll', () => {
//     if(window.scrollY >= 56 && window.innerWidth >= 576){
//         navEl.classList.add('navbar-scrolled');
//     }
//     else if(window.scrollY < 56 && window.innerWidth >= 576){
//         navEl.classList.remove('navbar-scrolled');
//     }
// });


// login 
function handleLoginResponse(response) {
    const { token, redirectUrl } = response;
    localStorage.setItem('accessToken', token);

    // Chuyển hướng đến trang (url này trong controller)
    window.location.href = redirectUrl;
}

function submitLoginForm() {
    // Ngăn chặn hành vi mặc định của form khi người dùng nhấn nút "ĐĂNG NHẬP"
    event.preventDefault();

    // Lấy dữ liệu từ form
    const email = document.getElementById('register__email').value;
    const password = document.getElementById('register__password').value;

    fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => handleLoginResponse(data))
      .catch(error => console.error('Error during login:', error));
}


