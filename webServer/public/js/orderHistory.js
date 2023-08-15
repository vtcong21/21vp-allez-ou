// for (order of ordersSuccess){
    // }
    
// function openSuccessModal(index) {
//     console.log(index)
//     console.log(ordersSuccess[index].tour.name);
//     // const modalBody = document.getElementById("bookingSuccessModal");

//     // modalBody.insertAdjacentHTML("beforeend",  fillInfo(index));

//     const modal = new bootstrap.Modal(document.getElementById('bookingSuccessModal'));
//     modal.show();
// }

const myModal = new bootstrap.Modal(document.getElementById('myModal'));

function openModal() {
  myModal.show();
}

function fillInfo(i) {
    return`
    <section class="pt-4">
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-xl-8 mx-auto">
                <div class="card shadow">
                    <!-- Image -->
                    <img src="https://booking.webestica.com/assets/images/gallery/04.jpg" class="rounded-top" alt="" />
                    <!-- Card body -->
                    <ul class="card-body text-center p-4">
                        <!-- Title -->
                        <h1 class="card-title fss">🎊 Đặt thành công! 🎊</h1>
                        <p class="lead mb-3">
                            Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của Allez òu,<br />
                            dưới đây là thông tin vé của bạn
                        </p>
                        <!-- Second title -->
                        <h5 class="text-primary mb-4" >${ordersSuccess[i].tour.name}</h5>
                        <!-- List -->
                        <div class="row justify-content-between text-start">
                            <div class="col-12">
                                <ul class="list-group list-group-borderless">
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0"> <i class="bi bi-vr fa-fw me-2"></i>Mã tour: </span>
                                        <span class="h6 fw-normal mb-0">NDSGN559-006-080823XE-V</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0"> <i class="bi bi-person fa-fw me-2"></i>Khách đại diện: </span>
                                        <span class="h6 fw-normal mb-0">Vũ Nguyễn Xuân Uyên</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0"> <i class="bi bi-wallet2 fa-fw me-2"></i>Thanh toán: </span>
                                        <span class="h6 fw-normal mb-0">Ngân hàng</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0"> <i class="bi bi-currency-dollar fa-fw me-2"></i>Tổng tiền: </span>
                                        <span class="h6 fw-normal mb-0">4,590,000₫</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0"> <i class="bi bi-calendar fa-fw me-2"></i>Ngày xác nhận: </span>
                                        <span class="h6 fw-normal mb-0">03/08/2023</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0"> <i class="bi bi-calendar fa-fw me-2"></i>Ngày đi: </span>
                                        <span class="h6 fw-normal mb-0">15/08/2023</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0"> <i class="bi bi-people fa-fw me-2"></i>Số khách: </span>
                                        <span class="h6 fw-normal mb-0">3</span>
                                    </li>
                                </ul>
                                <ul class="list-group list-group-borderless">
                                    <p class="more-title">Thông tin liên hệ</p>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Email: </span>
                                        <span class="h6 fw-normal mb-0">vnxuyen21@vp.fitus.edu.vn</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Số điện thoại: </span>
                                        <span class="h6 fw-normal mb-0">093 883 7226</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Địa chỉ: </span>
                                        <span class="h6 fw-normal mb-0">227 Nguyễn Văn Cừ Quận 5</span>
                                    </li>
                                </ul>
                                <ul class="list-group list-group-borderless">
                                    <p class="more-title">Khách hàng 1 <span class="badge rounded-pill bg-success"> NGƯỜI LỚN</span></p>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Họ tên: </span>
                                        <span class="h6 fw-normal mb-0">vnxuyen21@vp.fitus.edu.vn</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Giới tính: </span>
                                        <span class="h6 fw-normal mb-0">093 883 7226</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Ngày sinh: </span>
                                        <span class="h6 fw-normal mb-0">227 Nguyễn Văn Cừ Quận 5</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Phòng riêng: </span>
                                        <span class="h6 fw-normal mb-0">Có</span>
                                    </li>
                                </ul>

                                <ul class="list-group list-group-borderless">
                                    <p class="more-title">Khách hàng 2 <span class="badge rounded-pill bg-success"> TRẺ EM</span></p>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Họ tên: </span>
                                        <span class="h6 fw-normal mb-0">vnxuyen21@vp.fitus.edu.vn</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Giới tính: </span>
                                        <span class="h6 fw-normal mb-0">093 883 7226</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Ngày sinh: </span>
                                        <span class="h6 fw-normal mb-0">227 Nguyễn Văn Cừ Quận 5</span>
                                    </li>
                                    <li class="list-group-item d-sm-flex justify-content-between align-items-center">
                                        <span class="mb-0">Phòng riêng: </span>
                                        <span class="h6 fw-normal mb-0">Có</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Download button -->
                        <a href="#" class="btn btn-primary mb-0"> <i class="bi bi-x-octagon"></i> Hủy chuyến </a>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </section>
    `;
}