function changeDateToString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// console.log(typeof(paymentList[0].date));

function displayList() {
    const list = document.getElementById('pay-container');
    list.innerHTML = "";
  
    // console.log(paymentList);
    for (let i = paymentList.length - 1; i >= 0; i--) {
        let payment = paymentList[i];
        let card;
        if (payment.refunded === true) {
            card = makeCardRefunded(payment);
        } else {
            card = makeCardNotRefunded(payment);
        }
        list.insertAdjacentHTML('beforeend', card);
    }
  }

function makeCardRefunded(card) {
    return `
    <li class="list-group-item d-flex justify-content-between lh-sm py-4">
        <div class="max-width-h5">
            <h6 class="my-0">${card.name}</h6>
            <small class="text-body-secondary date-v2">Ngày: ${changeDateToString(new Date(card.date))} - Loại hóa đơn: Hoàn tiền</small>
        </div>
        <span class="text-body-secondary refunded">+${card.totalPrice.toLocaleString()}đ</span>
    </li>
    `;
}

function makeCardNotRefunded(card) {
    return `
    <li class="list-group-item d-flex justify-content-between lh-sm py-4">
        <div class="max-width-h5">
            <h6 class="my-0">${card.name}</h6>
            <small class="text-body-secondary date-v2">Ngày: ${changeDateToString(new Date(card.date))} - Loại hóa đơn: Thanh toán</small>
        </div>
        <span class="text-body-secondary not-refunded">-${card.totalPrice.toLocaleString()}đ</span>
    </li>
    `;
}

displayList();