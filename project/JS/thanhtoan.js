document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra đăng nhập
    const loggedInUser = localStorage.getItem("loggedInUser");
    console.log("Logged in user in Thanhtoan.html:", loggedInUser);
    if (!loggedInUser) {
        alert("Vui lòng đăng nhập để thanh toán!");
        window.location.href = "Dangnhap.html";
        return;
    }

    // Lấy giỏ hàng của người dùng hiện tại
    const cartKey = `cart_${loggedInUser}`;
    console.log("Cart key in Thanhtoan.html:", cartKey);
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    console.log("Cart data in Thanhtoan.html:", cart);

    function renderCart() {
        const tbody = document.querySelector("tbody");
        const totalProductElement = document.querySelector(".total-product");
        const totalPriceElement = document.querySelector(".total-price");
        const finalPriceElement = document.querySelector(".final-price");

        if (!tbody || !totalProductElement || !totalPriceElement || !finalPriceElement) {
            console.error("Không tìm thấy một hoặc nhiều phần tử cần thiết trong DOM!");
            return;
        }

        let totalProduct = 0;
        let totalPrice = 0;

        tbody.innerHTML = "";

        cart.forEach((item) => {
            const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
            totalProduct += item.quantity;
            totalPrice += price * item.quantity;

            const row = `
                <tr>
                    <td class="text-start d-flex align-items-center">
                        <img src="${item.image || '../img/default-image.png'}" alt="${item.name}" width="50" style="margin-right: 10px">
                        <div>
                            <div>${item.name}</div>
                            <div>Size: ${item.size}</div>
                            <div>Màu: ${item.color}</div>
                        </div>
                    </td>
                    <td class="text-center">${item.quantity}</td>
                    <td class="text-end">${item.price}</td>
                    <td class="text-end">${(price * item.quantity).toLocaleString("vi-VN")} đ</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

        totalProductElement.textContent = totalProduct;
        totalPriceElement.textContent = totalPrice.toLocaleString("vi-VN") + " ₫";

        const shippingFee = 30000;
        const finalPrice = totalPrice + shippingFee;
        finalPriceElement.textContent = finalPrice.toLocaleString("vi-VN") + " ₫";
    }

    renderCart();

    const emailInput = document.getElementById("email");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const citySelect = document.getElementById("city");
    const districtSelect = document.getElementById("district");
    const wardSelect = document.getElementById("ward");
    const addressInput = document.getElementById("address");
    const orderButton = document.querySelector("input[value='ĐẶT HÀNG']");

    const emailError = document.getElementById("email-error");
    const nameError = document.getElementById("name-error");
    const phoneError = document.getElementById("phone-error");
    const cityError = document.getElementById("city-error");
    const districtError = document.getElementById("district-error");
    const addressError = document.getElementById("address-error");
    const wardError = document.getElementById("ward-error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(09|03|07|06|05|04)\d{8}$/;
    const nameRegex = /^[A-ZÀ-ỹ][a-zà-ỹ]+(\s[A-ZÀ-ỹ][a-zà-ỹ]+)+$/;

    function validateEmail() {
        if (!emailInput.value.trim()) {
            emailError.textContent = "Vui lòng nhập địa chỉ email.";
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = "Địa chỉ email không hợp lệ.";
            return false;
        } else {
            emailError.textContent = "";
            return true;
        }
    }

    function validateName() {
        if (!nameInput.value.trim()) {
            nameError.textContent = "Vui lòng nhập họ và tên.";
            return false;
        } else if (!nameRegex.test(nameInput.value.trim())) {
            nameError.textContent = "Họ tên phải có ít nhất Họ và Tên, viết hoa chữ cái đầu mỗi từ.";
            return false;
        } else {
            nameError.textContent = "";
            return true;
        }
    }

    function validatePhone() {
        if (!phoneInput.value.trim()) {
            phoneError.textContent = "Vui lòng nhập số điện thoại.";
            return false;
        } else if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 09, 03, 07, 06, 05, 04).";
            return false;
        } else {
            phoneError.textContent = "";
            return true;
        }
    }

    function validateCity() {
        if (!citySelect.value || citySelect.value === "") {
            cityError.textContent = "Vui lòng chọn Tỉnh/Thành phố.";
            return false;
        } else {
            cityError.textContent = "";
            return true;
        }
    }

    function validateDistrict() {
        if (!districtSelect.value || districtSelect.value === "") {
            districtError.textContent = "Vui lòng chọn Quận/Huyện.";
            return false;
        } else {
            districtError.textContent = "";
            return true;
        }
    }

    function validateWard() {
        if (!wardSelect.value || wardSelect.value === "") {
            wardError.textContent = "Vui lòng chọn Phường/Xã.";
            return false;
        } else {
            wardError.textContent = "";
            return true;
        }
    }

    function validateAddress() {
        if (!addressInput.value.trim()) {
            addressError.textContent = "Vui lòng nhập địa chỉ đường.";
            return false;
        } else {
            addressError.textContent = "";
            return true;
        }
    }

    emailInput.addEventListener("input", validateEmail);
    nameInput.addEventListener("input", validateName);
    phoneInput.addEventListener("input", validatePhone);
    citySelect.addEventListener("change", validateCity);
    districtSelect.addEventListener("change", validateDistrict);
    wardSelect.addEventListener("change", validateWard);
    addressInput.addEventListener("input", validateAddress);


    document.getElementById("errorModal").style.display = "none";
    document.getElementById("successModal").style.display = "none";

    orderButton.addEventListener("click", function (event) {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isCityValid = validateCity();
        const isDistrictValid = validateDistrict();
        const isWardValid = validateWard();
        const isAddressValid = validateAddress();
        const payment = document.querySelector("input[name='payment']:checked");

        let hasError = !isEmailValid || !isNameValid || !isPhoneValid || !isCityValid || !isDistrictValid || !isWardValid || !isAddressValid || !payment;

        if (!payment) {
            alert("Vui lòng chọn phương thức thanh toán.");
            hasError = true;
        }

        if (hasError) {
            document.getElementById("errorMessage").textContent = "Vui lòng kiểm tra lại thông tin đã nhập.";
            document.getElementById("errorModal").style.display = "flex";
        } else {
            const order = {
                user: loggedInUser,
                email: emailInput.value.trim(),
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                address: `${addressInput.value.trim()}, ${wardSelect.value}, ${districtSelect.value}, ${citySelect.value}`,
                payment: payment.value,
                cart: cart,
                total: parseInt(document.querySelector(".final-price").textContent.replace(/[^0-9]/g, ""), 10),
                date: new Date().toISOString(),
            };

            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));

            localStorage.removeItem(cartKey);

            document.getElementById("successModal").style.display = "flex";
        }
    });

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    document.querySelector("#errorModal .close").addEventListener("click", function () {
        closeModal("errorModal");
    });
    document.getElementById("closeErrorModalBtn").addEventListener("click", function () {
        closeModal("errorModal");
    });

    document.querySelector("#successModal .close").addEventListener("click", function () {
        closeModal("successModal");
        window.location.href = "Trangchu.html";
    });
    document.getElementById("closeSuccessModalBtn").addEventListener("click", function () {
        closeModal("successModal");
        window.location.href = "Trangchu.html";
    });
});

const districts = {
    hanoi: {
        "Ba Đình": ["Phúc Xá", "Trúc Bạch", "Vĩnh Phúc"],
        "Hoàn Kiếm": ["Hàng Bài", "Hàng Buồm", "Lý Thái Tổ"],
        "Cầu Giấy": ["Dịch Vọng", "Yên Hòa", "Mai Dịch"]
    },
    hochiminh: {
        "Quận 1": ["Bến Nghé", "Bến Thành", "Cô Giang", "Phạm Ngũ Lão"],
        "Quận 2": ["Thảo Điền", "Bình An", "An Phú"],
        "Bình Thạnh": ["Phường 1", "Phường 2", "Phường 3", "Phường 27"],
        "Gò Vấp": ["Phường 1", "Phường 3", "Phường 4", "Phường 10"]
    },
    dongnai: {
        "Thống Nhất": ["Bàu Hàm 2", "Quang Trung", "Gia Tân 1"],
        "Long Khánh": ["Bảo Vinh", "Bảo Quang", "Hàng Gòn"],
        "Trảng Bom": ["Bàu Hàm", "Tây Hòa"],
        "Biên Hòa": ["Trảng Dài", "Tam Hiệp"]
    }
};

document.getElementById("city").addEventListener("change", function () {
    let city = this.value;
    let districtSelect = document.getElementById("district");
    let wardSelect = document.getElementById("ward");

    districtSelect.innerHTML = '<option value="" selected>Vui lòng chọn Quận/Huyện</option>';
    wardSelect.innerHTML = '<option value="" selected>Vui lòng chọn Phường/Xã</option>';

    if (districts[city]) {
        Object.keys(districts[city]).forEach(district => {
            let option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
    validateCity();
});

document.getElementById("district").addEventListener("change", function () {
    let city = document.getElementById("city").value;
    let district = this.value;
    let wardSelect = document.getElementById("ward");

    wardSelect.innerHTML = '<option value="" selected>Vui lòng chọn Phường/Xã</option>';

    if (districts[city] && districts[city][district]) {
        districts[city][district].forEach(ward => {
            let option = document.createElement("option");
            option.value = ward;
            option.textContent = ward;
            wardSelect.appendChild(option);
        });
    }
    validateDistrict();
});

document.getElementById("ward").addEventListener("change", validateWard);