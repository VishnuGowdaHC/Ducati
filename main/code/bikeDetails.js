async function getBikeData() {
  try {
    const response = await fetch("./data.json");

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
const bikeName = sessionStorage.getItem('bikeName') || 'Panigale V4 R'
console.log(bikeName)
async function displayBike() {
  const data = await getBikeData();
  if (data) {
    displayModelDetails(data, bikeName);
  } else {
    console.error("Data could not be retrieved");
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  await displayBike(); // Ensure DOM is ready before displaying bikes
});


