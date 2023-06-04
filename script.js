
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const menuData = await response.json();

    
        console.log('Menu:', menuData);

        
        const container = document.getElementById('menu-container');


        menuData.forEach(item => {
            
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');

    
            const image = document.createElement('img');
            image.src = item.imgSrc;
            image.alt = item.name;

            
            const name = document.createElement('h3');
            name.textContent = item.name;

            
            const price = document.createElement('p');
            price.textContent = 'Price: ' + item.price;

            
            menuItem.appendChild(image);
            menuItem.appendChild(name);
            menuItem.appendChild(price);

        
            container.appendChild(menuItem);

        });
        return menuData;
    } catch (error) {
        console.error('Error:', error);
    }
}



function takeOrder(menu) {
    return new Promise(resolve => {
        setTimeout(() => {
            const ordersContainer = document.getElementById('orders-container');
            
            ordersContainer.innerHTML = ''; 


            const orders = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * menu.length);
        const order = menu[randomIndex];
        orders.push(order);

        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');

        const image = document.createElement('img');
        image.src = order.imgSrc;
        image.alt = order.name;

        const name = document.createElement('h3');
        name.textContent = order.name;

        const price = document.createElement('p');
        price.textContent = 'Price: ' + order.price;

        orderItem.appendChild(image);
        orderItem.appendChild(name);
        orderItem.appendChild(price);

        ordersContainer.appendChild(orderItem);
      }

            resolve(orders);
        }, 2500);
    });
}





function orderPrep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderStatus = {
                order_status: true,
                paid: false,
            };
            if (orderStatus.order_status && !orderStatus.paid) {
                resolve(orderStatus);
            } else {
                reject(new Error("Failed to prepare the order."));
            }
        }, 1500);
    });
}


function payOrder() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderStatus = {
                order_status: true,
                paid: true,
            };
            if (orderStatus.order_status && orderStatus.paid) {
                resolve(orderStatus);
            } else {
                reject(new Error("Failed to process the payment."));
            }
        }, 1000);
    });
}


function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

window.onload = async function () {
    const menuData = await getMenu();
    

    const order = await takeOrder(menuData);
    console.log('Order:', order);

    const orderStatus = await orderPrep();
    console.log('Order Status:', orderStatus);

    const paidOrder = await payOrder();
    console.log('Order Status:', paidOrder);

    thankyouFnc();
};