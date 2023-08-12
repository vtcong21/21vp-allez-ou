async function getAllOrders() {
    try {
        const response = await axios.get("/admin/getAllOrders");
        if (response.status === 200) {
            let orders = response.data;
            totalItems = orders.length;
            orders = orders.map((order) => {
                const formattedOrderDate = changeDateToString(order.orderDate);
                return { ...order, orderDate: formattedOrderDate };
            });
            displayOrderList(orders);
            displayPagination(totalItems);
        } else {
            throw new Error("Lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        console.log(error);
    }
}
function displayOrderList(orders, orderTab) {
    const listClient = document.getElementById("client-list__container");
    listClient.innerHTML = "";
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const clientToShow = clients.slice(startIndex, endIndex);
    clientToShow.forEach((client) => {
        const row = makeClientRow(client);
        listClient.insertAdjacentHTML("beforeend", row);
    });
}
function makeOrderRow(order) {
    return `
<tr>
    <td>
        <div class="d-flex align-items-center">
            <img src="/img/client.png" alt="" style="width: 30px; height: 30px;" class="rounded-circle" />
            <div class="ms-3">
                <p class="fw-bold mt-2 name">Vũ Nguyễn Xuân Uyên</p>
            </div>
        </div>
    </td>
    <td>
        <p class="fw-normal mt-2 name">NDSGN1871-117-110723VU-V-7</p>
    </td>
    <td>
        <p class="fw-normal mt-2">4</p>
    </td>
    <td>
        <p class="fw-normal mt-2">10/07/2023</p>
    </td>
    <td>
        <p class="mt-2 badge text-bg-success">Đặt thành công</p>
    </td>
    <td>
        <div class="d-flex justify-content-end mt-2">
            <a data-bs-toggle="modal" data-bs-target="#orderModal"><img src="/img/admin/adminOrder/showMore.png" /></a>
        </div>
    </td>
</tr>
`;
}
