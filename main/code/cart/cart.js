totalBike = JSON.parse(localStorage.getItem('cartItems')) || ['Panigale V4 R', 'Multistrada'];
async function getDataCart() {
  try {
    const response = await fetch("../data.json");

    if(!response.ok){
      throw new Error("Could not fetch the data!");
    }

    bikeData = await response.json(); // Store the JSON data in a variable
    displayCartItems(bikeData);
  }
  catch(error){
    console.error(error);
  }
}
function remove(bikeName) {
  window.alert('Removed');
  console.log("Removing bike:", bikeName);
  totalBike = totalBike.filter(bike => bike !== bikeName); 
  localStorage.setItem('cartItems', JSON.stringify(totalBike)); 
  console.log("Updated cart items:", totalBike);
  getDataCart();
 
}

async function displayCartItems(data){
  let updateHTML = ``;
  let DOM = document.querySelector('#bikeCart');
  let bikeData = await data
  
  let filteredBike = bikeData.filter((bike) => totalBike.includes(bike.product));

  filteredBike.forEach((item) => {
    updateHTML += `
    <section class="infoContainer">
      <div class="bikeUnit">
        <div class="bikeCont">
          <img src="../${item.img}" alt="">
        </div>
        <input type="number" class="Qty" min="0" max="5" value="1">
      </div>

      <div class="bikeInfo">
        <div class="wordBlock">
          <span class="productName">${item.product}</span>
          <br>
          <span class="productInfo">${item.power}, ${item.torque}, ${item.weight}</span>
          <br>
          <span class="priceINR">${item.price} INR</span>
        </div>

        <div class="btnBlock">
          <button class="buyNow">Buy Now</button>
          <button class="remove" onclick="remove('${item.product}');">Remove</button>
        </div>
      </div>
    </section>
    `

  })
  
  DOM.innerHTML = updateHTML;
}



document.addEventListener("DOMContentLoaded", getDataCart);//fetched the data

