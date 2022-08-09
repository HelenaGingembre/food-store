const DB = {
  stuffing: {
    STUFFING_SALAD: {
      type: "STUFFING_SALAD",
      price: 300,
      ccal: 200,
    },
    STUFFING_POTATO: {
      type: "STUFFING_POTATO",
      price: 400,
      ccal: 100,
    },
    TOPPING_MAYO: {
      type: "TOPPING_MAYO",
      price: 300,
      ccal: 400,
    },
    TOPPING_SPICE: {
      type: "TOPPING_SPICE",
      price: 500,
      ccal: 700,
    },
  },

  sizes: {
    S: 200,
    L: 300,
    M: 400,
  },
};
// Створіть клас Hamburger
// В Класі добавте в статік обєкт налаштувань по добавкам
//(не по розміру), щоб була можливість використовувати 
//їх як у прикладі: Hamburger.stuffing.STUFFING_SALAD
// Добавте слідуючі методи:
// addSize - Добавляє розмір гамбургера
// addTopping(Hamburger.stuffing.STUFFING_SALAD, ...) - Добавляє добавку до гамбургера. Можна добавити декілька добавок при умові, що вони валідні
// removeTopping(Hamburger.stuffing.STUFFING_SALAD, ...) - Видалити добавку, при умові, що вона раніше була добавлена.
// getStuffing - геттер, має повернути this.toppings = [....]
// calculatePrice() - взнати вартість замовлення
// calculateCalories() - взнати калорійність гамбургера
// showError() - метод, який може показувати 2 помилки - якщо передали невірний розмір або начинка не існує (При видалені або додаванні)
// Добавте в логіку кода розрахунок варстості замовлення в залежності від розміру гамбургера та добавлених начинок.
// Дані в формі мають рендеритись динамічно (уявіть, що вони приходять з бекенду, тому кількість начинок може мінятьсь. Відповідно, мають змінюватись поля в формі по даним начинкам)
// Форма має бути інтерактивною, тобто - при виборі кожного пункту - інформація добавляється в блок "Інфо". 
//Після заповнення усіх полів - сабмітимо форму і отримуємо підтвердження замовлення з виводом загальної інформації: вартість замовлення та що було обрано.
// class Hamburger {
//   constructor(name, stuffing) {
//     // this.price = name.price + stuffing.price;
//     // this.calories = name.calories + stuffing.calories;
//     this.price = name.price;
//     this.calories = name.calories;
//     this.stuffing = stuffing;

// this.sizes = {
        //   S: 200,
        //   L: 300,
        //   M: 400,
        // };
        // this.sizes= DB.sizes;
//   }
// }
class Hamburger {

  static stuffings = DB.stuffing;
  static sizes = DB.sizes;

  constructor(stuffings, size) {
        
        this.stuffings = stuffings;
        this.size = size;
        this.toppings = [];//щоб використати набор добавок в 1 гамбургері 
    
  }

// addSize - Добавляє розмір гамбургера
  addSize(size) {
    if (Object.keys(Hamburger.sizes).includes(size)) {
           this.size = size;
      } else {
           this.showError("немає такого розміру");
    }
  }
// addTopping(Hamburger.stuffing.STUFFING_SALAD, ...) 
//- Добавляє добавку до гамбургера.Можна добавити декілька 
//добавок при умові, що вони валідні

  addTopping(...args) {
             
    args.forEach(arg => {
        if (Object.keys(Hamburger.stuffings).includes(arg)) {
               this.toppings.push(arg);
        } else {
               this.showError(`Добавки ${arg} немає в меню Бургеру! `);
        }
    });
      
  }
// removeTopping(Hamburger.stuffing.STUFFING_SALAD, ...) - 
// Видалити добавку, при умові, що вона раніше була добавлена.

  removeTopping(topping) {
    const arr = this.getStuffing();
                //console.log("Burger toppings", this.toppings);
    const removedTopping = arr.findIndex((item) => item === topping);
                //console.log("Index toppings", removedTopping);
        if (removedTopping !== -1) {
            this.toppings = arr.filter( (item, i) => i !== removedTopping);
        }
            console.log("toppings after remove ", this.toppings);
            console.log("remove topping=", this.toppings[removedTopping]);
    }

