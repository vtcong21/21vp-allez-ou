function translateStatusToVietnamese(status) {
    switch (status) {
        case "Success":
            return "Đặt thành công";
        case "Completed":
            return "Hoàn thành";
        case "Cancelled":
            return "Đã hủy";
        default:
            return "Chờ xác nhận";
    }
}