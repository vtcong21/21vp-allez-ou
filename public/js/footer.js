document.addEventListener('DOMContentLoaded', function() {
    var scrollpos = window.scrollY;
    var backBtn = document.querySelector('.back-top');

    if (backBtn) {
        var add_class_on_scroll = () => backBtn.classList.add("back-top-show");
        var remove_class_on_scroll = () => backBtn.classList.remove("back-top-show");

        window.addEventListener('scroll', function () {
            scrollpos = window.scrollY;
            if (scrollpos >= 800) {
                add_class_on_scroll();
            } else {
                remove_class_on_scroll();
            }
        });

        backBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });
    }
});

function copyClipboard(type) {

    if(type == 1) {
        navigator.clipboard.writeText("0123456789");
        alert("Đã copy số điện thoại 0123456789 vào clipboard");
    }
    else {
        navigator.clipboard.writeText("allezou21vp@gmail.com");
        alert("Đã copy email allezou21vp@gmail.com vào clipboard");
    }
}