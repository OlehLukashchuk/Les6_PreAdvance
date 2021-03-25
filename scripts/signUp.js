// Доступи до DOM
let allInputs = document.querySelectorAll(".realInput");
let signUp = document.querySelector(".signUpf1");
let fName = document.getElementById("fname");
let lName = document.getElementById("lname");
let email = document.getElementById("email");
let password = document.getElementById("password");

//RegExp
let checkN = /^[a-zA-Z]{3,15}$/;
let checkE = /^([a-zA-Z0-9]{1,}|[a-zA-Z0-9]{1,}\.[a-zA-Z0-9]{1,})@[a-zA-Z0-9]{1,5}\.[a-zA-Z]{2,5}$/;
let checkP = /^[a-zA-Z0-9]{4,20}$/;

//Змінні для test RegExp
let checkfName;
let checklName;
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
      if (this.value === "") {
        this.parentElement.firstElementChild.style.top = "21px";
        this.parentElement.firstElementChild.style.fontSize = "24px";
      }
    });
    allInputs[i].addEventListener("input", function () {
      if (this.parentElement.firstElementChild.innerText == "First Name") {
        checkfName = checkN.test(this.value);
        if (checkfName === true) {
          this.style.color = "green";
        } else {
          this.style.color = "red";
        }
      } else if (
        this.parentElement.firstElementChild.innerText == "Last Name"
      ) {
        checklName = checkN.test(this.value);
        if (checklName === true) {
          this.style.color = "green";
        } else {
          this.style.color = "red";
        }
      } else if (
        this.parentElement.firstElementChild.innerText == "Email address"
      ) {
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
  // Клік по SignUp створює новий об'єкт при вірному заповненні усіх полів.
  signUp.addEventListener("click", function () {
    if (checkfName && checklName && checkEmail && checkPassword) {
      document.querySelector(".error").style.display = "none";
      let newObj = {
        firstName: `${fname.value}`,
        lastName: `${lname.value}`,
        email: `${email.value}`,
        password: `${password.value}`,
      };

      // Обробка об'єкту функцією
      checkLocale(newObj);

      // Зміна полів і змінних в дефолтні значення.
      fName.value = "";
      lName.value = "";
      email.value = "";
      password.value = "";

      checkfName = false;
      checklName = false;
      checkPassword = false;
      checkEmail = false;

      // Повернення 'placeholder-a' у початкове значення
      for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].parentElement.firstElementChild.style.top = "21px";
        allInputs[i].parentElement.firstElementChild.style.fontSize = "24px";
      }
    } else {
      // Видаємо помилку при не вірному заповенні полів
      document.querySelector(".error").style.display = "block";
      console.log(allUsers);
    }
  });
}

inputs();

// Массиви для зберігання данних про користувачів
let allUsers = [];
let allEmails = [];

// Функція - перевірка .
function checkLocale(obj) {
  if (
    localStorage.length > 0 &&
    localStorage.getItem("allUsers") &&
    localStorage.getItem("allEmails")
  ) {
    checkUser = JSON.parse(localStorage.getItem("allUsers"));
    checkEmail = JSON.parse(localStorage.getItem("allEmails"));

    //Перевірка на email(чи не зайнятий)
    for (let em in checkEmail) {
      //При зайнятому - видаємо помилку
      if (checkEmail.includes(obj.email)) {
        document.querySelector(".error").innerText = "Email already exist";
        document.querySelector(".error").style.width = "192px";
        document.querySelector(".error").style.display = "block";

        email.focus();
        email.value = "";
      }
      // При не зайнятому добавляємо нового користувача в базу .
      else {
        document.querySelector(".error").style.display = "none";
        allUsers = JSON.parse(localStorage.getItem("allUsers"));
        allEmails = JSON.parse(localStorage.getItem("allEmails"));
        allUsers.push(obj);
        allEmails.push(obj.email);
        localStorage.setItem("allUsers", JSON.stringify(allUsers));
        localStorage.setItem("allEmails", JSON.stringify(allEmails));
        fName.focus();
      }
    }
  } else {
    // Перший користувач (якщо localStorane.length === 0)
    allUsers.push(obj);
    allEmails.push(obj.email);
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    localStorage.setItem("allEmails", JSON.stringify(allEmails));
  }
}