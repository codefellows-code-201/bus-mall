'use strict';

var allBusMallImagesArray = [];
var imagePaths = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

var imageNames = ['R2D2 on Vacation', 'Banana Slicer', 'Bathroom Screentime', 'Pedicure Boots', 'One Stop Breakfast', 'Italian Bubblegum', 'Punishment Chair', 'Cthulhu Monster', 'Dog Shaming', 'Dragon for Dinner', 'Pen Utensils', 'Canine Labor', 'Pizza Scissors', 'Sleeping with Sharks', 'Questionable Parenting', 'Sleeping with Intestines', 'Sparkles for Dinner', 'Creepy Tentacle', 'Useless Watering-Can', 'Impossible Wine-Glass']

var allImages= function() {
  for(var i = 0; i < imagePaths.length ; i++){
    new BusMallImage(`'../img${imagePaths[i]}.jpg'`, imageNames[i])
  }
};

function BusMallImage(src,name){
  this.name = name;
  this.src = src;
  this.likes = 0;
  this.appeared = 0;
  allBusMallImagesArray.push(this);
};

//Left Image Global Variables
var busMallImageLeft = document.getElementById('left');
var leftImageText = document.getElementById('left-image-text');
var currentLeftImageArrayIndex = 16;

//Middle Image Global Variables
var busMallImageMiddle = document.getElementById('middle');
var middleImageText = document.getElementById('middle-image-text');
var currentMiddleImageArrayIndex = 9;

//Right Image Global Variables
var busMallImageRight = document.getElementById('right');
var rightImageText = document.getElementById('right-image-text');
var currentRightImageArrayIndex = 7;

var refreshButton1 = document.getElementById('hide1');
var refreshButton2 = document.getElementById('hide2');
var paragraphContainer = document.getElementById('hipster-ipsum');
var imageContainer = document.getElementById('click-images');
var navBarContainer = document.getElementById('nav-bar');


var clickCount = 0; //counting clicks
var likes = [];
var names = [];
var appearances = [];

var ctx = document.getElementById('busmall-chart').getContext('2d');

//Constructor: Bus Mall Images


if(localStorage.clicks){
  clickCount = localStorage.getItem('clicks');
  if (clickCount >= 5){
    clickCount = 0;
  }
}
if(localStorage['array-data']){
  var locallyStored = localStorage.getItem('array-data');
  allBusMallImagesArray = JSON.parse(locallyStored);
}else{
  allImages();
}

var buttonClickHandler = function(event2){
  if(event2.target.id === 'clear-data'){
    localStorage.clear();
  }
};

refreshButton1.addEventListener('click', buttonClickHandler);
refreshButton2.addEventListener('click', buttonClickHandler);

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

  var saveData = JSON.stringify(allBusMallImagesArray);
  localStorage.setItem('array-data', saveData);
  console.log(saveData);

  var saveClicks = JSON.stringify(clickCount);
  localStorage.setItem('clicks', saveClicks);

  if(clickCount ===5){
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

    refreshButton1.setAttribute('id','vote');
    refreshButton2.setAttribute('id','clear-data');

    paragraphContainer.parentNode.removeChild(paragraphContainer);
    navBarContainer.parentNode.removeChild(navBarContainer);
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

