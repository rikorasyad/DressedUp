let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')
let isLogin = false


cartIcon.onclick = () => {
    if(!isLogin){
        alert("Login dulu")
    } else {
        cart.classList.add("active")

    }
};

closeCart.onclick = () => {
    cart.classList.remove("active")
}




if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons);
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    let addCart = document.getElementsByClassName('add-cart')
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i]
        button.addEventListener('click', addCartClicked)
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}
function buyButtonClicked(){
    alert('Your Order is placed')
    let cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}


function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal()
}

function addCartClicked(event) {
    let button = event.target
    let shopProducts = button.parentElement
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText
    let price = shopProducts.getElementsByClassName('price')[0].innerText
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title, price, productImg);
    updateTotal()
}
function addProductToCart(title, price, productImg) {
    if(isLogin){
        let cartShopBox = document.createElement('div')
        cartShopBox.classList.add('cart-box')
        let cartItems = document.getElementsByClassName('cart-content')[0]
        let cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
        for (let i = 0; i < cartItemsNames.length; i++) {
            if(cartItemsNames[i].innerText == title) {
                alert('You have already add this item to cart')
                return
            }
        }
        let cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        
        <i class='bx bxs-trash-alt cart-remove'></i>`
            cartShopBox.innerHTML = cartBoxContent
            cartItems.append(cartShopBox)
        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
    } else {
        alert("login dulu")
    }

}


function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('cart-price')[0]
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace("$", ""))
        let quantity = quantityElement.value
        total = total + price * quantity
    }
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    
}
let db_pembeli = [
    {
        idPembeli: '001',
        username: 'nadya',
        password: '1234',
        nama: 'Nadya Rere',
        alamat: 'tangerang',
        email: 'nadyarere@gmail.com',
    },
    {
        idPembeli: '002',
        username: 'yana',
        password: '123',
        nama: 'yaya nara',
        alamat: 'jakarta',
        email: 'yayanara@gmail.com',
    }
]

    const logoutBtn = () => {
        document.getElementById("btn-logout").style.display = "none";
        document.getElementById("btn-login").style.display = "block";
        alert("Berhasil Log out")
    return false
    
    }
function login() {
    let uname = document.getElementById("username").value
    let pass = document.getElementById("password").value

    let flag = false
    let namaUser = ''
    for (let i = 0; i < db_pembeli.length; i++) {
        const element = db_pembeli[i];
        if (uname === element.username && pass === element.password) {
            flag = true
            namaUser =element.nama
        }
    }

    if (flag === true) {
        isLogin = true
        closeForm()
        document.getElementById("btn-login").style.display = "none";
    document.getElementById("btn-logout").style.display = "block";
        alert(`${namaUser} berhasil login`)

        return false
    } else {
        alert("pass username tidak sama")
        location.reload()
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
