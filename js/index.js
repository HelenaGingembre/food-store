const book = {
  title: "The Last Kingdom",
  author: "Bernard Cornwell",
  rating: 8.38,
};
const keys = Object.keys(book);
console.log(keys); // ['title', 'author', 'rating']

const values = Object.values(book);
console.log(values); 
console.log(book.title); 



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
//   }
// }
class Hamburger {

  static stuffings = DB.stuffing;
  static sizes = DB.sizes;

  constructor(stuffings, size) {
        // this.sizes = {
        //   S: 200,
        //   L: 300,
        //   M: 400,
        // };
        // this.sizes= DB.sizes;
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

burger.getPrice('STUFFING_SALAD');
console.log("getPrice -> ", );
console.log("getPrice -> ", burger.getPrice('STUFFING_2'));

burger.addTopping('STUFFING_POTATO','STUFFING_SALAD', "222");

console.log(burger);

console.log('burger removeTopping ->', burger.removeTopping('STUFFING_SALAD'));//
console.log("burger.calculateCalories = ",burger.calculateCalories());
console.log("burger.calculatePrice = ",burger.calculatePrice());


// пример написания подсчета стоимости закза
// const orderBtn = document.querySelector(".order-btn");
// orderBtn.addEventListener("click", () => {
//   hamburger.createHamburger();
//   hamburger.countAll();
// });