let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
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
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
        
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
                <td class="text-end">${item.price.toLocaleString()} đ</td>
                <td class="text-end">${(item.price * item.quantity).toLocaleString()} đ</td>
                <td class="text-end">
                    <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Xóa</button>
                </td>
            </tr>
        `;
        cartContainer.innerHTML += itemHTML;
    });
        
    document.getElementById("total-quantity").innerText = totalQuantity;
    document.getElementById("total-price").innerText = totalPrice.toLocaleString() + " đ";
}
        
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    saveCartAndRender();
}
        
function removeItem(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?")) {
        cart.splice(index, 1);
        saveCartAndRender();
    }
}
        
function saveCartAndRender() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
        
renderCart();