document.addEventListener("DOMContentLoaded", function () {
    // Kiểm tra đăng nhập
    const loggedInUser = localStorage.getItem("loggedInUser");
    console.log("Logged in user in Giohang.html:", loggedInUser);
    if (!loggedInUser) {
        alert("Vui lòng đăng nhập để xem giỏ hàng!");
        window.location.href = "Dangnhap.html";
        return;
    }

    // Lấy giỏ hàng của người dùng hiện tại
    const cartKey = `cart_${loggedInUser}`;
    console.log("Cart key in Giohang.html:", cartKey);
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    console.log("Cart data in Giohang.html:", cart);

    function renderCart() {
        const cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">
                        Giỏ hàng trống! <br>
                        <a href="Trangchu.html" class="btn btn-outline-dark mt-3">Quay về Trang Chủ</a>
                    </td>
                </tr>`;
            document.getElementById("total-quantity").innerText = "0";
            document.getElementById("total-price").innerText = "0 đ";
            // Ẩn nút "Đặt hàng" khi giỏ hàng trống
            const checkoutLink = document.getElementById("checkout-link");
            if (checkoutLink) {
                checkoutLink.classList.add("hidden");
            }
            return;
        }

        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const price = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
            totalQuantity += item.quantity;
            totalPrice += price * item.quantity;

            const itemHTML = `
                <tr>
                    <td class="text-start d-flex align-items-center">
                        <img src="${item.image || '../img/default-image.png'}" alt="${item.name}" width="50" class="me-3">
                        <div>
                            <div>${item.name}</div>
                            <div>Size: ${item.size}</div>
                            <div>Màu: ${item.color}</div>
                        </div>
                    </td>
                    <td class="text-center">
                        <button class="btn-decrease" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="spanquantity">${item.quantity}</span>
                        <button class="btn-increase" onclick="updateQuantity(${index}, 1)">+</button>
                    </td>
                    <td class="text-end">${item.price}</td>
                    <td class="text-end">${(price * item.quantity).toLocaleString("vi-VN")} đ</td>
                    <td class="text-end">
                        <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Xóa</button>
                    </td>
                </tr>
            `;
            cartContainer.innerHTML += itemHTML;
        });

        document.getElementById("total-quantity").innerText = totalQuantity;
        document.getElementById("total-price").innerText = totalPrice.toLocaleString("vi-VN");

        // Hiển thị nút "Đặt hàng" khi giỏ hàng không trống
        const checkoutLink = document.getElementById("checkout-link");
        if (checkoutLink) {
            checkoutLink.classList.remove("hidden");
        }
    }

    window.updateQuantity = function (index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        saveCartAndRender();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        saveCartAndRender();
    };

    function saveCartAndRender() {
        localStorage.setItem(cartKey, JSON.stringify(cart));
        renderCart();
    }

    renderCart();

    // Xử lý khi nhấn nút "Đặt hàng"
    const checkgiohang = document.getElementById("checkgiohang");
    if (checkgiohang) {
        checkgiohang.addEventListener("click", function (event) {
            if (cart.length === 0) {
                event.preventDefault(); // Ngăn chuyển hướng mặc định
                document.getElementById("emptyCartModal").style.display = "flex";
            }
            // Nếu giỏ hàng không trống, cho phép chuyển hướng bình thường (href="Thanhtoan.html")
        });
    }

    // Đóng modal và chuyển hướng
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }

    document.querySelector("#emptyCartModal .close").addEventListener("click", function () {
        closeModal("emptyCartModal");
        window.location.href = "Trangchu.html";
    });

    document.getElementById("closeEmptyCartModalBtn").addEventListener("click", function () {
        closeModal("emptyCartModal");
        window.location.href = "Trangchu.html";
    });
});