// 产品数据
const products = [
    {
        id: 1,
        name: "经典烤全鸡",
        description: "整只烤鸡，外皮金黄酥脆，肉质鲜嫩多汁，经典口味",
        price: 68.00,
        originalPrice: 78.00,
        badge: "热销",
        icon: "fas fa-drumstick-bite",
        imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 2,
        name: "蜜汁烤鸡翅",
        description: "精选鸡翅中，秘制蜜汁腌制，甜而不腻",
        price: 38.00,
        originalPrice: 45.00,
        badge: "新品",
        icon: "fas fa-utensil-spoon",
        imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 3,
        name: "香辣烤鸡腿",
        description: "大块鸡腿肉，香辣口味，适合喜欢辣味的顾客",
        price: 42.00,
        originalPrice: 50.00,
        badge: "辣味",
        icon: "fas fa-pepper-hot",
        imageUrl: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 4,
        name: "奥尔良烤鸡",
        description: "奥尔良风味，香气浓郁，肉质鲜嫩",
        price: 65.00,
        originalPrice: 75.00,
        badge: "推荐",
        icon: "fas fa-star",
        imageUrl: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 5,
        name: "家庭套餐",
        description: "包含整只烤鸡+鸡翅+薯条+饮料，适合3-4人",
        price: 128.00,
        originalPrice: 158.00,
        badge: "套餐",
        icon: "fas fa-home",
        imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 6,
        name: "麻辣烤鸡",
        description: "川味麻辣，刺激过瘾，适合重口味爱好者",
        price: 58.00,
        originalPrice: 68.00,
        badge: "麻辣",
        icon: "fas fa-fire",
        imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 7,
        name: "蒜香烤鸡",
        description: "蒜香浓郁，外焦里嫩，蒜香爱好者的首选",
        price: 62.00,
        originalPrice: 72.00,
        badge: "蒜香",
        icon: "fas fa-garlic",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 8,
        name: "黑椒烤鸡",
        description: "黑胡椒风味，微辣鲜香，西式口味",
        price: 60.00,
        originalPrice: 70.00,
        badge: "西式",
        icon: "fas fa-pepper",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format"
    }
];

// 购物车数据
let cart = JSON.parse(localStorage.getItem('roastChickenCart')) || [];

// DOM元素
const productGrid = document.getElementById('productGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const cancelCheckout = document.getElementById('cancelCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const summaryItems = document.getElementById('summaryItems');
const summaryPrice = document.getElementById('summaryPrice');
const toast = document.getElementById('toast');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCart();
    setupEventListeners();
});

// 渲染产品
function renderProducts() {
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.name}" class="product-img">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <div>
                        <span class="price">¥${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price">¥${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                </div>
                <div class="product-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${product.id}">-</button>
                        <input type="text" class="quantity-input" value="1" readonly data-id="${product.id}">
                        <button class="quantity-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">加入购物车</button>
                </div>
            </div>
        `;

        productGrid.appendChild(productCard);
    });

    // 为产品按钮添加事件监听器
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const quantity = parseInt(quantityInput.value);
            addToCart(productId, quantity);
        });
    });

    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            let quantity = parseInt(quantityInput.value);
            quantityInput.value = quantity + 1;
        });
    });

    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantityInput = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
        });
    });
}

// 购物车功能
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            icon: product.icon
        });
    }

    updateCart();
    showToast(`${product.name} 已添加到购物车`);

    // 保存到localStorage
    localStorage.setItem('roastChickenCart', JSON.stringify(cart));
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();

    // 保存到localStorage
    localStorage.setItem('roastChickenCart', JSON.stringify(cart));
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
        }
    }
    updateCart();

    // 保存到localStorage
    localStorage.setItem('roastChickenCart', JSON.stringify(cart));
}

function updateCart() {
    // 更新购物车数量
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // 更新总价
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = `¥${total.toFixed(2)}`;

    // 渲染购物车物品
    renderCartItems();
}

function renderCartItems() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.appendChild(emptyCart);
        return;
    }

    emptyCart.style.display = 'none';

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.imageUrl}" alt="${item.name}" class="cart-item-img">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">¥${item.price.toFixed(2)} × ${item.quantity}</div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-quantity">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    // 为购物车按钮添加事件监听器
    document.querySelectorAll('.cart-item-quantity .decrease').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item && item.quantity > 1) {
                updateCartQuantity(productId, item.quantity - 1);
            } else {
                removeFromCart(productId);
            }
        });
    });

    document.querySelectorAll('.cart-item-quantity .increase').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateCartQuantity(productId, item.quantity + 1);
            }
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// 结账功能
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('购物车为空，请先添加商品');
        return;
    }

    // 更新订单摘要
    updateOrderSummary();

    // 显示结账模态框
    checkoutModal.classList.add('active');
}

function updateOrderSummary() {
    summaryItems.innerHTML = '';

    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} × ${item.quantity}</span>
            <span>¥${(item.price * item.quantity).toFixed(2)}</span>
        `;
        summaryItems.appendChild(summaryItem);
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    summaryPrice.textContent = `¥${total.toFixed(2)}`;
}

function submitOrder(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (!name || !phone || !address) {
        showToast('请填写所有必填字段');
        return;
    }

    // 模拟订单提交
    const orderData = {
        name,
        phone,
        address,
        notes: document.getElementById('notes').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        orderId: 'ORD' + Date.now().toString().slice(-8)
    };

    // 清空购物车
    cart = [];
    localStorage.removeItem('roastChickenCart');
    updateCart();

    // 关闭模态框
    checkoutModal.classList.remove('active');
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');

    // 显示成功消息
    showToast(`订单提交成功！订单号：${orderData.orderId}`, 5000);

    // 重置表单
    checkoutForm.reset();
}

// Toast通知
function showToast(message, duration = 3000) {
    toast.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, duration);
}

// 事件监听器
function setupEventListeners() {
    // 购物车开关
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    // 结账按钮
    checkoutBtn.addEventListener('click', openCheckoutModal);

    // 结账模态框
    closeModal.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    cancelCheckout.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
    });

    checkoutForm.addEventListener('submit', submitOrder);

    // 点击结账模态框外部关闭
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove('active');
        }
    });

    // 移动端菜单切换
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // 窗口调整时重置移动端菜单
    window.addEventListener('resize', () => {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

// 初始化移动端菜单
window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = 'none';
    }
});