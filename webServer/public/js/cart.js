async function deleteItem(itemId) {
    try {
        console.log(itemId);
        const response = await axios.delete('/cart/deleteItem', {
            data: { itemId: itemId } 
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