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
    const cartKey = `cart_${loggedInUser}`; // Ví dụ: "cart_Admin"
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
            return;
        }

        let totalQuantity = 0;
        let totalPrice = 0;

        cart.forEach((item, index) => {
            // Chuyển đổi giá từ chuỗi có định dạng (ví dụ: "589,000 đ") thành số
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
        document.getElementById("total-price").innerText = totalPrice.toLocaleString("vi-VN") + " đ";
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

    // Hiển thị giỏ hàng ban đầu
    renderCart();
});