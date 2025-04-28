let products = JSON.parse(localStorage.getItem('products')) || [];

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const productIdField = document.getElementById('productId');
const productNameField = document.getElementById('productName');
const productPriceField = document.getElementById('productPrice');
const productImageField = document.getElementById('productImage');

function showProducts(){
   productList.innerHTML = ' ';

   products.forEach((product,index)=>{
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
    <div>
    <img src = "{images.image}" alt="Product Image">
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    </div>
    <div class = "product-action">
    <button onclick = "editProduct(${index})">Edit</button>
    <button onclick = "deleteProduct(${index})">Delete</button>
    </div>
    `;

    productList.appendChild(productCard);
   });
}

productForm.addEventListener('submit',function(e){
    e.preventDefault();

    const name = productNameField.value;
    const price = productPriceField.value;
    const id = productIdField.value;

    const file = productImageField.files[0];

    if(file){
        const reader = new FileReader();
        reader.onloadend = function(){
            const image = reader.result;

            if(id){
                productId[id] = { name, price , image};
            }else{
                products.push({name, price , image})
            }
            localStorage.setItem('products',JSON.stringify(products));
            showProducts();
            productForm.reset();
            productIdField.value = ' ';
        };
        reader.readAsDataURL(file);
    }else{
        if(id){
            const oldImage = products[id].image;
            products[id] = {name , price , image: oldImage};
            localStorage.setItem('products',JSON.stringify(products));
            showProducts();
            productForm.reset();
            productIdField.value = '';
        }
    }
});

function editProduct(index){
    const product = products[index];
    productNameField.value = product.name;
    productPriceField.value = product.price;
    productIdField.value = product.id;
}

function deleteProduct(index){
   
    if(confirm('Are you sure you want to delete this product?')){
        products.splice(index, 1);
        localStorage.setItem('products',JSON.stringify(products));
    }
}


showProducts();