let DATA = [];
async function getData() {
  try {
    const response = await fetch("../data.json");

    if(!response.ok){
      throw new Error("Could not fetch the data!");
    }

    DATA = await response.json(); // Store the JSON data in a variable
    displayTopModels(DATA);
  }
  catch(error){
    console.error(error);
  }
}






//function to generate dynamic html
function displayTopModels(data) {
  const topModelDOM = document.querySelector('.topModels'); //getting DOM
  let updateHTML = ``;//initializing DOM

      //sorting the data for the most expensive bike
      const sortedInfo = data.sort((a, b) => {
        const priceA = parseInt(a.price);//getting only numbers from data
        const priceB = parseInt(b.price);
        return priceB - priceA;//sort in descending
      });

    const topBike = sortedInfo.slice(0, 10); //slicing top 5
  
    topBike.forEach(bike => {
      updateHTML += `
    <div class="modelContainer">
        <img src="../${bike.img}" alt="desertx rally" class="modelImg">
        <div>
          <p class="modelName">${bike.product}</p>
          <p class="modelPrice">${bike.price}</p>
        </div>
       <button class="readMore" onclick="bikeDisplay('${bike.product}')">Read more</button>
      </div>
    `;
    });
    
    topModelDOM.innerHTML = updateHTML; 
}

function bikeDisplay(bikeInfo) {
  sessionStorage.setItem("bikeName", bikeInfo);
  window.location.href = "../bikeDetails/bike.html"; // Redirect to bike.html
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
        <div class="btnCont"><button class="AddToCart" onclick="addToCart('${selectedBike.product}')">ADD TO CART</button></div>
      </section>
      `
      
    console.log(updateBodyDOM.innerHTML)
   
    sessionStorage.removeItem("bikeName");
}

function selectBike(selectedBike)
{
  let updateBike = ``;
  let bikeHTML = document.querySelector('.selectedModel');
  const BikeModel = DATA;

  let filteredBike = BikeModel.filter((bike) => bike.model === selectedBike);
  console.log(filteredBike);
  filteredBike.forEach((Bike) => {
    updateBike += `
    <div class="modelContainer js-model">
          <img src="../${Bike.img}" alt="${Bike.product}" class="modelImg">
          <div>
            <p class="modelName">${Bike.product}</p>
            <p class="modelPrice">${Bike.price}</p>
          </div>
          <button class="readMore" onclick="bikeDisplay('${Bike.product}')">Read more</button>
        </div>
    `
  });
 bikeHTML.innerHTML = updateBike;

}
document.addEventListener("DOMContentLoaded", getData);//fetched the data