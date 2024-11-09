
let totalBike = JSON.parse(localStorage.getItem('cartItems'))  || ['panigale v4 r', 'multistrada'];
async function getBikeData() {
  try {
    const response = await fetch("../data.json");

    if(!response.ok){
      throw new Error("Could not fetch the data!");
    }

    const data = await response.json(); // Store the JSON data in a variable
  
    return data;
  }
  catch(error){
    console.error(error);
  }
}


async function displayModelDetails(jsonData, bikeName){
    
 
  const selectedBike = await jsonData.find((bike) => bike.product === bikeName);
  console.log(selectedBike.product)
  const updateBodyDOM = document.querySelector("#bikeMain");


    updateBodyDOM.innerHTML =`
    <section class="imgSec">
      <div class="fadetop"></div>
      <img src="../${selectedBike.bg}" alt="${selectedBike.product}">
    </section>
  
    <section class="specSec">
      <p id="specs">SPECS</p>
      <hr>
      <div class="specContainer">
        <div class="itemCont">
          <span class="title">Power</span>
          <span class="value">${selectedBike.power}</span>
        </div>
        <div class="itemCont">
          <span class="title">Torque</span>
          <span class="value">${selectedBike.torque}</span>
        </div>
        <div class="itemCont">
          <span class="title">Wet weight no fuel</span>
          <span class="value">${selectedBike.weight}</span>
        </div>
        <div class="price">
          <span class="priceText">Price - </span>
          <span class="priceValue">${selectedBike.price}</span>
        </div>
      </div>
      <div class="btnCont"><button class="AddToCart" onclick="displayCart('${selectedBike.product}');">ADD TO CART</button></div>
    </section>
    `;
 
  sessionStorage.removeItem("bikeName");
}


const bikeName = sessionStorage.getItem('bikeName') || 'Panigale V4 R'


async function displayBike() {
  const data = await getBikeData();
  if (data) {
    displayModelDetails(data, bikeName);
  } else {
    console.error("Data could not be retrieved");
  }
}

function displayCart(bikename){
  if(bikename){
    totalBike.push(bikename);
    localStorage.setItem('cartItems', JSON.stringify(totalBike));
  }
  else {
    console.error('not found');
  }
  
}


document.addEventListener("DOMContentLoaded", async () => {
  await displayBike(); // Ensure DOM is ready before displaying bikes
});


