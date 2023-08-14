async function deleteItem(itemId) {
    try {
        console.log(itemId);
        const response = await axios.delete('/cart/deleteItem', {
            data: { itemId: itemId } // Truyền dữ liệu trong đối tượng "data"
        });
      
        if (response.status === 200) {
            console.log('thành công delete');
            location.reload();
        }
    } catch (error) {
      console.log('thất bại delete');
      console.error("Error:", error);

    }
}

async function bookTourPage(itemId, tourCode) {
    try {
        const response = await axios.get('user/getOrderPage', {
            data: { itemId: itemId, tourCode: tourCode }
        });

        if (response.status === 200) {
            console.log(tourCode);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}