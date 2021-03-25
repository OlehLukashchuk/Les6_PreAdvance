// Доступи до DOM
let signIn = document.querySelector(".signInBtn");
let allInputs = document.querySelectorAll(".realInput");
let email = document.getElementById("email");
let password = document.getElementById("password");

//RegExp
let checkE = /^[a-zA-Z]{1,10}@[a-zA-Z]{1,5}\.[a-zA-Z]{2,5}$/;
let checkP = /^[a-zA-Z0-9]{4,20}$/;

// Змінні для test RegExp
let checkName;
let checkEmail;
let checkPassword;

//Візуал при (не)правильному заповненні полів(підсвітка тексту і т.д)
function inputs() {
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener("focus", function () {
      this.parentElement.firstElementChild.style.top = "5px";
      this.parentElement.firstElementChild.style.fontSize = "15px";
    });
    allInputs[i].addEventListener("blur", function () {
      if (this.value == '') {
        this.parentElement.firstElementChild.style.top = "21px";
        this.parentElement.firstElementChild.style.fontSize = "24px";
      }
    });
    allInputs[i].addEventListener("input", function () {
      if (this.parentElement.firstElementChild.innerText == "Email address") {
        checkEmail = checkE.test(this.value);
        if (checkEmail === true) {
          this.style.color = "green";
        } else {
          this.style.color = "red";
        }
      } else if (this.parentElement.firstElementChild.innerText == "Password") {
        checkPassword = checkP.test(this.value);
        if (checkPassword === true) {
          this.style.color = "green";
        } else {
          this.style.color = "red";
        }
      }
    });
  }
  signIn.addEventListener("click", function () {
    email.focus();
    // Перевірка на пусту базу данних
    if (localStorage.length > 0) {
      document.querySelector(".error").style.display = "none";
    } else {
      document.querySelector(".error").style.bottom = "360px";
      document.querySelector(".error").style.width = "192px";
      document.querySelector(".error").style.display = "block";
    }

    //Виклик функції - перевірки.
    checkUser();

    //Зачистка полів
    email.value = "";
    password.value = "";
  });
}

inputs();

//Функція - перевірка
function checkUser() {
  let users = JSON.parse(localStorage.getItem(localStorage.key(0)));
  for (let i = 0; i < users.length; i++) {

    //Якщо знаходимо співпадіння по email && password в одному 'об'єкті-корисутвач' приховуємо блок і показуємо портфоліо.
    if (users[i].email == email.value && users[i].password == password.value) {
      document.querySelector(".error").style.display = "none";
      for (let q = 0; q < allInputs.length; q++) {
        allInputs[q].parentElement.firstElementChild.style.top = "21px";
        allInputs[q].parentElement.firstElementChild.style.fontSize = "24px";
      }
      document.getElementById(
        "flname"
      ).innerText = `${users[i].firstName} ${users[i].lastName}`;
      document.getElementById("femail").innerText = `${users[i].email}`;
      document.getElementById("signInContainer").style.display = "none";
      document.querySelector(".portfolio").style.display = "block";
      return;
    }
    //Якщо не знаходимо - видаємо помилку.
    else {
      document.querySelector(".error").innerText = "Wrong email or password";
      document.querySelector(".error").style.bottom = "364px";
      document.querySelector(".error").style.width = "213px";
      document.querySelector(".error").style.display = "block";
    }
  }
}