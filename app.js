'use strict';
//Global Variables
var busMallImageLeft = document.getElementById('left');
var busMallImageMiddle = document.getElementById('middle');
var busMallImageRight = document.getElementById('right');
var paragraphContainer = document.getElementById('hipster-ipsum');
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

  if(clickCount === 25){
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
    paragraphContainer.parentNode.removeChild(paragraphContainer);

    var saveLikes = function(likes){
      localStorage.setItem = JSON.stringify(likes);
    };
    saveLikes(likes);
    console.log(saveLikes);
  
    var saveAppearances = function(appearances){
      localStorage.setItem = JSON.stringify(appearances);
    };
    saveAppearances(appearances);
    console.log(saveAppearances);
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
  responsive: true,
  legend:{
    position: 'bottom',
    defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Amatic SC', cursive",
    labels: {
      fontSize: 25,
      fontColor: '#f4f4f0',
    },
  },
  title:{
    display: true,
    defaultFontFamily: Chart.defaults.global.defaultFontFamily = "'Amatic SC', cursive",
    fontColor: '#f4f4f0',
    fontSize: 40,
    position: 'top',
    padding: 20,
    text: '~~ Survey Results ~~',
  },
  scales: {
    xAxes:[{
      gridLines:{
        zeroLineColor: '#f4f4f0',
      },
      ticks: {
        fontSize: 16,
        autoSkip: false,
        fontColor: '#f4f4f0',
      }
    }],
    yAxes: [{
      ticks: {
        fontSize: 16,
        fontColor: '#f4f4f0',
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
new BusMallImage('./img/bag.jpg', 'R2D2 on Vacation');
new BusMallImage('./img/banana.jpg', 'Banana Slicer');
new BusMallImage('./img/bathroom.jpg','Bathroom Screentime');
new BusMallImage('./img/boots.jpg', 'Pedicure Boots');
new BusMallImage('./img/breakfast.jpg', 'One Stop Breakfast');
new BusMallImage('./img/bubblegum.jpg', 'Italian Bubblegum');
new BusMallImage('./img/chair.jpg', 'Punishment Chair');
new BusMallImage('./img/cthulhu.jpg', 'Cthulhu Monster');
new BusMallImage('./img/dog-duck.jpg', 'Dog Shaming');
new BusMallImage('./img/dragon.jpg', 'Dragon for Dinner');
new BusMallImage('./img/pen.jpg', 'Pen Utensils');
new BusMallImage('./img/pet-sweep.jpg', 'Canine Labor');
new BusMallImage('./img/scissors.jpg', 'Pizza Scissors');
new BusMallImage('./img/shark.jpg', 'Sleeping with Sharks');
new BusMallImage('./img/sweep.png', 'Questionable Parenting');
new BusMallImage('./img/tauntaun.jpg', 'Sleeping with Intestines');
new BusMallImage('./img/unicorn.jpg', 'Sparkles for Dinner');
new BusMallImage('./img/usb.gif', 'Creepy Tentacle');
new BusMallImage('./img/water-can.jpg', 'Useless Watering-Can');
new BusMallImage('./img/wine-glass.jpg', 'Impossible Wine-Glass');
