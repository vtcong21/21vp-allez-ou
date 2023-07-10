    
    
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("pwd").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const dob = document.getElementById("dob").value;
        const phone = document.getElementById("phone").value;
        const bank = document.getElementById("bank").value;
        const accountNumber = document.getElementById("account_number").value;
        const accountName = document.getElementById("account_name").value;

        axios.post("/register", {
            name,
            email,
            password,
            gender,
            dob,
            phone,
            bank,
            accountNumber,
            accountName,
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    });
