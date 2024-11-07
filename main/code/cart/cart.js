let totalBike = ``;

function addToCart(bikeName) { 
  console.log("helo");
  let updateHTML = '';
  console.log("heeelo");
  console.log("hilo");
  let Data = DATA;
  console.log("belo");
  const foundBike = Data.find((bike) => bike.product === bikeName);
   

    if (!foundBike) {
      console.error("Bike not found in data!");
      return;
    }
    console.log("belo");
    
  updateHTML = `
  <section class="infoContainer">
      <div class="bikeUnit">
        <div class="bikeCont">
          <img src="../${foundBike.img}" alt="">
        </div>
        <input type="number" class="Qty" min="0" max="5" value="1">
      </div>

      <div class="bikeInfo">
        <div class="wordBlock">
          <span class="productName">${foundBike.product}</span>
          <br>
          <span class="productInfo">${foundBike.power}, ${foundBike.torque}, ${foundBike.weight}</span>
          <br>
          <span class="priceINR">${foundBike.price}</span>
        </div>

        <div class="btnBlock">
          <button class="buyNow">Buy Now</button>
          <button class="remove">Remove</button>
        </div>
      </div>
    </section>
  `
  console.log(updateHTML);
  totalBike += `${foundBike.product}`;
 
  document.querySelector('#bikeCart').innerHTML = updateHTML;
  }
 
  


function displayCart(){
  let updateCart = localStorage.getItem('cartDetails') || "<p>Your cart is empty</p>";
  document.querySelector('#bikeCart').innerHTML = updateCart;
}
