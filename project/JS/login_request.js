document.addEventListener("DOMContentLoaded", function () {
    const containerr = document.querySelector(".containerr");
    const btnSignIn = document.querySelector(".btnSign-in");
    const btnSignUp = document.querySelector(".btnSign-up");

    // Hàm lấy dữ liệu người dùng từ localStorage
    function getUsersFromStorage() {
        return JSON.parse(localStorage.getItem("registeredUsers")) || {};
    }

    // Hàm lưu dữ liệu người dùng vào localStorage
    function saveUsersToStorage(users) {
        localStorage.setItem("registeredUsers", JSON.stringify(users));
    }

    // Xử lý hiệu ứng chuyển đổi giữa Sign In và Sign Up
    btnSignIn.addEventListener("click", function () {
        containerr.classList.add("active");
    });

    btnSignUp.addEventListener("click", function () {
        containerr.classList.remove("active");
    });

    // đăng nhập
    document.querySelector(".sign_in form").addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.querySelector(".sign_in #email_login").value.trim();
        let password = document.querySelector(".sign_in #password_login").value.trim();

        if (email === "" || password === "") {
            return;
        }

        // Tài khoản admin
        if (email === "admin@admin.com" && password === "admin") {
            localStorage.setItem("loggedInUser", "Admin");
            window.location.href = "Trangchu.html"; 
            return;
        }

        // Kiểm tra đăng nhập thường
        const users = getUsersFromStorage();
        const user = Object.values(users).find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", user.username); 
            window.location.href = "Trangchu.html"; 
        }
    });

    // đăng ký
document.querySelector(".sign_up form").addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.querySelector("#UserName").value.trim();
    let fullname = document.querySelector("#FullName").value.trim();
    let email = document.querySelector(".sign_up #email_register").value.trim();
    let password = document.querySelector(".sign_up #password_register").value.trim();
    let confirmPassword = document.querySelector("#confirm_password_register").value.trim();
    let phone = document.querySelector("#phone").value.trim();
    let agreeTerms = document.querySelector("#agreeTerms").checked;

    if (!username || !fullname || !email || !password || !confirmPassword || !phone) {
        alert("Vui lòng nhập đầy đủ thông tin đăng ký!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không khớp!");
        return;
    }

    if (!agreeTerms) {
        alert("Bạn cần đồng ý với chính sách trước khi đăng ký!");
        return;
    }

    const users = getUsersFromStorage();

    if (users[email]) {
        alert("Email đã được đăng ký. Vui lòng dùng email khác.");
        return;
    }

    users[email] = {
        username: username,
        fullname: fullname, 
        email: email,
        password: password,
        phone: phone, 
        registerDate: new Date().toLocaleString("vi-VN") 
    };
    saveUsersToStorage(users);

    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
    containerr.classList.remove("active");
    document.querySelector(".sign_in #email_login").value = email;
    document.querySelector(".sign_in #password_login").value = password;
});
});