  // getStuffing - геттер, має повернути this.toppings = [....]
  getStuffing() {
       return this.toppings; 
  }
  getPrice(elem) {

    const obj = Hamburger.stuffings;
    
    if (Object.keys(obj).includes(elem)) {
            //console.log(obj[elem].price);
      return obj[elem].price;
    }
           //console.log('no stuffing and no price');
    return 0;
  }
  getCcal(elem) {
     
    if (Object.keys(Hamburger.stuffings).includes(elem)) {
            return Hamburger.stuffings[elem].ccal;
    }
      return 0;
  }
  getPriceSize(elem) {
    if (Object.keys(Hamburger.sizes).includes(elem)) {
            return Hamburger.sizes[elem];
    }
      return 0;
  }
  //calculatePrice() - взнати вартість замовлення
  calculatePrice() {
        let result = this.getStuffing()
          .reduce((acc, item) => acc + this.getPrice(item), 0)
          + this.getPriceSize(this.size);
              // console.log(this.getPriceSize(this.size));
        return result;
  }
  calculateCalories() {
    return this.getStuffing()
      .reduce((acc, item) => acc + this.getCcal(item), 0);
  }

  showError(message) {
    alert(message);

   // return message; // для виводу в html
  }

}
/*
console.log("Hamburger -> ", Hamburger);
console.log("Hamburger stuffings-> ",Hamburger.stuffings);
console.log("Hamburger STUFFING_SALAD -> ", Hamburger.stuffings.STUFFING_SALAD);
console.log('Hamburger.sizes ->', Hamburger.sizes);
console.log('Hamburger.size L ->', Hamburger.sizes.L);
console.log('Hamburger  type ->', Hamburger.stuffings.STUFFING_SALAD.type);

const burger = new Hamburger(['STUFFING_POTATO', 'STUFFING_SALAD'],'S');
console.log(burger);

burger.addSize('S');

burger.addTopping(Hamburger.stuffings.STUFFING_SALAD.type);//передаю тип и работает

console.log('burger stuffings ->', burger.getStuffing());//

//burger.getPrice('STUFFING_SALAD');
//помилка приватний метод недоступний ыншому класу
//console.log("getPrice -> ", burger.getPrice('STUFFING_2'));

burger.addTopping('STUFFING_POTATO', 'STUFFING_SALAD');
//burger.addTopping( "222");
console.log(burger);
console.log('burger stuffings ->', burger.getStuffing());//
console.log('burger removeTopping ->', burger.removeTopping('STUFFING_SALAD'));//
console.log("burger.calculateCalories = ", burger.calculateCalories());
console.log("burger.calculatePrice = ", burger.calculatePrice());
*/


const formCreateBurger = document.querySelector(".form-burger");
formCreateBurger.addEventListener("submit", onCreateNewBurger);

function onCreateNewBurger(event) {
  event.preventDefault();
  //const newBurger = {};
  const newBurger = new Hamburger();

  console.log('перевірка = створено гамбургер');
  // const formData = new FormData(event.target);

  // formData.forEach((value, name) => (newBurger[size] = value));
  // newBurger.stuffings = [];

  
//обнуляємо форму після підтвердження замовлення гамбургеру
  event.target.reset();
  
}

//1.Створення і рендер розмітки по данных  класу Humburger 
const infoHamburgersContainer = document.querySelector('.toppings');

function createInfoHamburgersTemplate(item, index) {

        const template = `<div class="box__info--topping ">
                    <p>
                    <span class="box__topping--name">${item.type}</span>-
                    <span class="box__info--price">${item.price}</span> грн</p>
                    <p>калорійність :
                    <span class="box__info--ccal">${item.ccal}</span> ккал</p>
                    </div>`

    return template;
} 


function renderAllInfoHamburgers() {
  // console.log('Hamburger.stuffings: ', Hamburger.stuffings);
  // console.log('Object.values(Hamburger.stuffings):',Object.values(Hamburger.stuffings));
  
  const fullTemplate = Object.values(Hamburger.stuffings)
    .reduce((acc, item, index) => `${acc} ${createInfoHamburgersTemplate(item, index)}`, '');
 
   infoHamburgersContainer.insertAdjacentHTML('beforeend', fullTemplate);

}
const infoHamburgersSizeContainer = document.querySelector('.sizes');

function renderSizeHamburgers() {
   const sizes = Hamburger.sizes;
  //  console.log('sizes :', sizes);
    for (const key in sizes) {
        const fullTemplateSize = `<div class="box__info--sizes ">
                    <p> Розмір гамбургера:
                    <span class="box__sizes--name">${key}</span>-
                    <span class="box__sizes--price">${sizes[key]}</span> грн</p>
                    </div>`;
        infoHamburgersSizeContainer.insertAdjacentHTML('beforeend', fullTemplateSize);
    }
}
renderAllInfoHamburgers();
renderSizeHamburgers();




