
async function getData() {
  try {
    const response = await fetch("./data.json");

    if(!response.ok){
      throw new Error("Could not fetch the data!");
    }

    const data = await response.json(); // Store the JSON data in a variable
    displayTopModels(data);
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
        <img src="${bike.img}" alt="desertx rally" class="modelImg">
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
  window.location.href = "./bike.html"; // Redirect to bike.html
}



function displayModelDetails(jsonData, bikeName){
    
 
    const selectedBike = jsonData.find((bike) => bike.product === bikeName);
    console.log(selectedBike.product)
    const updateBodyDOM = document.querySelector(".bod");


      updateBodyDOM.innerHTML = `
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
      
    
   
    sessionStorage.removeItem("bikeName");
}

document.addEventListener("DOMContentLoaded", getData);//fetched the data