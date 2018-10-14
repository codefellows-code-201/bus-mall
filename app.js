'use strict';
//Global Variables
var busMallImageLeft = document.getElementById('left');
var busMallImageMiddle = document.getElementById('middle');
var busMallImageRight = document.getElementById('right');
var imageContainer = document.getElementById('click-images');
var leftImageText = document.getElementById('left-image-text');
var middleImageText = document.getElementById('middle-image-text');
var rightImageText = document.getElementById('right-image-text');
var currentLeftImageArrayIndex = 16;
var currentMiddleImageArrayIndex = 9;
var currentRightImageArrayIndex = 7;
var allBusMallImagesArray = [];
var clickCount = 0; //counting clicks
var likes = [];
var names = [];
var appearances = [];
var ctx = document.getElementById('busmall-chart').getContext('2d');

//Constructor: Bus Mall Images
var BusMallImage = function(src,name){
  this.src = src;
  this.likes = 0;
  this.appeared = 0;
  this.name = name;
  allBusMallImagesArray.push(this);
};

//Prototype
// BusMallImage.prototype.renderImage = function(){
//   busMallImageLeft.src = this.src;
//   busMallImageMiddle.src = this.src;
//   busMallImageRight.src = this.src;
// };

//Event Listeners and Handlers
var imageClickHandler = function(event){
  clickCount++;
  //Make sure this only happens when an image is clicked
  if(event.target.id === 'left' || event.target.id === 'middle' || event.target.id === 'right'){

    //Choose the image shown based on a random number
    do {
      var randomNumberLeft = Math.floor(Math.random() * allBusMallImagesArray.length);
    } while(randomNumberLeft === currentLeftImageArrayIndex || randomNumberLeft === currentMiddleImageArrayIndex || randomNumberLeft === currentRightImageArrayIndex || randomNumberLeft === randomNumberMiddle || randomNumberLeft === randomNumberRight);

    do {
      var randomNumberMiddle = Math.floor(Math.random() * allBusMallImagesArray.length);
    } while(randomNumberMiddle === currentLeftImageArrayIndex || randomNumberMiddle === currentMiddleImageArrayIndex || randomNumberMiddle === currentRightImageArrayIndex || randomNumberMiddle === randomNumberLeft || randomNumberMiddle === randomNumberRight);

    do {
      var randomNumberRight = Math.floor(Math.random() * allBusMallImagesArray.length);
    } while(randomNumberRight === currentLeftImageArrayIndex || randomNumberRight === currentMiddleImageArrayIndex || randomNumberRight === currentRightImageArrayIndex || randomNumberRight === randomNumberLeft || randomNumberRight === randomNumberMiddle);
  }
  //Increment the images that were clicked
  if(event.target.id === 'left'){
    allBusMallImagesArray[currentLeftImageArrayIndex].likes++;
    // console.log('clicked the left image');
  }
  else if (event.target.id === 'middle') {
    allBusMallImagesArray[currentMiddleImageArrayIndex].likes++;
    // console.log('clicked the middle image');
  }
  else if (event.target.id === 'right') {
    allBusMallImagesArray[currentRightImageArrayIndex].likes++;
    // console.log('clicked the right image');
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
  busMallImageRight.src = allBusMallImagesArray[randomNumberRight].src;
  leftImageText.textContent = allBusMallImagesArray[randomNumberLeft].name;
  middleImageText.textContent = allBusMallImagesArray[randomNumberMiddle].name;
  rightImageText.textContent = allBusMallImagesArray[randomNumberRight].name;

  // console.log('here', allBusMallImagesArray);
  // console.log(event.target);

  if(clickCount === 5){
    for(var i=0 ; i < allBusMallImagesArray.length ; i++){
      names.push(allBusMallImagesArray[i].name);
      likes.push(allBusMallImagesArray[i].likes);
      appearances.push(allBusMallImagesArray[i].appeared);
    }
    // BusMallImage.renderList();
    busMallImageLeft.removeEventListener('click', imageClickHandler);
    busMallImageMiddle.removeEventListener('click', imageClickHandler);
    busMallImageRight.removeEventListener('click', imageClickHandler);
    // imageContainer.style.display = 'hidden';
    imageContainer.parentNode.removeChild(imageContainer);
    renderChart();
  }
};

busMallImageLeft.addEventListener('click', imageClickHandler);
busMallImageMiddle.addEventListener('click', imageClickHandler);
busMallImageRight.addEventListener('click', imageClickHandler);

BusMallImage.renderList = function(){
  var listContainer = document.getElementById('results');
  var listName = document.createElement('h2');
  listName.textContent = 'Results';
  listContainer.appendChild(listName);

  for(var i=0; i< allBusMallImagesArray.length ; i++) {
    var listResults = document.createElement('li');
    listResults.textContent = allBusMallImagesArray[i].name + ': ' + allBusMallImagesArray[i].likes + ' Likes after Appearing ' + allBusMallImagesArray[i].appeared + ' times';
    listName.appendChild(listResults);
  }
};

// BusMallImage.renderList();//just for testing purposes
//=====================================================================
//-----------------------------CHART-----------------------------------
//=====================================================================
var chartData = {
  labels: names,
  datasets: [{
    label: '# of Likes',
    data: likes,
    backgroundColor: 'rgba(111, 231, 219, 0.5)',
    borderColor: '#6fe7db',
    borderWidth: 1
  },
  {
    label: '# of Appearances',
    data: appearances,
    backgroundColor: 'rgba(244, 244, 240, 0.5)',
    borderColor: '#f4f4f0',
    borderWidth: 1
  }]
};

var chartOptions = {
  legend:{
    position: 'bottom',
    fontFamily: 'Fredericka the Great'
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  }
};
var barChart = {
  type: 'bar',
  data: chartData,
  options: chartOptions,
};

//Render the Chart
var renderChart = function(){
  var myChart = new Chart(ctx, barChart);
};
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
new BusMallImage('./img/pet-sweep.jpg', 'Pet-Slippers');
new BusMallImage('./img/scissors.jpg', 'Scissors');
new BusMallImage('./img/shark.jpg', 'Shark');
new BusMallImage('./img/sweep.png', 'Baby-Sweep');
new BusMallImage('./img/tauntaun.jpg', 'Tauntaun');
new BusMallImage('./img/unicorn.jpg', 'Unicorn');
new BusMallImage('./img/usb.gif', 'Tentacle-USB');
new BusMallImage('./img/water-can.jpg', 'Watering-Can');
new BusMallImage('./img/wine-glass.jpg', 'Wine-Glass');
