
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
function submitLoginForm() {
    // Ngăn chặn hành vi mặc định của form khi người dùng nhấn nút "ĐĂNG NHẬP"
    event.preventDefault();

    // Lấy dữ liệu từ form
    const email = document.getElementById('register__email').value;
    const password = document.getElementById('register__password').value;

    // Tạo một object chứa dữ liệu để gửi đến server
    const formData = {
        email: email,
        password: password
    };

    // Sử dụng Axios để gửi yêu cầu POST
    axios.post('/auth/login', formData)
        .then(response => {
            // Xử lý phản hồi từ server sau khi POST thành công
            const token = response.data.token;
            console.log('Token:', token);
            localStorage.setItem('token', token);
            // Gọi phương thức GET để render trang chủ sau khi đăng nhập thành công
            axios.get('/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(homeResponse => {
                const user = homeResponse.data;
                const html = document.documentElement;
                html.innerHTML = user;
            })
            .catch(homeError => {
                // Xử lý lỗi nếu có khi GET trang chủ
                console.error('Lỗi khi gọi phương thức GET trang chủ:', homeError);
            });
        })
        .catch(error => {
            // Xử lý lỗi nếu có khi POST đăng nhập
            console.error('Đăng nhập thất bại:', error);
        });
}

// responsive navbar 

