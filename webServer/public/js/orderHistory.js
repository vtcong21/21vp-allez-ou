// axios.get("/cart/order-history")
//     .then((response) => {
//         const orderItems = response.data;
//         console.log(orderItems);
//         renderOrderItems(orderItems);
//     })
//     .catch((error) => {
//         console.error("Lỗi khi gửi yêu cầu đến API: ", error);
// });

// function renderOrderItems(orderItems) {
//     orderItems.forEach((order) => {
//         const divId = getDivIdByStatus(order.status);
//         const orderCard = createOrderCard(order);

//         const targetDiv = document.getElementById(divId);
//         targetDiv.appendChild(orderCard);
//     });
// }

// function getDivIdByStatus(status) {
//     switch (status) {
//         case 'Success':
//             return 'pagination-success';
//         case 'Completed':
//             return 'pagination-completed';
//         case 'Cancelled':
//             return 'pagination-cancelled';
//         default:
//             return '';
//     }
// }

// function createOrderCard(order) {
//     const card = document.createElement('div');
//     card.classList.add('card', 'card-v2', 'shadow-sm', 'overflow-hidden', 'p-0', 'mb-4');
//     card.innerHTML = `
//         <div class="row row-v2 g-0">
//             <div class="col-sm-2 col-12 px-0">
//                 <img src="${order.imgURL}" class="img-v2" alt="" />
//             </div>
//             <div class="col-sm-7 col-12 px-1">
//                 <div class="card-body card-body-v2 p-3">
//                     <h5 class="card-title mb-3 truncate-text"><a href="#">${order.name}</a></h5>
//                     <ul class="nav nav-divider small mb-0 mt-2">
//                         <li class="nav-item mb-1 fs-v2"><i class="bi bi-calendar2-check-fill me-2"></i>${order.date}</li>
//                         <li class="nav-item mb-1 fs-v2"><i class="bi bi-people-fill me-2"></i>${order.numOfTickets}</li>
//                         <li class="nav-item mb-1 fs-v2"><i class="bi bi-geo-alt-fill me-2"></i>${order.startPlace}</li>
//                         <li class="nav-item mb-1 fs-v2"><i class="bi bi-credit-card-fill me-2"></i>${order.price}đ</li>
//                     </ul>
//                 </div>
//             </div>
//             <div class="col-sm-3 col-12 text-end">
//                 <span class="badge badge-v2 rounded-pill bg-danger m-4">${order.status}</span>
//             </div>
//         </div>
//     `;
//     return card;
// }
