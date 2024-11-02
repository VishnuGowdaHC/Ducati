
const topModelDOM = document.querySelector('.topModels'); //getting DOM
let updateHTML = ``;//initializing DOM



//function to generate dynamic html
function displayTopModels(data) {
    //sorting the data for the most expensive bike
    const sortedInfo = data.sort((a, b) => {
      const priceA = parseInt(a.price);//getting only numbers from data
      const priceB = parseInt(b.price);
      return priceB - priceA;//sort in descending
    });

    const topBike = sortedInfo.slice(0, 10); //slicing top 10
  
    topBike.forEach(bike => {
      updateHTML += `
    <div class="modelContainer">
        <img src="${bike.img}" alt="desertx rally" class="modelImg">
        <div>
          <p class="modelName">${bike.product}</p>
          <p class="modelPrice">${bike.price}</p>
        </div>
        <a href="./bike.html"><button class="readMore" onclick="bikeDisplay('${bike.product}')">Read more</button></a>
      </div>
    `;
    });
    topModelDOM.innerHTML = updateHTML; 
}


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



document.addEventListener("DOMContentLoaded", getData);//fetched the data
  


function bikeDisplay(bikeInfo){
  localStorage.setItem("bikeName", bikeInfo);
}