/*
const burger = new Hamburger();
const refs = {
  burgerSize: document.querySelector('.checkbox-variant'),
  selectTopping1: document.querySelector(".topping-select-1"),
  textToppingOutput1: document.querySelector(".box__topping--name-1"),
  valueToppingOutputPrice1: document.querySelector(".box__info--price-1"),

selectTopping2: document.querySelector(".topping-select-2"),
  textToppingOutput2: document.querySelector(".box__topping--name-2"),
  valueToppingOutputPrice2: document.querySelector(".box__info--price-2"),

  // valueToppingOutput2: document.querySelector(".topping-value-output .select2"),
  burgerTotalPrice: document.querySelector("#burgerTotalPrice"),
  burgerTotalCalories: document.querySelector("#burgerEnergy"),
  TotalPrice: 0,
}


//обираємо розмір гамбургеру

refs.burgerSize.addEventListener('change', onChoiceBurgerSize);

function onChoiceBurgerSize() {
  document.querySelector('.box__info').classList.add('visibility');
  let result=0;
    if (document.querySelector('#S').checked == true) {
      result=burger.addSize('S');
      console.log(burger.size);
      
    }
    else if (document.querySelector('#M').checked == true) {
      result=burger.addSize('M');
     
    }
    else if (document.querySelector('#L').checked == true) {
      result=burger.addSize('L');
      
    }
    else {
      document.querySelector('.box__info--size').textContent = "null";
    }
     document.querySelector('.box__info--size').textContent = burger.size;
  // result = document.querySelector('.box__info--size').textContent;
  console.log('burger.size ', burger.size);//L
  // TotalPrice = Hamburger.sizes[burger.size];
  // console.log('Hamburger.size ',TotalPrice);
  console.log('Hamburger.size ',Hamburger.sizes[burger.size]);
  onCalculatePrice();
    
  }


//обираємо розмір гамбургеру

// setOutputTopping();

refs.selectTopping1.addEventListener("change", setOutputTopping1);
refs.selectTopping2.addEventListener("change", setOutputTopping2);

function setOutputTopping1() {
  document.querySelector('.box__info--topping').classList.add('visibility');
  // const selectedOptionValue = refs.selectTopping1.value;
  const selectedOptionIndex = refs.selectTopping1.selectedIndex;
  const selectedOptionText = refs.selectTopping1.options[selectedOptionIndex].text;

  refs.textToppingOutput1.textContent = selectedOptionText;
  // refs.valueToppingOutput1.textContent = selectedOptionValue;

  if (Object.keys(Hamburger.stuffings).includes(selectedOptionText) ){
    console.log(Hamburger.stuffings[selectedOptionText].price);
     refs.valueToppingOutputPrice1.textContent = Hamburger.stuffings[selectedOptionText].price;
   }
  else {
      refs.valueToppingOutputPrice1.textContent = "error! Немає такої добавки" 
  }
  burger.addTopping(selectedOptionText);
  console.log(burger.toppings);
  }
function setOutputTopping2() {
  document.querySelector('.box__info--topping').classList.add('visibility');
  // const selectedOptionValue = refs.selectTopping2.value;
  const selectedOptionIndex = refs.selectTopping2.selectedIndex;
  const selectedOptionText = refs.selectTopping2.options[selectedOptionIndex].text;

  refs.textToppingOutput2.textContent = selectedOptionText;
  // refs.valueToppingOutput2.textContent = selectedOptionValue;

  if (Object.keys(Hamburger.stuffings).includes(selectedOptionText) ){
    console.log(Hamburger.stuffings[selectedOptionText].price);
     refs.valueToppingOutputPrice2.textContent = Hamburger.stuffings[selectedOptionText].price;
   
   
  }
  else {
      refs.valueToppingOutputPrice2.textContent = "error! Немає такої добавки" 
  }
  burger.addTopping(selectedOptionText);
  console.log(burger.toppings);
}
 
function onCalculatePrice() {
  
  return Hamburger.sizes[burger.size];
}

console.log(Hamburger.sizes[burger.size]);
console.log(burger.toppings);
console.log('burger stuffings ->', burger.getStuffing());
console.log('burger stuffings ->', burger.addSize(burger.size));
 refs.burgerTotalPrice.textContent =  burger.calculatePrice();
// refs.burgerTotalPrice.textContent = 5555;

console.log(burger.calculatePrice());
refs.burgerTotalCalories.textContent ='2';
*/