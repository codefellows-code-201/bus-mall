'use strict';
//Global Variables
var busMallImageLeft = document.getElementById('left');
var busMallImageMiddle = document.getElementById('middle');
var busMallImageRight = document.getElementById('right');
var imageContainer = document.getElementById('click-images');
var leftImageText = document.getElementById('left-image-text');
var middleImageText = document.getElementById('middle-image-text');
var rightImageText = document.getElementById('right-image-text');
var currentLeftImageArrayIndex = 0;
var currentMiddleImageArrayIndex = 8;
var currentRightImageArrayIndex = 17;
var allBusMallImagesArray = [];

console.log('hello');

//Constructor: Bus Mall Images
var BusMallImage = function(src,name){
  this.src = src;
  this.likes = 0;
  this.appeared = 0;
  this.name = name;
  allBusMallImagesArray.push(this);
};

//Prototype
BusMallImage.prototype.renderImage = function(){
  busMallImageLeft.src = this.src;
  //============================================
  //Do I need these??
  //============================================
  busMallImageMiddle.src = this.src;
  busMallImageRight.src = this.src;
  //============================================
};

//Event Listeners and Handlers
var imageClickHandler = function(event){
//Make sure this only happens when an image is clicked
  if(event.target.id === 'left' || event.target.id === 'middle' || event.target.id === 'right'){

    //Choose the image shown based on a random number
    do {
      var randomNumberLeft = Math.floor(Math.random() * allBusMallImagesArray.length);
    } while(randomNumberLeft === currentLeftImageArrayIndex || randomNumberLeft === currentMiddleImageArrayIndex || randomNumberLeft === currentRightImageArrayIndex);

    do {
      var randomNumberMiddle = Math.floor(Math.random() * allBusMallImagesArray.length);
    } while(randomNumberMiddle === currentLeftImageArrayIndex || randomNumberMiddle === currentMiddleImageArrayIndex || randomNumberMiddle === currentRightImageArrayIndex);

    do {
      var randomNumberRight = Math.floor(Math.random() * allBusMallImagesArray.length);
    } while(randomNumberRight === currentLeftImageArrayIndex || randomNumberRight === currentMiddleImageArrayIndex || randomNumberRight === currentRightImageArrayIndex);
  }
  //Increment the images that were clicked
  if(event.target.id === 'left'){
    allBusMallImagesArray[currentLeftImageArrayIndex].likes++;
    console.log('clicked the left image');
  }
  else if (event.targot.id === 'middle') {
    allBusMallImagesArray[currentMiddleImageArrayIndex].likes++;
  }
  else {
    allBusMallImagesArray[currentRightImageArrayIndex].likes++;
  }
  //How many times did each image appear on the screen?
  allBusMallImagesArray[currentLeftImageArrayIndex].appeared++;
  allBusMallImagesArray[currentMiddleImageArrayIndex].appeared++;
  allBusMallImagesArray[currentRightImageArrayIndex].appeared++;

  //Reassign the variable with a new random number

  currentLeftImageArrayIndex = randomNumberLeft;
  currentMiddleImageArrayIndex = randomNumberMiddle;
  currentRightImageArrayIndex = randomNumberRight;

  //Not 100% sure I understand what this is doing
  //Referencing a new image and text index based on the random numbers generated.
  busMallImageLeft.src = allBusMallImagesArray[randomNumberLeft].src;
  busMallImageMiddle.src = allBusMallImagesArray[randomNumberMiddle].src;
  busMallImageRight.src = allBusMallImagesArray[randomNumberRight];
  leftImageText.textContent = allBusMallImagesArray[randomNumberLeft].name;
  middleImageText.textContent = allBusMallImagesArray[randomNumberMiddle].name;
  rightImageText.textContent = allBusMallImagesArray[randomNumberRight].name;

  console.log(event.target);
};

imageContainer.addEventListener('click', imageClickHandler);

//Images
new BusMallImage('./img/bag.jpg', 'Bag');
new BusMallImage('./img/banana.jpg', 'Banana');
new BusMallImage('./img/bathroom.jpg','Bathroom');
new BusMallImage('./img/boots.jpg', 'Boots');
new BusMallImage('./img/breakfast.jpg', 'Breakfast');
new BusMallImage('./img/bubblegum.jpg', 'Bubblegum');
new BusMallImage('./img/chair.jpg', 'Chair');
new BusMallImage('./img/cthulhu.jpg', 'Cthulhu');
new BusMallImage('./img/dog-duck.jpg', 'Dog-Duck');
new BusMallImage('./img/dragon.jpg', 'Dragon');
new BusMallImage('./img/pen.jpg', 'Pen');
new BusMallImage('./img/pet-sweep', 'Pet-Slippers');
new BusMallImage('./img/scissors.jpg', 'Scissors');
new BusMallImage('./img/shark.jpg', 'Shark');
new BusMallImage('./img/sweep.jpg', 'Baby-Sweep');
new BusMallImage('./img/tauntaun.jpg', 'Tauntaun');
new BusMallImage('./img/unicorn.jpg', 'Unicorn');
new BusMallImage('./img/usb.gif', 'Tentacle-USB');
new BusMallImage('./img/water-can.jpg', 'Watering-Can');
new BusMallImage('./img/wine-glass.jpg', 'Wine-Glass');
