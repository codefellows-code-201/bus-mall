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

//Constructor: Bus Mall Images
var BusMallImage = function(src,name){
  this.src = src;
  this.likes = 0;
  this.appeared = 0;
  this.name = name;
  allBusMallImagesArray.push(this);
}

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