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


// login 

const loginButton = document.getElementById('login__button');

function getInfoLogin()
{
    const email = document.getElementById('login__email').value;
    const pwd = document.getElementById('login__password').value;
    console.log(email, pwd);
}

