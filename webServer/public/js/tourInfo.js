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

// function checkLoginStatus() {
//   const token = getCookie('token'); 
  
//   if (token) {
//     console.log(token + ' true')
//     return true; // Đã đăng nhập
//   } else {
//     console.log(' false')
//     return false; // Chưa đăng nhập
//   }
// }

// function showLoginModal() {
//   const loginModal = new bootstrap.Modal(document.getElementById("exampleModal"));
//   loginModal.show();
// }

// async function addNewItem(code) {
//   const loggedIn = checkLoginStatus();
  
//   if (loggedIn) {
//     const token = getCookie('token');
//     const codeTour = code;
    
//     try {
//       const response = await axios.post('/addItem', { codeTour: codeTour }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
      
//       if (response.status === 200) {
//         // Hiển thị thông báo toast
//         const toast = new bootstrap.Toast(document.getElementById("myToast"));
//         toast.show();
//       }
//     } catch (error) {
//       console.error("Error:", error);

//     }
//   } else {
//     showLoginModal();
//   }
// }




// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }

// function AddToCart(){
//     const token = getCookie("token");
//     if (!token)
//     {
//       console.log("show");
//       $('#loginModal').modal('show');
//     }
//     else{
//       // add vào giỏ hàng tại đây
//     }
// }