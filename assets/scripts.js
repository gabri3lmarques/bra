var menuIcon = document.getElementById("menu-icon");
var menuContainer = document.querySelector(".menu-container");
var slideIndex = 1;

function toogleMyClass(el, mycClass) {
  el.classList.toggle(mycClass);
}

menuIcon.addEventListener("click", function(){
  toogleMyClass(this, "open");
  toogleMyClass(menuContainer, "active");
});

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i,
  slides = document.getElementsByClassName("mySlides"),
  dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1
  }    
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";  
  dots[slideIndex-1].className += " active";
}

var bannerTimmer = setInterval(timer, 5000);

function timer() {
  plusSlides(1);
}

function clearTimer() {
  clearInterval(bannerTimmer);
}

var myForm = document.getElementById("mailingForm");
var focus = false;
var emailInput = document.getElementById("email");

myForm.addEventListener('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this),
  img = document.getElementById("message-image"),
  messagemBox = document.querySelector(".form-return"),
  messageHeader = document.getElementById("message-header"),
  messageText = document.getElementById("return-message"),
  emailValue = emailInput.value;

  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailValue))
  {
    img.setAttribute("src", "./assets/images/success.svg");
    messagemBox.classList.remove("error");
    messagemBox.classList.add("success");
    messagemBox.style.display = "flex";
    messageHeader.innerHTML = "Deu bom!"
    messageText.innerHTML = "Seu email foi cadastrado com sucesso";
    document.getElementById("mailingForm").reset();
    focus = false;

    fetch('http://vaga.bradigital.com.br/', {
      method: 'POST',
      body: formData
    }).then(function(response){
      return response.text();
    }).then(function(text){
      console.log(text)
    }).catch(function(err){
      console.error(err)
    })
  } else {
    messagemBox.classList.remove("success");
    messagemBox.classList.add("error");
    img.setAttribute("src", "./assets/images/error.svg");
    messageHeader.innerHTML = "Deu ruim!"
    messageText.innerHTML = "Parece que tem algo errado com o seu email, confere pra nós?";
    if(emailValue == ""){
      messageText.innerHTML = "O campo email não pode ficar vazio";
    }
    messagemBox.style.display = "flex";
    focus = true;
  }
});

document.getElementById("close-button").addEventListener("click", function() {
  var messageBox = document.querySelector(".form-return");
  messageBox.style.display = "none";
  if(focus == true) {
    emailInput.focus();
  }
});

