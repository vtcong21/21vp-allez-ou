function copyTolipBoard(text) {
    console.log('Click');
    navigator.clipboard.writeText(text);
    
    // Alert the copied text
    alert("Đã copy số điện thoại vào clip board");
  }