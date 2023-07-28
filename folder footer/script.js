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
