
var myImage = document.querySelector('img');
myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'img/welcome.jpg') 
    {
      myImage.setAttribute ('src','img/background1.jpg');
    } 
    else if(mySrc === 'img/background1.jpg')
    {
      myImage.setAttribute ('src','img/background2.jpg');
    }
    else
    {
    	myImage.setAttribute ('src',mySrc);
    }
}

// 输入个人名字
// var myButton = document.querySelector('button');
// var myHeading = document.querySelector('h1');
// function setUserName() {
//   var myName = prompt('Please enter your name.');
//   localStorage.setItem('name', myName);
//   myHeading.innerHTML = 'Mozilla is cool, ' + myName;
// }
// if(!localStorage.getItem('name')) {
//   setUserName();
// } else {
//   var storedName = localStorage.getItem('name');
//   myHeading.innerHTML = 'Mozilla is cool, ' + storedName;
// }
// myButton.onclick = function() {
//   setUserName();
// }