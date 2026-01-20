document.addEventListener('DOMContentLoaded', () => {
    // --- Global Elements ---
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartBtn = document.getElementById('closeCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSubtotalSpan = document.getElementById('cartSubtotal');
    const cartCountSpan = document.getElementById('cartCount');

    // --- Global Search ---
    (function setupGlobalSearch() {
        const form = document.getElementById('siteSearchForm');
        const input = document.getElementById('siteSearchInput');
        if (!form || !input) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const q = (input.value || '').trim();
            const url = new URL('/shop.html', window.location.origin);
            if (q) url.searchParams.set('q', q);
            window.location.href = url.toString();
        });
    })();

    // --- Product Data ---
    const products = [
        // --- Oud (New Category) ---
        { id: 'oud-for-greatness', name: 'Oud For Greatness', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/OudForGreatness.png', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'oud-wood', name: 'Oud Wood', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/OudWood.png', hoverImage: 'assets/Oud/OudWoodHover.jpg', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'ghilaf-e-kaaba', name: 'Ghilaf E Kaaba', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/GhilafEKaaba.png', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'tobacco-oud', name: 'Tobacco Oud', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/TobaccoOud.png', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'white-musk', name: 'White Musk', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/WhiteMusk.png', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'oud-splash', name: 'Oud Ispahan', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/OudSplash.png', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'umar-nawab', name: 'Umar Nawab', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/UmarNawab.png', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'hajre-aswad', name: 'Hajre Aswad', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/HajreAswad.png', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'ameer-ul-oud', name: 'Ameer Ul Oud', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/AmeerUlOud.png', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'white-oud', name: 'White Oud', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/WhiteOud.png', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'kashmiri-oud', name: 'Kashmiri Oud', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/kashmirioud.jpeg', sizes: ['50ml'], category: 'oud', premium: false },
        { id: 'black-oud', name: 'Black Oud', tagline: 'Oud Collection', price: 1850, image: 'assets/Oud/blackoud.jpeg', sizes: ['50ml'], category: 'oud', premium: false },
        // --- Women ---
        //  { id: 'nawab-signature-girl', name: 'Nawab Signature Perfume for Girl', tagline: 'Signature Series', price: 2450, image: 'assets/Nawab-Begum-100ml.png', sizes: ['50ml'], category: 'women', premium: true },
        { id: 'rani', name: 'Rani', tagline: 'Women Collection', price: 2150, image: 'assets/rani.jpeg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'hif-coco-chanel', name: 'H.I.F.', tagline: 'Inspired by Coco Chanel', price: 2150, image: 'assets/hif-coco-chanel.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'butterfly-gucci-bloom', name: 'Butterfly', tagline: 'Inspired by Gucci Bloom', price: 2150, image: 'assets/butterfly-gucci-bloom.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'nanhi', name: 'Nanhi', tagline: 'Women Collection', price: 2150, image: 'assets/nanhi.jpeg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'gorgeous-tommy-girl', name: 'Gorgeous', tagline: 'Inspired by Tommy Girl', price: 2150, image: 'assets/gorgeous-tommy-girl.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'shelter-bomb-shell', name: 'Shelter', tagline: 'Inspired by Bomb Shell', price: 2150, image: 'assets/shelter4.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'golden-girl-guess-gold', name: 'Golden Girl', tagline: 'Inspired by Guess Gold', price: 2150, image: 'assets/golden-girl-guess-gold.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'flora-moves-gucci-flora', name: 'Flora Moves', tagline: 'Inspired by Gucci Flora', price: 2150, image: 'assets/flora-moves-gucci-flora.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'gull-baccarat-rouge-540', name: 'Gull', tagline: 'Inspired by Baccarat Rouge 540', price: 2150, image: 'assets/gull-baccarat-rouge-540.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'crystal-jadore', name: 'Crystal', tagline: 'Inspired by J’adore', price: 2150, image: 'assets/crystal-jadore.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'touch-burberry-body', name: 'Touch', tagline: 'Inspired by Burberry Body', price: 2150, image: 'assets/touch.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'rainbow-black-opium', name: 'Rainbow', tagline: 'Inspired by Black Opium', price: 2150, image: 'assets/Special-Oud-100ml.jpeg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'platinum-dg-light-blue', name: 'Platinum', tagline: 'Inspired by D&J Light Blue', price: 2150, image: 'assets/platinum.jpg', sizes: ['50ml'], category: 'women', premium: false },
        { id: 'aroma-breeze-spring-flower', name: 'Aroma Breeze', tagline: 'Inspired by Spring Flower', price: 2450, image: 'assets/aroma-breeze-spring-flower.jpg', sizes: ['50ml'], category: 'women', premium: true },

        // --- Unisex ---
        { id: 'angel-paradise-city-of-stars', name: 'Angel Paradise', tagline: 'Inspired by City of Stars', price: 2450, image: 'assets/angel-paradise-city-of-stars.jpg', sizes: ['50ml'], category: 'unisex', premium: true },
        { id: 'time-less-no4', name: 'Time less', tagline: 'Inspired by Thomas Kosmala No.4', price: 2150, image: 'assets/timeless.jpg', sizes: ['50ml'], category: 'unisex', premium: false },
        { id: 'white-oud-premium', name: 'White Oud Premium', tagline: 'Inspired by Premium Oud', price: 2450, image: 'assets/White-Oud-Premium-100ml.jpeg', sizes: ['50ml'], category: 'unisex', premium: true },
        { id: 'imperial-oud-ispahan', name: 'Imperial Oud', tagline: 'Inspired by Oud Ispahan', price: 2150, image: 'assets/imperial-oud.jpg', sizes: ['50ml'], category: 'unisex', premium: false },
        { id: 'vip-royal-oud', name: 'VIP Royal Oud', tagline: 'Inspired by Royal Oud', price: 2150, image: 'assets/vip-royal-oud-hover.jpg', sizes: ['50ml'], category: 'unisex', premium: false },
        { id: 'persona-chocolate-musk', name: 'Persona', tagline: 'Inspired by Chocolate Musk', price: 2150, image: 'assets/Persona.jpg', sizes: ['50ml'], category: 'unisex', premium: false },
        { id: 'king-srk', name: 'KING SRK', tagline: 'Inspired by Signature Series', price: 2450, image: 'assets/Special-Oud-100ml.jpeg', sizes: ['50ml'], category: 'unisex', premium: true },
        { id: 'prime-ck-one', name: 'Prime', tagline: 'Inspired by CK One', price: 2150, image: 'assets/prime.jpg', sizes: ['50ml'], category: 'unisex', premium: false },

        // --- Men ---
        { id: 'swag', name: 'Swag 365', tagline: 'Woody Aromatic Fragrance for Men & Women', price: 2450, image: 'assets/swag.jpeg', sizes: ['50ml'], category: 'men', premium: true },
        { id: 'nawab-signature-men', name: 'Nawab Signature Perfume for Men', tagline: 'Signature Series', price: 2450, image: 'assets/Nawab-Signature-Men.jpg', sizes: ['50ml'], category: 'men', premium: true },
        { id: 'sher', name: 'Sher', tagline: 'Mens Collection', price: 2150, image: 'assets/sher.jpeg', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'kingdom-bvlgari-aqva', name: 'Kingdom', tagline: 'Inspired by Bvlgari Aqva', price: 2150, image: 'assets/kingdom.jpg', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'era-oud-wood', name: 'Era', tagline: 'Inspired by Oud Wood', price: 2150, image: 'assets/era.jpg', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'aura-issey-miyake', name: 'Aura', tagline: 'Inspired by Issey Miyake', price: 2150, image: 'assets/aura.jpg', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'crush-sauvage-dior', name: 'Crush', tagline: 'Inspired by Sauvage Dior', price: 2150, image: 'assets/crush.jpg', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'vip-gold-one-million', name: 'VIP Gold', tagline: 'Inspired by 1 Million', price: 2450, image: 'assets/vip-gold.jpg', sizes: ['50ml'], category: 'men', premium: true },
        { id: 'sigma-tuscan-leather', name: 'SIGMA', tagline: 'Inspired by Tuscan Leather', price: 2450, image: 'assets/sigma.jpg', sizes: ['50ml'], category: 'men', premium: true },
        { id: 'freedom-office-for-men', name: 'Freedom', tagline: 'Inspired by Office For Men', price: 2150, image: 'assets/freedom.jpg', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'alpha-man-creed-aventus', name: 'Alpha Man', tagline: 'Inspired by Aventus', price: 2150, image: 'assets/alfa-men.jpg', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'mbf-invictus-legend', name: 'M.B.F', tagline: 'Inspired by Invictus Legend', price: 2150, image: 'assets/mbf.jpg', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'lethal-blue-d-chanel', name: 'Lethal', tagline: 'Inspired by Bleu de Chanel', price: 2150, image: 'assets/lethal-hover.jpg', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'power-terre-dhermes', name: 'Power', tagline: 'Inspired by Terre d’Hermes', price: 2150, image: 'assets/Nawab-H-Boss-100ml.png', sizes: ['50ml'], category: 'men', premium: false },
        { id: 'life-hugo-boss', name: 'Life', tagline: 'Inspired by Hugo Boss', price: 2150, image: 'assets/life.jpg', sizes: ['50ml'], category: 'men', premium: false },
    ];

    // --- Sale pricing helper ---
    // We treat these current prices as 'sale' prices and show an original price = sale + 300
    const SALE_PRICE_SET = new Set([1500, 1850, 1950, 2150, 2250, 2450, 2490]);

    function getSaleInfoForPrice(price) {
        // price may be number or string like 'Rs. 1,950'
        const p = typeof price === 'number' ? price : parseInt(String(price).replace(/[^0-9]/g, ''), 10) || 0;
        if (SALE_PRICE_SET.has(p)) {
            return { original: p + 300, sale: p };
        }
        return null;
    }

    function transformExistingPriceElements() {
        // Transform static product cards already in HTML (index, category sections)
        document.querySelectorAll('.product-card').forEach(card => {
            const priceEl = card.querySelector('.product-price');
            if (!priceEl) return;
            const raw = priceEl.textContent || '';
            const num = parseInt(raw.replace(/[^0-9]/g, ''), 10);
            const saleInfo = getSaleInfoForPrice(num);
            if (saleInfo) {
                // Build the same price markup used by the shop renderer
                const priceHtml = `<div class="price-block"><span class="original-price">Rs. ${saleInfo.original.toLocaleString()}</span> <span class="sale-price">Rs. ${saleInfo.sale.toLocaleString()}</span></div>`;
                // Replace the existing price element with the new price block (so markup matches shop page)
                priceEl.insertAdjacentHTML('afterend', priceHtml);
                priceEl.remove();

                // Add sale badge if not present
                if (!card.querySelector('.sale-badge')) {
                    const badge = document.createElement('div');
                    badge.className = 'sale-badge';
                    badge.textContent = 'Sale';
                    // Prefer inserting before floating-actions so badge matches shop layout
                    const floating = card.querySelector('.floating-actions');
                    if (floating) card.insertBefore(badge, floating);
                    else card.insertBefore(badge, card.firstChild);
                }
            }
        });
    }

    // --- Cart Functions ---
    let cart = JSON.parse(localStorage.getItem('noirOrCart')) || [];

    function saveCart() {
        localStorage.setItem('noirOrCart', JSON.stringify(cart));
        updateCartUI();
    }

    function findProductById(id) {
        return products.find(p => p.id === id);
    }

    function updateCartUI() {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let subtotal = 0;
            let totalItems = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p class="text-center text-muted mt-5">Your cart is empty.</p>';
            } else {
                cart.forEach(item => {
                    const product = findProductById(item.id);
                    if (!product) return;
                    const itemTotal = product.price * item.quantity;
                    subtotal += itemTotal;
                    totalItems += item.quantity;
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item', 'd-flex', 'align-items-center');
                    cartItemDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        <div class="cart-item-details flex-grow-1">
                            <h6 class="mb-0 text-white">${product.name}</h6>
                            <small class="text-muted">${item.size ? item.size + ' / ' : ''}Rs. ${product.price.toLocaleString()}</small>
                            <div class="quantity-controls d-flex align-items-center mt-1">
                                <button class="btn btn-sm decrease-qty" data-id="${item.id}" data-size="${item.size || ''}">-</button>
                                <span class="mx-2 text-white">${item.quantity}</span>
                                <button class="btn btn-sm increase-qty" data-id="${item.id}" data-size="${item.size || ''}">+</button>
                                <button class="btn btn-sm btn-link text-danger ms-auto remove-item" data-id="${item.id}" data-size="${item.size || ''}">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>`;
                    cartItemsContainer.appendChild(cartItemDiv);
                });
            }
            if (cartSubtotalSpan) cartSubtotalSpan.textContent = `Rs. ${subtotal.toLocaleString()}`;
            if (cartCountSpan) cartCountSpan.textContent = totalItems;
        }

        if (document.getElementById('checkoutOrderSummary')) {
            updateCheckoutSummary();
        }
    }

    function addToCart(productId, quantity = 1, size = null) {
        const product = findProductById(productId);
        if (!product) return;

        if (product.sizes && product.sizes.length > 0 && size === null) {
            size = product.sizes[0];
        }

        const existingItemIndex = cart.findIndex(item => item.id === productId && item.size === size);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ id: productId, quantity, size });
        }
        saveCart();
        if (cartSidebar) cartSidebar.classList.add('show');
    }

    function updateQuantity(productId, size, change) {
        const targetSize = size === 'null' ? null : size;
        const itemIndex = cart.findIndex(item => item.id === productId && item.size === targetSize);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            saveCart();
        }
    }

    function removeItem(productId, size) {
        const targetSize = size === 'null' ? null : size;
        cart = cart.filter(item => !(item.id === productId && item.size === targetSize));
        saveCart();
    }

    function clearCart() {
        cart = [];
        saveCart();
    }

    // --- Global Event Listeners ---
    if (cartIcon) cartIcon.addEventListener('click', () => cartSidebar.classList.toggle('show'));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('show'));

    // --- Cart Item Event Delegation ---
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const increaseBtn = e.target.closest('.increase-qty');
            const decreaseBtn = e.target.closest('.decrease-qty');
            const removeBtn = e.target.closest('.remove-item');

            if (increaseBtn) {
                updateQuantity(increaseBtn.dataset.id, increaseBtn.dataset.size, 1);
            } else if (decreaseBtn) {
                updateQuantity(decreaseBtn.dataset.id, decreaseBtn.dataset.size, -1);
            } else if (removeBtn) {
                removeItem(removeBtn.dataset.id, removeBtn.dataset.size);
            }
        });
    }

    // --- Global delegation for floating Add-to-Cart & Quick-View on home/cards ---
    document.body.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            e.preventDefault();
            const productId = addBtn.dataset.productId;
            addToCart(productId);
            return;
        }
        const quickBtn = e.target.closest('.quick-view-btn');
        if (quickBtn) {
            // Bootstrap handles showing the modal via data attributes; we just ensure dataset is present
            // Nothing else required here.
        }
    });

    // --- Global Quick View modal population (works on all pages) ---
    (function setupGlobalQuickView() {
        const quickViewModal = document.getElementById('quickViewModal');
        if (!quickViewModal) return;

        quickViewModal.addEventListener('show.bs.modal', (event) => {
            const trigger = event.relatedTarget;
            if (!trigger) return;
            const productId = trigger.dataset.productId;
            const product = findProductById(productId);
            if (!product) return;

            quickViewModal.querySelector('.modal-title').textContent = product.name;
            quickViewModal.querySelector('.quick-view-image').src = product.image;
            quickViewModal.querySelector('.quick-view-description').textContent = product.tagline || '';
            const qvSale = getSaleInfoForPrice(product.price);
            quickViewModal.querySelector('.quick-view-price').innerHTML = qvSale
                ? `<span class="original-price">Rs. ${qvSale.original.toLocaleString()}</span> <span class="sale-price">Rs. ${qvSale.sale.toLocaleString()}</span>`
                : `Rs. ${product.price.toLocaleString()}`;

            const sizeSelect = quickViewModal.querySelector('.quick-view-size');
            const sizeContainer = sizeSelect.closest('div');
            sizeSelect.innerHTML = '';
            if (product.sizes && product.sizes.length) {
                product.sizes.forEach(size => {
                    const option = document.createElement('option');
                    option.value = size;
                    option.textContent = size;
                    sizeSelect.appendChild(option);
                });
                sizeContainer.style.display = 'block';
            } else {
                sizeContainer.style.display = 'none';
            }
            quickViewModal.querySelector('.quick-view-add-to-cart').dataset.productId = productId;
        });

        const addBtn = quickViewModal.querySelector('.quick-view-add-to-cart');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                const sizeSelect = quickViewModal.querySelector('.quick-view-size');
                const sizeContainer = sizeSelect.closest('div');
                const selectedSize = sizeContainer.style.display !== 'none' ? sizeSelect.value : null;
                addToCart(productId, 1, selectedSize);
                const modalInstance = bootstrap.Modal.getInstance(quickViewModal);
                if (modalInstance) modalInstance.hide();
            });
        }
    })();

    // --- Lazy Loading: images and background images ---
    (function setupLazyLoading() {
        // Ensure native lazy loading attribute exists on images
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        });

        // Support images that use data-src (deferred src)
        const dataSrcImages = document.querySelectorAll('img[data-src]');
        if (dataSrcImages.length) {
            if ('IntersectionObserver' in window) {
                const io = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const el = entry.target;
                            el.src = el.dataset.src;
                            if (el.dataset.srcset) el.srcset = el.dataset.srcset;
                            el.removeAttribute('data-src');
                            observer.unobserve(el);
                        }
                    });
                }, { rootMargin: '200px 0px' });
                dataSrcImages.forEach(img => io.observe(img));
            } else {
                dataSrcImages.forEach(img => {
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-src');
                });
            }
        }

        // Lazy-load background images via data-bg attribute
        const bgEls = document.querySelectorAll('[data-bg]');
        if (bgEls.length) {
            if ('IntersectionObserver' in window) {
                const bgObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const el = entry.target;
                            el.style.backgroundImage = `url('${el.dataset.bg}')`;
                            el.removeAttribute('data-bg');
                            observer.unobserve(el);
                        }
                    });
                }, { rootMargin: '200px 0px' });
                bgEls.forEach(el => bgObserver.observe(el));
            } else {
                bgEls.forEach(el => {
                    el.style.backgroundImage = `url('${el.dataset.bg}')`;
                    el.removeAttribute('data-bg');
                });
            }
        }
    })();

    // --- Marquee: make banner text continuous (duplicate content for seamless loop) ---
    (function setupMarqueeLoop() {
        const marquees = document.querySelectorAll('.free-delivery-banner .marquee');
        if (!marquees.length) return;

        marquees.forEach(m => {
            // Extract raw text (including icons) and trim
            const rawHTML = m.innerHTML.trim();
            // Create inner container and two copies for seamless scroll
            const inner = document.createElement('div');
            inner.className = 'marquee-inner';

            const item1 = document.createElement('span');
            item1.className = 'marquee-item';
            item1.innerHTML = rawHTML;

            const item2 = item1.cloneNode(true);

            inner.appendChild(item1);
            inner.appendChild(item2);

            // Replace original content
            m.innerHTML = '';
            m.appendChild(inner);
        });
    })();

    // --- Checkout Page Logic (UPDATED FOR WEB3FORMS) ---
    const checkoutOrderSummary = document.getElementById('checkoutOrderSummary');
    const checkoutForm = document.getElementById('checkoutForm');
    const SHIPPING_COST = 0;

    function updateCheckoutSummary() {
        if (!checkoutOrderSummary) return;

        const shippingHtml = SHIPPING_COST > 0 ? `
            <div class="totals-row">
                <span>Shipping:</span>
                <span>Rs. ${SHIPPING_COST.toLocaleString()}</span>
            </div>
        ` : '';

        checkoutOrderSummary.innerHTML = `
            <h5 class="mb-4">Order Summary</h5>
            <div class="item-list"></div>
            <div class="totals-row">
                <span>Subtotal:</span>
                <span id="checkoutSubtotal"></span>
            </div>
            ${shippingHtml}
            <div class="totals-row total">
                <span>Total:</span>
                <span id="checkoutTotal"></span>
            </div>
        `;

        const itemListDiv = checkoutOrderSummary.querySelector('.item-list');
        let subtotal = 0;

        if (cart.length === 0) {
            itemListDiv.innerHTML = '<p class="text-center text-muted">Your cart is empty.</p>';
            const placeOrderBtn = checkoutForm?.querySelector('button[type="submit"]');
            if (placeOrderBtn) placeOrderBtn.disabled = true;
        } else {
            cart.forEach(item => {
                const product = findProductById(item.id);
                if (!product) return;

                const itemTotal = product.price * item.quantity;
                subtotal += itemTotal;

                itemListDiv.innerHTML += `
                    <div class="cart-item d-flex align-items-center">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        <div class="cart-item-details flex-grow-1">
                            <h6 class="mb-0 text-white">${product.name}</h6>
                            <small class="text-muted">${item.size ? item.size + ' / ' : ''}Qty: ${item.quantity} x Rs. ${product.price.toLocaleString()}</small>
                        </div>
                        <span class="text-gold">Rs. ${itemTotal.toLocaleString()}</span>
                    </div>
                `;
            });
            checkoutOrderSummary.querySelector('#checkoutSubtotal').textContent = `Rs. ${subtotal.toLocaleString()}`;
            checkoutOrderSummary.querySelector('#checkoutTotal').textContent = `Rs. ${(subtotal + SHIPPING_COST).toLocaleString()}`;
            const placeOrderBtn = checkoutForm?.querySelector('button[type="submit"]');
            if (placeOrderBtn) placeOrderBtn.disabled = false;
        }
    }

    if (checkoutOrderSummary || checkoutForm) {
        updateCheckoutSummary();

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', async (e) => {
                e.preventDefault(); // Stop the form from submitting normally

                // 1. Validate required fields
                let allValid = true;
                checkoutForm.querySelectorAll('[required]').forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('is-invalid');
                        allValid = false;
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });

                if (!allValid) {
                    alert('Please fill in all required shipping details.');
                    return;
                }

                const submitButton = checkoutForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Placing Order...';

                // 2. Prepare order details for the email
                const orderId = 'NW' + Math.floor(Math.random() * 900000 + 100000);

                // Filter out any invalid cart items and calculate subtotal
                const validCartItems = cart.filter(item => {
                    const product = findProductById(item.id);
                    if (!product) {
                        console.warn(`Product with ID "${item.id}" not found in products array`);
                        return false;
                    }
                    return true;
                });

                // Check if there are any valid items in the cart
                if (validCartItems.length === 0) {
                    alert('Your cart appears to be empty or contains invalid items. Please add some products to your cart first.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Place Order';
                    return;
                }

                // Update the cart to only include valid items
                cart = validCartItems;
                saveCart();

                const subtotal = validCartItems.reduce((acc, item) => {
                    const product = findProductById(item.id);
                    return acc + product.price * item.quantity;
                }, 0);
                const total = subtotal + SHIPPING_COST;

                let orderSummaryText = validCartItems.map(item => {
                    const p = findProductById(item.id);
                    return `${item.quantity} x ${p.name} (${item.size || 'Standard Size'}) @ Rs. ${p.price.toLocaleString()} each`;
                }).join('\n'); // Use newline for a clean list in the email

                orderSummaryText += `\n-----------------------------------`;
                orderSummaryText += `\nSubtotal: Rs. ${subtotal.toLocaleString()}`;
                if (SHIPPING_COST > 0) {
                    orderSummaryText += `\nShipping: Rs. ${SHIPPING_COST.toLocaleString()}`;
                }
                orderSummaryText += `\nTOTAL: Rs. ${total.toLocaleString()}`;

                // 3. Populate the hidden form fields
                document.getElementById('formOrderId').value = orderId;
                document.getElementById('formOrderSummary').value = orderSummaryText;
                document.getElementById('formTotalAmount').value = `Rs. ${total.toLocaleString()}`;

                // Add a subject line for the email
                const formData = new FormData(checkoutForm);
                formData.append("subject", `New Order From Nawab Fragrances - #${orderId}`);

                // 4. Submit the form data using Fetch API
                try {
                    const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (result.success) {
                        // 5. If submission is successful, show the modal and clear the cart
                        const orderSuccessModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
                        document.getElementById('orderIdDisplay').textContent = `#${orderId}`;
                        orderSuccessModal.show();
                        clearCart();
                        checkoutForm.reset();
                    } else {
                        console.error("Error from Web3Forms:", result);
                        alert("There was an error submitting your order. Please try again.");
                    }
                } catch (error) {
                    console.error("Network Error:", error);
                    alert("A network error occurred. Please check your connection and try again.");
                } finally {
                    // Re-enable the button regardless of success or failure
                    submitButton.disabled = false;
                    submitButton.textContent = 'Place Order';
                }
            });
        }
    }

    // --- The rest of your script (shop page logic, etc.) remains the same ---
    // ...
    // --- Shop Page Filtering and Pagination Logic ---
    const productGrid = document.getElementById('productGrid');
    if (productGrid) {
        const paginationContainer = document.getElementById('paginationContainer');
        const sortByFilter = document.getElementById('sortByFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        const priceFilter = document.getElementById('priceFilter');

        let currentPage = 1;
        let itemsPerPage = 15; // default for shop; category pages may override
        let currentProducts = [...products];

        function displayProducts(page) {
            productGrid.innerHTML = '';
            currentPage = page;
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedItems = currentProducts.slice(startIndex, endIndex);

            if (paginatedItems.length === 0) {
                productGrid.innerHTML = `<div class="col-12 text-center py-5"><p class="text-light-gray fs-4">No products found matching your criteria.</p></div>`;
                return;
            }

            paginatedItems.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('col');
                const saleInfo = getSaleInfoForPrice(product.price);
                const priceHtml = saleInfo
                    ? `<div class="price-block"><span class="original-price">Rs. ${saleInfo.original.toLocaleString()}</span> <span class="sale-price">Rs. ${saleInfo.sale.toLocaleString()}</span></div>`
                    : `<h4 class="product-price">Rs. ${product.price.toLocaleString()}</h4>`;
                // Prepare data-hover-src attribute when a secondary image exists on the product
                const hoverSrc = (product.images && product.images.length > 1) ? product.images[1] : (product.hoverImage || '');
                const hoverAttr = hoverSrc ? ` data-hover-src="${hoverSrc}"` : '';

                productCard.innerHTML = `
                    <div class="product-card text-center">
                        ${saleInfo ? '<div class="sale-badge">Sale</div>' : ''}
                        <div class="floating-actions">
                            <button class="fabtn quick-view-btn" data-bs-toggle="modal" data-bs-target="#quickViewModal" data-product-id="${product.id}" aria-label="Quick View"><i class="fas fa-search"></i></button>
                            <button class="fabtn add-to-cart-btn" data-product-id="${product.id}" aria-label="Add to Cart"><i class="fas fa-plus"></i></button>
                        </div>
                        <a href="/product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}" class="img-fluid" loading="lazy"${hoverAttr}></a>
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-desc">${product.tagline}</p>
                        ${priceHtml}
                    </div>
                `;
                productGrid.appendChild(productCard);
            });
            // After adding the page cards, attach hover swap listeners where applicable
            setupHoverImageSwap();
        }

        function setupPagination() {
            if (!paginationContainer) return;
            paginationContainer.innerHTML = '';
            const pageCount = Math.ceil(currentProducts.length / itemsPerPage);
            if (pageCount <= 1) return;

            const createPageLink = (text, pageNum, isDisabled = false, isActive = false) => {
                const li = document.createElement('li');
                li.className = `page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;
                const a = document.createElement('a');
                a.className = 'page-link';
                a.href = '#';
                a.innerHTML = text;
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!isDisabled) {
                        renderShopPage(pageNum);
                    }
                });
                li.appendChild(a);
                return li;
            };

            paginationContainer.appendChild(createPageLink('← Prev', currentPage - 1, currentPage === 1));
            for (let i = 1; i <= pageCount; i++) {
                paginationContainer.appendChild(createPageLink(i, i, false, i === currentPage));
            }
            paginationContainer.appendChild(createPageLink('Next →', currentPage + 1, currentPage === pageCount));
        }

        function applyFiltersAndSort() {
            let filteredProducts = [...products];

            // Keyword query from search
            const params = new URLSearchParams(window.location.search);
            const query = (params.get('q') || '').trim().toLowerCase();
            if (query) {
                filteredProducts = filteredProducts.filter(p =>
                    p.name.toLowerCase().includes(query) ||
                    (p.tagline && p.tagline.toLowerCase().includes(query)) ||
                    p.id.toLowerCase().includes(query)
                );
            }

            const category = categoryFilter ? categoryFilter.value : 'all';
            if (category !== 'all') {
                if (category === 'premium') {
                    filteredProducts = filteredProducts.filter(p => p.premium === true);
                } else if (category === 'men' || category === 'women') {
                    // Include unisex products when viewing men or women categories
                    filteredProducts = filteredProducts.filter(p => p.category === category || p.category === 'unisex');
                } else {
                    filteredProducts = filteredProducts.filter(p => p.category === category);
                }
            }

            const price = priceFilter ? priceFilter.value : 'all';
            if (price === 'under2000') {
                filteredProducts = filteredProducts.filter(p => p.price < 2000);
            } else if (price === '2000-2300') {
                filteredProducts = filteredProducts.filter(p => p.price >= 2000 && p.price <= 2300);
            } else if (price === '2300plus') {
                filteredProducts = filteredProducts.filter(p => p.price > 2300);
            }

            const sortBy = sortByFilter ? sortByFilter.value : 'relevance';
            if (sortBy === 'price-asc') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-desc') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            // When viewing men or women categories, ensure unisex products appear last
            if (category === 'men' || category === 'women') {
                const primary = filteredProducts.filter(p => p.category !== 'unisex');
                const unisex = filteredProducts.filter(p => p.category === 'unisex');
                filteredProducts = [...primary, ...unisex];
            }

            // Premium category: force specific order when relevance is selected
            if (category === 'premium' && sortBy === 'relevance') {
                const priorityOrder = ['swag', 'nawab-signature-men'];
                const top = filteredProducts
                    .filter(p => priorityOrder.includes(p.id))
                    .sort((a, b) => priorityOrder.indexOf(a.id) - priorityOrder.indexOf(b.id));
                const rest = filteredProducts.filter(p => !priorityOrder.includes(p.id));
                filteredProducts = [...top, ...rest];
            }

            currentProducts = filteredProducts;
            renderShopPage(1);
        }

        function renderShopPage(page = 1) {
            displayProducts(page);
            setupPagination();
        }

        applyFiltersAndSort();

        if (sortByFilter) sortByFilter.addEventListener('change', applyFiltersAndSort);
        if (categoryFilter) categoryFilter.addEventListener('change', applyFiltersAndSort);
        if (priceFilter) priceFilter.addEventListener('change', applyFiltersAndSort);

        // Quick View setup moved to global scope below

        // Expose simple category filter for category pages
        window.filterProductsByCategory = function (categoryKey) {
            if (!categoryKey) {
                currentProducts = [...products];
            } else if (categoryKey === 'premium') {
                const premiumList = products.filter(p => p.premium === true);
                const priorityOrder = ['swag', 'nawab-signature-men'];
                const top = premiumList
                    .filter(p => priorityOrder.includes(p.id))
                    .sort((a, b) => priorityOrder.indexOf(a.id) - priorityOrder.indexOf(b.id));
                const rest = premiumList.filter(p => !priorityOrder.includes(p.id));
                currentProducts = [...top, ...rest];
            } else if (categoryKey === 'men' || categoryKey === 'women') {
                // When filtering by men or women, include unisex products as well
                const matched = products.filter(p => p.category === categoryKey || p.category === 'unisex');
                const primary = matched.filter(p => p.category !== 'unisex');
                const unisex = matched.filter(p => p.category === 'unisex');
                currentProducts = [...primary, ...unisex];
            } else {
                currentProducts = products.filter(p => p.category === categoryKey);
            }
            // On dedicated category pages, show all items (no pagination cutoff)
            itemsPerPage = currentProducts.length || 15;
            renderShopPage(1);
        };
    }

    // --- Smooth, non-intrusive animations ---
    (function setupRevealAnimations() {
        const supportsIO = 'IntersectionObserver' in window;
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!supportsIO || prefersReduced) {
            // If not supported or user prefers reduced motion, ensure elements are visible.
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('reveal-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

        // Auto-tag common blocks if not already marked
        const candidates = [
            '.hero-section h1',
            '.hero-section h2',
            '.info-section .col-md-6',
            '.featured-collection .product-card',
            '.how-to-choose-section .col-md-4',
            '.newsletter-section .container > *',
            '.product-grid .product-card',
            '.product-detail-section .main-image, .product-detail-section .product-title, .product-detail-section .product-description, .product-detail-section .product-price, .product-detail-section .size-selector, .product-detail-section .quantity-selector',
            '.product-tabs .tab-content',
            '.recommended-products-section .product-card',
            '.about-hero *',
            '.history-section .timeline-item',
            '.brand-values-section .col-md-4',
            '.faq-section .accordion-item',
            '.contact-form, .company-info',
            '.checkout-section .order-summary, .checkout-section .shipping-details-form'
        ];

        const elements = candidates
            .map(sel => Array.from(document.querySelectorAll(sel)))
            .flat()
            .filter(Boolean);

        elements.forEach((el, index) => {
            if (!el.classList.contains('reveal-visible')) {
                el.classList.add('reveal', 'fade-up');
                // Stagger within siblings for nicer effect
                el.style.transitionDelay = `${Math.min((index % 6) * 60, 240)}ms`;
                observer.observe(el);
            }
        });
    })();

    // Helper generators for product detail fallbacks
    function generateDefaultDescription(product) {
        const base = product.tagline || 'A refined, long-lasting fragrance crafted for everyday elegance.';
        if (product.category === 'women') {
            return `${product.name} is an elegant feminine blend. ${base} Notes unfold from bright florals to a soft, sensual base.`;
        }
        if (product.category === 'men') {
            return `${product.name} is a confident, modern masculine scent. ${base} Fresh top notes transition to an aromatic heart and a warm, woody base.`;
        }
        return `${product.name} is a versatile unisex composition. ${base} Balanced from a fresh opening to a smooth, comforting dry-down.`;
    }

    function generateDefaultIngredients(product) {
        const top = 'Top: Bergamot, Lemon, Pink Pepper';
        const mid = product.category === 'women'
            ? 'Middle: Jasmine, Rose, Peony'
            : (product.category === 'men' ? 'Middle: Lavender, Clary Sage, Geranium' : 'Middle: Neroli, Orange Blossom, Tea');
        const base = product.category === 'women'
            ? 'Base: Musk, Sandalwood, Vanilla'
            : (product.category === 'men' ? 'Base: Cedarwood, Vetiver, Amber' : 'Base: Musk, Cedarwood, Amber');
        return [top, mid, base];
    }

    function generateDummyReviews(product) {
        return [
            { user: 'Ayesha R.', rating: 5, text: `Absolutely loved ${product.name}! Long-lasting and received so many compliments.` },
            { user: 'Hassan M.', rating: 4, text: `Great projection for the price. ${product.name} works for both day and night.` },
            { user: 'Sara K.', rating: 5, text: `Smells premium and well-balanced. Will definitely repurchase ${product.name}.` }
        ];
    }

    // --- Product Detail Page: Dynamic Rendering by ?id= ---
    const productDetailSection = document.querySelector('.product-detail-section');
    if (productDetailSection) {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        const product = productId ? findProductById(productId) : null;

        if (product) {
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) pageTitle.textContent = `${product.name} – Nawab Fragrances`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', product.description || product.tagline || product.name);
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', `${product.name} – Nawab Fragrances`);
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.setAttribute('content', product.tagline || product.description || product.name);
            const ogImage = document.querySelector('meta[property="og:image"]');
            if (ogImage) ogImage.setAttribute('content', product.image);
            const ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.setAttribute('content', window.location.href);

            const breadcrumbProductName = document.getElementById('breadcrumbProductName');
            if (breadcrumbProductName) breadcrumbProductName.textContent = product.name;

            const productDetailPageTitle = document.getElementById('productDetailPageTitle');
            if (productDetailPageTitle) productDetailPageTitle.textContent = product.name;

            const productDetailPageDesc = document.getElementById('productDetailPageDesc');
            if (productDetailPageDesc) productDetailPageDesc.textContent = product.description || product.tagline || '';

            const productDetailPagePrice = document.getElementById('productDetailPagePrice');
            if (productDetailPagePrice) {
                const pdSale = getSaleInfoForPrice(product.price);
                productDetailPagePrice.innerHTML = pdSale
                    ? `<span class="original-price">Rs. ${pdSale.original.toLocaleString()}</span> <span class="sale-price">Rs. ${pdSale.sale.toLocaleString()}</span>`
                    : `Rs. ${product.price.toLocaleString()}`;
            }

            const mainProductImage = document.getElementById('mainProductImage');
            const thumbnailGallery = document.getElementById('thumbnailGallery');
            const galleryImages = (product.images && product.images.length ? product.images : [product.image]);
            if (mainProductImage && thumbnailGallery) {
                mainProductImage.src = galleryImages[0];
                mainProductImage.alt = product.name;
                thumbnailGallery.innerHTML = '';
                galleryImages.forEach((imgSrc, index) => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = `${product.name} - View ${index + 1}`;
                    img.classList.add('img-fluid', 'me-2', 'mb-2', 'p-1');
                    if (index === 0) img.classList.add('active');
                    img.addEventListener('click', () => {
                        mainProductImage.src = imgSrc;
                        thumbnailGallery.querySelectorAll('img').forEach(i => i.classList.remove('active'));
                        img.classList.add('active');
                    });
                    thumbnailGallery.appendChild(img);
                });
            }

            const sizeSelect = document.getElementById('productSizeSelect');
            if (sizeSelect) {
                sizeSelect.innerHTML = '';
                const container = sizeSelect.closest('.form-group');
                if (product.sizes && product.sizes.length) {
                    product.sizes.forEach(size => {
                        const option = document.createElement('option');
                        option.value = size;
                        option.textContent = size;
                        sizeSelect.appendChild(option);
                    });
                    if (container) container.style.display = 'block';
                } else {
                    if (container) container.style.display = 'none';
                }
            }

            const qtyInput = document.getElementById('productQtyInput');
            const decreaseQtyBtn = document.getElementById('decreaseQty');
            const increaseQtyBtn = document.getElementById('increaseQty');
            if (qtyInput && decreaseQtyBtn && increaseQtyBtn) {
                decreaseQtyBtn.addEventListener('click', () => {
                    let currentQty = parseInt(qtyInput.value);
                    if (currentQty > 1) qtyInput.value = currentQty - 1;
                });
                increaseQtyBtn.addEventListener('click', () => {
                    let currentQty = parseInt(qtyInput.value);
                    qtyInput.value = currentQty + 1;
                });
            }

            const addToCartDetailBtn = document.getElementById('addToCartDetailBtn');
            if (addToCartDetailBtn) {
                addToCartDetailBtn.addEventListener('click', () => {
                    const quantity = parseInt(qtyInput ? qtyInput.value : 1);
                    const selectedSize = sizeSelect && sizeSelect.closest('.form-group') && sizeSelect.closest('.form-group').style.display !== 'none' ? sizeSelect.value : null;
                    addToCart(product.id, quantity, selectedSize);
                });
            }

            const descriptionTabContent = document.getElementById('descriptionTabContent');
            const ingredientsTabContent = document.getElementById('ingredientsTabContent');
            const reviewsTabContent = document.getElementById('reviewsTabContent');
            if (descriptionTabContent) descriptionTabContent.innerHTML = `<p>${product.description || generateDefaultDescription(product)}</p>`;
            if (ingredientsTabContent) {
                const ingredients = product.ingredients && product.ingredients.length ? product.ingredients : generateDefaultIngredients(product);
                ingredientsTabContent.innerHTML = '<ul>' + ingredients.map(i => `<li>${i}</li>`).join('') + '</ul>';
            }
            if (reviewsTabContent) {
                const reviews = generateDummyReviews(product);
                reviewsTabContent.innerHTML = reviews.map(r => {
                    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
                    return `
                        <div class="review mb-4 pb-3 border-bottom border-dark-gray">
                            <div class="stars">${stars}</div>
                            <div class="reviewer-name text-white mb-1">${r.user}</div>
                            <p class="text-light-gray">${r.text}</p>
                        </div>
                    `;
                }).join('');
            }

            const recommendedProductsContainer = document.getElementById('recommendedProductsContainer');
            if (recommendedProductsContainer) {
                recommendedProductsContainer.innerHTML = '';
                const otherProducts = products.filter(p => p.id !== product.id);
                const selected = otherProducts.slice(16, 20);
                selected.forEach(recProduct => {
                    const saleInfo = getSaleInfoForPrice(recProduct.price);
                    const priceHtml = saleInfo
                        ? `<div class="price-block"><span class="original-price">Rs. ${saleInfo.original.toLocaleString()}</span> <span class="sale-price">Rs. ${saleInfo.sale.toLocaleString()}</span></div>`
                        : `<h2 class="product-price">Rs. ${recProduct.price.toLocaleString()}</h2>`;

                    // Determine hoverAttr for recommended product (support images[1] or hoverImage)
                    const recHoverSrc = (recProduct.images && recProduct.images.length > 1) ? recProduct.images[1] : (recProduct.hoverImage || '');
                    const recHoverAttr = recHoverSrc ? ` data-hover-src="${recHoverSrc}"` : '';

                    recommendedProductsContainer.innerHTML += `
                        <div class="col">
                            <div class="product-card text-left">
                                ${saleInfo ? '<div class="sale-badge">Sale</div>' : ''}
                                <div class="floating-actions">
                                    <button class="fabtn quick-view-btn" data-bs-toggle="modal" data-bs-target="#quickViewModal" data-product-id="${recProduct.id}" aria-label="Quick View"><i class="fas fa-search"></i></button>
                                    <button class="fabtn add-to-cart-btn" data-product-id="${recProduct.id}" aria-label="Add to Cart"><i class="fas fa-plus"></i></button>
                                </div>
                                <a href="/product.html?id=${recProduct.id}"><img src="${recProduct.image}" alt="${recProduct.name}" class="img-fluid" loading="lazy"${recHoverAttr}></a>
                                <h3 class="product-name">${recProduct.name}</h3>
                                <p class="product-desc">${recProduct.tagline || ''}</p>
                                ${priceHtml}
                            </div>
                        </div>`;
                });
            }
        } else {
            productDetailSection.innerHTML = `<div class="container-fluid main-content text-center py-5">
                <h1 class="text-gold">Product Not Found</h1>
                <p class="text-light-gray">The perfume you are looking for does not exist or has been moved.</p>
                <a href="/shop.html" class="btn btn-gold mt-4">Browse All Perfumes</a>
            </div>`;
        }
    }

    // Scroll reveal: fade-in only for product cards in featured sections (landing)
    (function setupScrollReveal() {
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const targets = Array.from(document.querySelectorAll('.featured-collection .product-card'));
        if (targets.length === 0) return;

        targets.forEach(el => el.classList.add('reveal'));

        if (reduce || !('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('reveal-visible'));
            return;
        }

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

        targets.forEach(el => io.observe(el));
    })();

    // Final call to update cart on every page load
    updateCartUI();
    // Transform any static price elements on the page to show sale markup
    transformExistingPriceElements();
    // Setup hover image swapping for product cards (static + dynamic)
    setupHoverImageSwap();

    // --- Mark current page nav link active (so it shows gold) ---
    (function markActiveNavLink() {
        try {
            // get current file name (last segment). Treat root as index.html
            let currentFile = window.location.pathname.split('/').pop() || 'index.html';
            if (!currentFile || currentFile === '/') currentFile = 'index.html';

            // normalize index variants (when using '/' or '/index.html')
            if (currentFile === '') currentFile = 'index.html';

            // Mark .nav-link elements
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                try {
                    const linkHref = new URL(link.getAttribute('href') || '', window.location.origin).pathname;
                    const linkFile = linkHref.split('/').pop() || 'index.html';
                    if (linkFile === '' || linkFile === '/') {
                        if (currentFile === 'index.html') link.classList.add('active');
                        else link.classList.remove('active');
                    } else if (linkFile === currentFile) {
                        link.classList.add('active');
                    } else {
                        // also handle cases where the nav parent is a directory link (e.g., '/shop/')
                        // if currentFile starts with linkFile (loose match), mark active
                        link.classList.toggle('active', linkFile && currentFile && linkFile === currentFile);
                    }
                } catch (e) { /* ignore malformed hrefs */ }
            });

            // Also mark dropdown items (if any) and ensure parent dropdown toggles reflect active state
            document.querySelectorAll('.navbar .dropdown-item').forEach(item => {
                try {
                    const href = new URL(item.getAttribute('href') || '', window.location.origin).pathname;
                    const file = href.split('/').pop() || 'index.html';
                    if (file === currentFile) {
                        item.classList.add('active');
                        // mark the dropdown toggle (parent .nav-link) as active too if present
                        const parentToggle = item.closest('.dropdown').querySelector('.nav-link');
                        if (parentToggle) parentToggle.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                } catch (e) { }
            });
        } catch (err) {
            // harmless if anything fails
            console.warn('markActiveNavLink error', err);
        }
    })();

    /**
     * Enable image swap on hover for product cards.
     * Priority for hover image source:
     * 1. img[data-hover-src]
     * 2. product object 'images[1]' or 'hoverImage' matched by current src
     */
    function setupHoverImageSwap() {
        // Find all product images inside product-card
        const cards = Array.from(document.querySelectorAll('.product-card'));
        if (!cards || cards.length === 0) return;

        cards.forEach(card => {
            const img = card.querySelector('img');
            if (!img) return;

            // Avoid attaching listeners multiple times
            if (img.dataset.hoverInitialized === '1') return;
            img.dataset.hoverInitialized = '1';

            // Determine hover source
            const explicitHover = img.getAttribute('data-hover-src');
            let hoverSrc = explicitHover && explicitHover.trim() ? explicitHover.trim() : null;

            // If no explicit hover, try to find product in products[] by matching src filename
            if (!hoverSrc) {
                const imgSrc = img.getAttribute('src') || '';
                const match = products.find(p => p.image && imgSrc.endsWith(p.image));
                if (match) {
                    if (match.images && match.images.length > 1) hoverSrc = match.images[1];
                    else if (match.hoverImage) hoverSrc = match.hoverImage;
                }
            }

            // Helper to attach listeners once we have a verified hoverSrc
            function attachHoverListeners(resolvedHoverSrc) {
                // Preload hover image for smooth swap
                const preloaded = new Image();
                preloaded.src = resolvedHoverSrc;

                // On mouse enter/leave swap src
                const originalSrc = img.getAttribute('src');
                const onEnter = () => { img.setAttribute('src', resolvedHoverSrc); };
                const onLeave = () => { img.setAttribute('src', originalSrc); };

                img.addEventListener('mouseenter', onEnter);
                img.addEventListener('mouseleave', onLeave);

                // Also support focus for keyboard users
                img.addEventListener('focus', onEnter);
                img.addEventListener('blur', onLeave);

                // Touch devices: toggle on touchstart (first touch shows hover, second navigates)
                let touched = false;
                img.addEventListener('touchstart', (e) => {
                    if (!touched) {
                        e.preventDefault(); // prevent immediate navigation
                        img.setAttribute('src', resolvedHoverSrc);
                        touched = true;
                        setTimeout(() => touched = false, 800);
                    }
                }, { passive: false });
            }

            if (hoverSrc) {
                // If hoverSrc already known (data-hover-src or product.images), verify it loads
                const verifier = new Image();
                verifier.onload = () => attachHoverListeners(hoverSrc);
                verifier.onerror = () => {/* silently ignore missing hover image */ };
                verifier.src = hoverSrc;
            } else {
                // Try constructing a '-hover' filename variant from the current src
                const imgSrc = img.getAttribute('src') || '';
                const dotIndex = imgSrc.lastIndexOf('.');
                if (dotIndex > -1) {
                    const candidate = imgSrc.slice(0, dotIndex) + '-hover' + imgSrc.slice(dotIndex);
                    const tester = new Image();
                    tester.onload = () => {
                        // candidate exists, attach listeners
                        attachHoverListeners(candidate);
                    };
                    tester.onerror = () => {
                        // no hover available; nothing to do
                    };
                    tester.src = candidate;
                }
            }
        });
    }
});