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





