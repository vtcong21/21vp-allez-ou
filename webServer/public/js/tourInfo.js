// Accordion
const accordionItems = document.querySelectorAll('.accordion-item');
let activeAccordion = null;

accordionItems.forEach(accordionItem => {
  const accordionButton = accordionItem.querySelector('.accordion-button');
  const accordionCollapsed = accordionButton.classList.contains('collapsed');
  
  if (!accordionCollapsed) {
    accordionItem.style.borderLeft = '0.35rem solid #F14868';
    accordionItem.classList.add('hide-before'); // Thêm lớp 'hide-before' vào accordion-item
  }

  accordionButton.addEventListener('click', () => {
    if (activeAccordion === accordionItem) {
      // Nếu đã click vào accordion-button trước đó
      accordionItem.style.borderLeft = 'none';
      accordionItem.classList.remove('hide-before'); // Xóa lớp 'hide-before' khỏi accordion-item
      activeAccordion = null; // Xóa trạng thái active
    } else {
      // Nếu click vào accordion-button mới
      if (activeAccordion) {
        // Nếu đã có accordion-button được click trước đó
        activeAccordion.style.borderLeft = 'none';
        activeAccordion.classList.remove('hide-before'); // Xóa lớp 'hide-before' khỏi accordion-item
      }
      accordionItem.style.borderLeft = '0.35rem solid #F14868';
      accordionItem.classList.add('hide-before'); // Thêm lớp 'hide-before' vào accordion-item
      activeAccordion = accordionItem; // Gán trạng thái active
    }
  });
});


// Phần xử lý API cho nút Thêm vào giỏ hàng
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function checkLoginStatus() {
  const token = getCookie('token'); 

  if (token) {
    return true; // Đã đăng nhập
  } else {
    return false; // Chưa đăng nhập
  }
}

function showLoginModal() {
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
}

function showToast() {
  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}

function showToast2() {
  const toastLiveExample2 = document.getElementById('liveToast2');
  const toastBootstrap2 = bootstrap.Toast.getOrCreateInstance(toastLiveExample2);
  toastBootstrap2.show();
}

async function addNewItem(code) {
  const loggedIn = checkLoginStatus();

  if (loggedIn) {
    const tourCode = code;
  
    try {
      const response = await axios.post('../cart/addItem', { tourCode: tourCode });
      console.log(response.status);
      if (response.status === 200) {
        // Hiển thị thông báo toast
        console.log('thành công gửi post');
        showToast();
      } 
    } catch (error) {
      console.log('thất bại gửi post');
      showToast2();
    }
  } else {
    showLoginModal();
  }
}