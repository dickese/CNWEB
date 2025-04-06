document.addEventListener("DOMContentLoaded", function () {
    const userLink = document.getElementById("user-link");
    const logoutLink = document.getElementById("logout-link");
    const loginLink = document.getElementById("login-link");
    const userIcon = document.getElementById("user-icon");

    // Hàm kiểm tra và cập nhật trạng thái hiển thị
    function updateAuthUI() {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            // Đã đăng nhập: hiện User và Đăng xuất
            userLink.style.display = "block";
            logoutLink.style.display = "block";
            loginLink.style.display = "none";
            userLink.innerHTML = `<i class="fa-solid fa-user"></i> ${loggedInUser}`; // Hiển thị tên người dùng
            userIcon.setAttribute("href", "Trangchu.html");
        } else {
            // Chưa đăng nhập: ẩn User và Đăng xuất
            userLink.style.display = "none";
            logoutLink.style.display = "none";
        }
    }

    // Gọi hàm khi trang tải
    updateAuthUI();

    // Xử lý đăng xuất
    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("loggedInUser");
        updateAuthUI();
        window.location.href = "Trangchu.html";
    });

    // Cập nhật lại giao diện sau khi đăng nhập 
    document.querySelector(".sign_in form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.querySelector(".sign_in #email_login").value.trim();
        let password = document.querySelector(".sign_in #password_login").value.trim();

        if (email === "" || password === "") {
            alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
            return;
        }

        if (email === "admin@admin.com" && password === "admin") {
            alert("Đăng nhập thành công với quyền admin!");
            localStorage.setItem("loggedInUser", "Admin");
            updateAuthUI(); // Cập nhật giao diện
            window.location.href = "Trangchu.html";
            return;
        }

        const users = JSON.parse(localStorage.getItem("registeredUsers")) || {};
        const user = Object.values(users).find(u => u.email === email && u.password === password);

        if (user) {
            alert("Đăng nhập thành công!");
            localStorage.setItem("loggedInUser", user.username);
            updateAuthUI(); // Cập nhật giao diện
            window.location.href = "Trangchu.html";
        } else {
            alert("Tài khoản chưa đăng ký hoặc sai thông tin đăng nhập!");
        }
        document.querySelector(".sign_in #email_login").value = "";
        document.querySelector(".sign_in #password_login").value = "";
    });
});