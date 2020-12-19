
// Samuel Rivers Assignment 3
// Referenced and Borrowed Code from Assignment 3 Examples (Professor Port), Assignment 2, and w3source.com
// Gained help from Kevin Nguyen, Alvin Amira, and Meghan Nagai

    var cases_array = [ 
        {   
            "item": "Koa Wood Case",
            "price": 39.99,
            "image": "Koa_Case.jpg"
        },

        {   
            "item": "Carbon Fiber Case", 
            "price": 29.99,
            "image": "Carbon_Case.jpg"
        },

        {   
            "item": "Clear Case", 
            "price": 24.99,
            "image": "Clear_Case.jpg"
        },

        {   
            "item": "Silicone Case", 
            "price": 34.99,
            "image": "Silicone_Case.jpg"
        },
  
        {   
            "item": "Wallet Case", 
            "price": 49.99,
            "image": "Wallet_Case.jpg"
        }
    ];

    var charging_array = [ 
        {
            "item": "2m USB to Lightning Cable",
            "price": 29.99,
            "image": "USBcable.jpg"
        },
      
        {
            "item": "2m USB-C to Lightning Cable",
            "price": 29.99,
            "image": "USBCcable.jpg"
        },
        
        {
            "item": "18W Dual USB/USB-C Wall Charger",
            "price": 39.99,
            "image": "wallcharger.jpg"
        },
      
        {
            "item": "Dual Wall Charger",
            "price": 29.99,
            "image": "carcharger.jpg"
        },
      
        {
            "item": "Dual Wireless Charging Pad",
            "price": 39.99,
            "image": "wirelesscharger.jpg"
        },
      
        {
            "item": "10000maH Portable Battery Pack",
            "price": 49.99,
            "image": "batterypack.jpg"
        }
    ];

    var audio_array = [
        {
            "item": "Wired Earbuds",
            "price": 17.99,
            "image": "wiredbuds.jpg"
        },
      
        {
            "item": "Wireless Earbuds",
            "price": 54.99,
            "image": "wirelessbuds.jpg"
        },
        
        {
            "item": "Noise-Cancellation Headphone",
            "price": 119.99,
            "image": "headphone.jpg"
        },
      
        {
            "item": "Wireless Sports Earbuds",
            "price": 34.99,
            "image": "sportsbuds.jpg"
        },
      
        { 
            "item": "Portable Speaker",
            "price": 149.99,
            "image": "speaker.jpg"
        },
    ];
    var the_products = {
        "Cases": cases_array,
        "Charging": charging_array,
        "Audio": audio_array
    }

    if(typeof module != 'undefined') {
        module.exports.the_products = the_products;
      }