var products = 

[
    //product 1
   { "image": "images/Koa_Case.jpg", 
    "product": "Koa Wood Case",
     "price": 39.99
    },
    //product 2
   { "image": "images/Carbon_Case.jpg", 
    "product": "Carbon Fiber Case", 
    "price": 29.99
    },
    //product 3
    { "image": "images/Clear_Case.jpg", 
    "product": "Clear Case", 
    "price": 24.99
    },
    //product 4
    { "image": "images/Silicone_Case.jpg", 
        "product": "Silicone Case", 
        "price": 34.99
        },
    //product 5
    { "image": "images/Wallet_Case.jpg", 
        "product": "Wallet Case", 
        "price": 49.99
        }
];

if(typeof module != 'undefined'){
    module.exports.products = products;
}