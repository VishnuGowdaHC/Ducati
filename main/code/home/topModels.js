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
          <p class="modelPrice">${bike.price} INR</p>
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


function selectBike(selectedBike)
{
  let updateBike = ``;
  let bikeHTML = document.querySelector('.selectedModel');
  const BikeModel = DATA;

  //Filtering the selected model details
  let filteredBike = BikeModel.filter((bike) => bike.model === selectedBike);
  console.log(filteredBike);
  filteredBike.forEach((Bike) => {
    updateBike += `
    <div class="modelContainer js-model">
          <img src="../${Bike.img}" alt="${Bike.product}" class="modelImg">
          <div>
            <p class="modelName">${Bike.product}</p>
            <p class="modelPrice">${Bike.price} INR</p>
          </div>
          <button class="readMore" onclick="bikeDisplay('${Bike.product}')">Read more</button>
        </div>
    `
  });
 bikeHTML.innerHTML = updateBike;

}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}



document.addEventListener("DOMContentLoaded", getData);//fetched the data