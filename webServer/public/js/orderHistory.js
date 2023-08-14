function showDetails(itemId) {
    // Gọi API để lấy thông tin chi tiết của đơn hàng
    axios.post(`/orderDetails`, { itemId: itemId })
    .then((response) => {
            const orderDetails = response.data;

            // Điền thông tin chi tiết vào modal
            document.getElementById('modalTitle').innerText = '🎊 Đặt thành công! 🎊';
            document.getElementById('representative').innerText = `Khách đại diện: ${orderDetails.representer}`;
            document.getElementById('paymentMethod').innerText = `Thanh toán: ${orderDetails.paymentMethod}`;
            document.getElementById('totalPrice').innerText = `Tổng tiền: ${orderDetails.totalPrice}đ`;
            document.getElementById('confirmationDate').innerText = `Ngày mua vé: ${orderDetails.date}`;
            document.getElementById('departureDate').innerText = `Ngày đi: ${orderDetails.startDate}`;
            document.getElementById('numOfGuests').innerText = `Số khách: ${orderDetails.tickets.length}`;

            // Hiển thị modal
            const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
            modal.show();
        })
        .catch((error) => {
            console.error('Lỗi khi gửi yêu cầu đến API:', error);
        });
}
