document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra đăng nhập
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        alert("Vui lòng đăng nhập để xem thông tin tài khoản!");
        window.location.href = "Dangnhap.html";
        return;
    }

    function getUsersFromStorage() {
        return JSON.parse(localStorage.getItem("registeredUsers")) || {};
    }

    function saveUsersToStorage(users) {
        localStorage.setItem("registeredUsers", JSON.stringify(users));
    }

    const users = getUsersFromStorage();
    let userEmail = null;
    let userData = null;

    for (let email in users) {
        if (users[email].username === loggedInUser) {
            userEmail = email;
            userData = users[email];
            break;
        }
    }

    // Nếu là admin
    const isAdmin = loggedInUser === "Admin";

    // Kiểm tra nếu không tìm thấy người dùng (người dùng thường)
    if (!isAdmin && !userData) {
        alert("Không tìm thấy thông tin người dùng! Vui lòng đăng nhập lại.");
        localStorage.removeItem("loggedInUser");
        window.location.href = "Dangnhap.html";
        return;
    }

    // Hiển thị thông tin tài khoản
    document.getElementById("username").textContent = isAdmin ? "Admin" : loggedInUser;
    document.getElementById("fullName").textContent = isAdmin ? "Cô Thu Hà Đẹp Gái" : userData.fullname || "Chưa cập nhật";
    document.getElementById("email").textContent = isAdmin ? "admin@admin.com" : userEmail || "";
    document.getElementById("group").textContent = isAdmin ? "Admin" : "Khách hàng";
    document.getElementById("telephone").textContent = isAdmin ? "" : userData.phone || "Chưa cập nhật";
    document.getElementById("registerDate").textContent = isAdmin ? "1/1/2025" : userData.registerDate || "Chưa cập nhật";

    const editInfoBtn = document.getElementById("editInfoBtn");
    const editInfoModal = document.getElementById("editInfoModal");
    const editInfoForm = document.getElementById("editInfoForm");

    editInfoBtn.addEventListener("click", function () {
        document.getElementById("editUsername").value = loggedInUser;
        document.getElementById("editFullName").value = isAdmin ? "Cô Thu Hà Đẹp Gái" : userData ? userData.fullname || "" : "";
        document.getElementById("editEmail").value = isAdmin ? "admin@admin.com" : userEmail || "";
        document.getElementById("editPhone").value = isAdmin ? "" : userData ? userData.phone || "" : "";
        editInfoModal.style.display = "flex";
    });

    editInfoForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const newUsername = document.getElementById("editUsername").value.trim();
        const newFullName = document.getElementById("editFullName").value.trim();
        const newEmail = document.getElementById("editEmail").value.trim();
        const newPhone = document.getElementById("editPhone").value.trim();

        if (!newUsername || !newFullName || !newEmail) {
            alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
            return;
        }

        if (isAdmin) {
            alert("Tài khoản admin không thể sửa thông tin!");
            editInfoModal.style.display = "none";
            return;
        }

        if (newEmail !== userEmail && users[newEmail]) {
            alert("Email đã được đăng ký. Vui lòng dùng email khác!");
            return;
        }

        const updatedUserData = {
            username: newUsername,
            fullname: newFullName,
            email: newEmail,
            password: userData.password,
            phone: newPhone,
            registerDate: userData.registerDate
        };

        delete users[userEmail];
        users[newEmail] = updatedUserData;
        saveUsersToStorage(users);

        localStorage.setItem("loggedInUser", newUsername);

        userEmail = newEmail;
        userData = updatedUserData;
        document.getElementById("username").textContent = newUsername;
        document.getElementById("fullName").textContent = newFullName;
        document.getElementById("email").textContent = newEmail;
        document.getElementById("telephone").textContent = newPhone;

        if (typeof updateAuthUI === "function") {
            updateAuthUI();
        }

        alert("Cập nhật thông tin thành công!");
        editInfoModal.style.display = "none";
    });

    const changePasswordBtn = document.getElementById("changePasswordBtn");
    const changePasswordModal = document.getElementById("changePasswordModal");
    const changePasswordForm = document.getElementById("changePasswordForm");

    changePasswordBtn.addEventListener("click", function () {
        document.getElementById("oldPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmNewPassword").value = "";
        changePasswordModal.style.display = "flex";
    });

    changePasswordForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const oldPassword = document.getElementById("oldPassword").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const confirmNewPassword = document.getElementById("confirmNewPassword").value.trim();

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const currentPassword = isAdmin ? "admin" : userData ? userData.password : "";
        if (oldPassword !== currentPassword) {
            alert("Mật khẩu cũ không đúng!");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("Mật khẩu mới và xác nhận mật khẩu mới không khớp!");
            return;
        }

        if (isAdmin) {
            alert("Tài khoản admin không thể đổi mật khẩu!");
            changePasswordModal.style.display = "none";
            return;
        }

        userData.password = newPassword;
        users[userEmail] = userData;
        saveUsersToStorage(users);

        alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        changePasswordModal.style.display = "none";
        localStorage.removeItem("loggedInUser");
        window.location.href = "Dangnhap.html";
    });

    document.querySelectorAll(".modal .close").forEach(function (closeBtn) {
        closeBtn.addEventListener("click", function () {
            closeBtn.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", function (event) {
        if (event.target === editInfoModal) {
            editInfoModal.style.display = "none";
        }
        if (event.target === changePasswordModal) {
            changePasswordModal.style.display = "none";
        }
    });
});