const navEl = document.querySelector('.navbar');
window.addEventListener('resize',() =>{
    if(window.innerWidth < 576)
    {
        navEl.classList.add('navbar-scrolled')
    }
});

window.addEventListener('scroll', () => {
    if(window.scrollY >= 56 && window.innerWidth >= 576){
        navEl.classList.add('navbar-scrolled')
    }
    else if(window.scrollY < 56 && window.innerWidth >= 576){
        navEl.classList.remove('navbar-scrolled')
    }
});

//Get tour

// Lắng nghe sự kiện click trên thẻ a
const links = document.querySelectorAll('.card-text__link');
links.forEach(link => {
  link.addEventListener('click', async (event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a

    const code = link.dataset.value; // Giá trị code bạn muốn truyền

    axios.get(`/tours/${code}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
  });
});



