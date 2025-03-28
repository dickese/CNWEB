document.addEventListener("DOMContentLoaded", function () {
    const containerr = document.querySelector(".containerr");
    const btnSignIn = document.querySelector(".btnSign-in");
    const btnSignUp = document.querySelector(".btnSign-up");

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
        let email = document.querySelector(".sign_in #email").value.trim();
        let password = document.querySelector(".sign_in #password").value.trim();
        
        if (email === "" || password === "") {
            alert("Vui lòng nhập đầy đủ thông tin đăng nhập!");
            return;
        }
        
        alert("Đăng nhập thành công!");
    });

    // đăng ký
    document.querySelector(".sign_up form").addEventListener("submit", function (event) {
        event.preventDefault();
        let username = document.querySelector("#UserName").value.trim();
        let fullname = document.querySelector("#FullName").value.trim();
        let email = document.querySelector(".sign_up #email").value.trim();
        let password = document.querySelector(".sign_up #password").value.trim();
        let confirmPassword = document.querySelector("#confirm_password").value.trim();
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
        
        alert("Đăng ký thành công!");
    });
});