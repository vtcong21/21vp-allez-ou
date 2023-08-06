function moreInfo() {
    var infoContainer = document.getElementById('infoContainer');
  
    var ul1 = document.createElement('ul');
    ul1.classList.add('list-group', 'list-group-borderless');
  
    var p1 = document.createElement('p');
    p1.classList.add('more-title');
    p1.textContent = 'Thông tin liên hệ';
    ul1.appendChild(p1);
  
    var li1_1 = createListItem('Email:', 'vnxuyen21@vp.fitus.edu.vn');
    var li1_2 = createListItem('Số điện thoại:', '093 883 7226');
    var li1_3 = createListItem('Địa chỉ:', '227 Nguyễn Văn Cừ Quận 5');
  
    ul1.appendChild(li1_1);
    ul1.appendChild(li1_2);
    ul1.appendChild(li1_3);
  
    var ul2 = document.createElement('ul');
    ul2.classList.add('list-group', 'list-group-borderless');
  
    var p2 = document.createElement('p');
    p2.classList.add('more-title');
    p2.textContent = 'Khách hàng 1  ';
    var badge1 = document.createElement('span');
    badge1.classList.add('badge', 'rounded-pill', 'bg-success');
    badge1.textContent = ' NGƯỜI LỚN';
    p2.appendChild(badge1);
    ul2.appendChild(p2);
  
    var li2_1 = createListItem('Họ tên:', 'vnxuyen21@vp.fitus.edu.vn');
    var li2_2 = createListItem('Giới tính:', '093 883 7226');
    var li2_3 = createListItem('Ngày sinh:', '227 Nguyễn Văn Cừ Quận 5');
    var li2_4 = createListItem('Phòng riêng:', 'Có');
  
    ul2.appendChild(li2_1);
    ul2.appendChild(li2_2);
    ul2.appendChild(li2_3);
    ul2.appendChild(li2_4);
  
    var ul3 = document.createElement('ul');
    ul3.classList.add('list-group', 'list-group-borderless');
  
    var p3 = document.createElement('p');
    p3.classList.add('more-title');
    p3.textContent = 'Khách hàng 2  ';
    var badge2 = document.createElement('span');
    badge2.classList.add('badge', 'rounded-pill', 'bg-success');
    badge2.textContent = ' TRẺ EM';
    p3.appendChild(badge2);
    ul3.appendChild(p3);
  
    var li3_1 = createListItem('Họ tên:', 'vnxuyen21@vp.fitus.edu.vn');
    var li3_2 = createListItem('Giới tính:', '093 883 7226');
    var li3_3 = createListItem('Ngày sinh:', '227 Nguyễn Văn Cừ Quận 5');
  
    ul3.appendChild(li3_1);
    ul3.appendChild(li3_2);
    ul3.appendChild(li3_3);
  
    infoContainer.appendChild(ul1);
    infoContainer.appendChild(ul2);
    infoContainer.appendChild(ul3);


      // Ẩn chữ "xem thêm"
      var moreButton = document.querySelector(".more");
      moreButton.textContent = "---rút gọn---";
  
      // Đổi margin more button
      moreButton.style.marginTop = '20px';
      // Đổi margin button
      document.querySelector('.btn-primary').style.marginTop = '60px';
}
  
function createListItem(label, content) {
    var li = document.createElement('li');
    li.classList.add('list-group-item', 'd-sm-flex', 'justify-content-between', 'align-items-center');
    
    var spanLabel = document.createElement('span');
    spanLabel.classList.add('mb-0');
    spanLabel.textContent = label;
    li.appendChild(spanLabel);

    var spanContent = document.createElement('span');
    spanContent.classList.add('h6', 'fw-normal', 'mb-0');
    spanContent.textContent = content;
    li.appendChild(spanContent);

    return li;
}