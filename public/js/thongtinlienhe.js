document.addEventListener('DOMContentLoaded', function() {
    const orderButton = document.getElementById('button-guingay');
    console.log(orderButton); // Kiểm tra xem orderButton có tồn tại và là một phần tử HTML hợp lệ không
  
    if (orderButton) {
      orderButton.onclick = () => {
        const hoTenInput = document.getElementById('name');
        const soDienThoaiInput = document.getElementById('sdt');
        const emailInput = document.getElementById('email');
        const soDienThoaiPattern = /^0\d{9}$/; 
        const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
         if (!hoTenInput.value || !soDienThoaiInput.value  || !emailInput.value) {
          alert('Vui lòng điền đầy đủ thông tin!');
        }
        else if (!soDienThoaiInput.value.match(soDienThoaiPattern)) {
          alert('Số điện thoại không hợp lệ. Vui lòng nhập lại số điện thoại đúng định dạng!');
        } 
        else if (!emailInput.value.match(emailPattern)) {
          alert('Email không hợp lệ. Vui lòng nhập lại email đúng định dạng!');
        }
        else{ 
            const hoTenValue = hoTenInput.value.trim();
    const soDienThoaiValue = soDienThoaiInput.value.trim();
    const emailValue = emailInput.value.trim();
  
    if (hoTenValue && soDienThoaiValue && emailValue) {
      const data = {
        hoTen: hoTenValue,
        soDienThoai: soDienThoaiValue,
        email: emailValue
      };
      localStorage.setItem('contactData', JSON.stringify(data));
    }
                const contactData = localStorage.getItem('contactData');
                if (contactData) {
                  const data = JSON.parse(contactData);
                  axios.post('/api/contact', data)
                    .then(response => {
                      console.log('Server response:', response.data);
                      localStorage.removeItem('contactData');
                    })
                    .catch(error => {
                      console.error('Error sending data to server:', error);
                    });
              }
        }
        
      };
    }
  }); 

