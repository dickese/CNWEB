document.addEventListener("DOMContentLoaded", function () {
    const containerr = document.querySelector(".containerr");
    const btnSignIn = document.querySelector(".btnSign-in");
    const btnSignUp = document.querySelector(".btnSign-up");

    btnSignIn.addEventListener("click", () => containerr.classList.add("active"));
    btnSignUp.addEventListener("click", () => containerr.classList.remove("active"));

    const showError = (id, message) => {
        const input = document.getElementById(id);
        const errorDiv = document.getElementById(id + "_error");
        input.classList.add("error");
        errorDiv.innerText = message;
        errorDiv.style.display = "block";
    };

    const clearErrors = () => {
        document.querySelectorAll("input").forEach(input => input.classList.remove("error"));
        document.querySelectorAll(".error-message").forEach(div => {
            div.innerText = "";
            div.style.display = "none";
        });
    };

    // Đăng nhập
    document.getElementById("form_input_login").addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        let email = document.getElementById("email_login").value.trim();
        let password = document.getElementById("password_login").value.trim();
        let valid = true;

        if (!email) {
            showError("email_login", "Vui lòng nhập email!");
            valid = false;
        }

        if (!password) {
            showError("password_login", "Vui lòng nhập mật khẩu!");
            valid = false;
        }

        if (!valid) return;

        if (email === "admin@admin.com" && password === "admin") {
            localStorage.setItem("loggedInUser", "Admin");
            window.location.href = "Trangchu.html";
            return;
        }

        const users = JSON.parse(localStorage.getItem("registeredUsers")) || {};
        const user = Object.values(users).find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", user.username);
            window.location.href = "Trangchu.html";
        } else {
            showError("email_login", "Email hoặc mật khẩu không đúng!");
            showError("password_login", "");
        }
    });

    // Đăng ký
    document.getElementById("form_input_register").addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        let username = document.getElementById("UserName").value.trim();
        let fullname = document.getElementById("FullName").value.trim();
        let email = document.getElementById("email_register").value.trim();
        let password = document.getElementById("password_register").value.trim();
        let confirmPassword = document.getElementById("confirm_password_register").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let agreeTerms = document.getElementById("agreeTerms").checked;

        let valid = true;

        if (!username) {
            showError("UserName", "Vui lòng nhập tên đăng nhập!");
            valid = false;
        }
        if (!fullname) {
            showError("FullName", "Vui lòng nhập họ tên!");
            valid = false;
        }
        if (!email) {
            showError("email_register", "Vui lòng nhập email!");
            valid = false;
        }
        if (!password) {
            showError("password_register", "Vui lòng nhập mật khẩu!");
            valid = false;
        }
        if (!confirmPassword) {
            showError("confirm_password_register", "Vui lòng xác nhận mật khẩu!");
            valid = false;
        }
        if (password && confirmPassword && password !== confirmPassword) {
            showError("confirm_password_register", "Mật khẩu không khớp!");
            valid = false;
        }
        if (!phone) {
            showError("phone", "Vui lòng nhập số điện thoại!");
            valid = false;
        }
        if (!/^(0|\+84)[0-9]{9}$/.test(phone)) {
            showError("phone", "Số điện thoại không hợp lệ! (VD: 0987654321)");
            valid = false;
        }
        if (!agreeTerms) {
            showError("agreeTerms", "Bạn cần đồng ý với chính sách!");
            valid = false;
        }

        if (!valid) return;

        const users = JSON.parse(localStorage.getItem("registeredUsers")) || {};
        if (users[email]) {
            showError("email_register", "Email đã được đăng ký.");
            return;
        }

        users[email] = {
            username, fullname, email, password, phone,
            registerDate: new Date().toLocaleString("vi-VN")
        };

        localStorage.setItem("registeredUsers", JSON.stringify(users));
        containerr.classList.remove("active");
        document.getElementById("email_login").value = email;
        document.getElementById("password_login").value = password;
    });
});
