
let updateDetailsHTML = ``;
const updateBodyDOM = document.querySelector(".bod");

function displayModelDetails(jsonData, bikeName){

  const selectedBike = jsonData.filter((bike) => bike.product === bikeName)[0];
 
    updateDetailsHTML = `
    <nav id="navBar">
    
    <ul class="part-1">
      <a href="./index.html"><img src="../img/ducati_id.png" alt="Ducati" id="logo"></a>
      <li><span style="color: #F5003B;">Models</span></li>
      <li>News</li>
      <li>Contact us</li>
    </ul>

    <ul class="part-2">
      <form action="submit" id="formBlock">
        <input type="text" placeholder="Search" id="inputData">
        <button type="submit" class="submitBtn"><img src="../img/magnifying-glass.png" alt=""></button>
      </form>
      
      <a href="" class="shopImg"><img src="../img/online-shopping.png" alt=""></a>
   </ul>
  
  </nav>

  <main id="bikeMain">
    <section class="imgSec">
      <div class="fadetop"></div>
      <img src="${selectedBike.bg}" alt="${selectedBike.product}">
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
      <div class="btnCont"><button class="AddToCart">ADD TO CART</button></div>
    </section>
  </main>
    `
    
  
  updateBodyDOM.innerHTML = updateDetailsHTML;
  localStorage.clear();
}

async function getBikeData() {
  try {
    const response = await fetch("./data.json");

    if(!response.ok){
      throw new Error("Could not fetch the data!");
    }

    const data = await response.json(); // Store the JSON data in a variable
    let bikeName = localStorage.getItem("bikeName");
    displayModelDetails(data, bikeName);
  }
  catch(error){
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", getBikeData);