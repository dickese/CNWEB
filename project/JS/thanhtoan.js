document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        const tbody = document.querySelector("tbody");
        const totalProductElement = document.querySelector(".total-product");
        const totalPriceElement = document.querySelector(".total-price");
        const finalPriceElement = document.querySelector(".final-price");

        let totalProduct = 0;
        let totalPrice = 0;

        tbody.innerHTML = "";

        cart.forEach((item) => {
            totalProduct += item.quantity;
            totalPrice += item.price * item.quantity;

            const row = `
                <tr>
                    <td class="text-start d-flex align-items-center">
                        <img src="${item.image || '../img/default-image.png'}" alt="${item.name}" width="50" class="me-3">
                        <div>
                            <div>${item.name}</div>
                            <div>Size: ${item.size}</div>
                            <div>Màu: ${item.color}</div>
                        </div>
                    </td>
                    <td class="text-center">${item.quantity}</td>
                    <td class="text-end">${item.price.toLocaleString()} đ</td>
                    <td class="text-end">${(item.price * item.quantity).toLocaleString()} đ</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

        totalProductElement.textContent = totalProduct;
        totalPriceElement.textContent = totalPrice.toLocaleString() + " ₫";

        const shippingFee = 30000;
        const finalPrice = totalPrice + shippingFee;
        finalPriceElement.textContent = finalPrice.toLocaleString() + " ₫";
    }

    renderCart();

    document.querySelector("input[value='ĐẶT HÀNG']").addEventListener("click", function () {
        let email = document.getElementById("email").value;
        let name = document.getElementById("name").value;
        let phone = document.getElementById("phone").value;
        let city = document.getElementById("city").value;
        let district = document.getElementById("district").value;
        let ward = document.getElementById("ward").value;
        let address = document.getElementById("address").value;
        let payment = document.querySelector("input[name='payment']:checked");

        if (!email || !name || !phone || !city || !district || !ward || !address || !payment) {
            document.getElementById("errorMessage").innerHTML = "";
            document.getElementById("errorMessage").style.display = "none"; 
            document.getElementById("errorModal").style.display = "flex";
        } else {
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
    });
    document.getElementById("closeSuccessModalBtn").addEventListener("click", function () {
        closeModal("successModal");
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

    districtSelect.innerHTML = '<option value="">Vui lòng chọn Quận/Huyện</option>';
    wardSelect.innerHTML = '<option value="">Vui lòng chọn Phường/Xã</option>';

    if (districts[city]) {
        Object.keys(districts[city]).forEach(district => {
            let option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
});

document.getElementById("district").addEventListener("change", function () {
    let city = document.getElementById("city").value;
    let district = this.value;
    let wardSelect = document.getElementById("ward");

    wardSelect.innerHTML = '<option value="">Vui lòng chọn Phường/Xã</option>';

    if (districts[city] && districts[city][district]) {
        districts[city][district].forEach(ward => {
            let option = document.createElement("option");
            option.value = ward;
            option.textContent = ward;
            wardSelect.appendChild(option);
        });
    }
});
