const banksList = document.querySelector(".banks");
const banksInformationEl = document.querySelector(".bank-information");
const backdropRef = document.querySelector("[data-modal]");
const createNewBankBtnRef = document.querySelector(".create_new_bank");
const modalCloseBtnRef = document.querySelector("[data-modal-close]");
const overlay = document.querySelector(".overlay");
const startBtn = document.querySelector(".start");
const modalBtnCreateBank = document.querySelector(
  ".create_new_bank-from-modal"
);
const contactForm = document.querySelector(".contact-form");
const onBtnBankList = document.querySelectorAll(".banks__remove--button");

const banks = [
  {
    id: 1,
    name: "Mono",
    interestRate: 5,
    maxLoan: 500000,
    minPayment: 1000,
    loanTerm: 12,
  },
  {
    id: 2,
    name: "Privat",
    interestRate: 7,
    maxLoan: 1000000,
    minPayment: 5000,
    loanTerm: 50,
  },
];

function createMarkupBank({ name, id }) {
  return `<li class="banks__item" data-id='${id}'>
  <p>${name}</p>
  <button class="banks__edit--button banks-btn" name="edit-bank" type="button">
  <svg class="form-btn-icon" width="20" height="20">
  <use href="./img/symbol-defs.svg#icon-edit"></use>
  </svg>
  </button>
  
      <button  name="delete-bank" class="banks__remove--button banks-btn" type="button">
      <svg class="form-btn-icon" width="24" height="24">
      <use href="./img/symbol-defs.svg#icon-x"></use>
      </svg>
      </button>
      </li>`;
}
function createBankList(banks, callback) {
  return banks.map((bank) => callback(bank)).join("");
}

function createMarkupBankInformation({
  name,
  interestRate,
  maxLoan,
  minPayment,
  loanTerm,
}) {
  return `<li class="bank-keys">Bank: <span class="bank_description">${name}</span></li>
      <li class="bank-keys">Mortgage Size, $: <span class="bank_description">${maxLoan}</span></li>
      <li class="bank-keys">Minimum down payment, $: <span class="bank_description">${minPayment}</span></li>
      <li class="bank-keys">Loan period, month: <span class="bank_description">${loanTerm}</span></li>
      <li class="bank-keys">Interest rate, %: <span class="bank_description">${interestRate}</span></li>`;
}

banksList.addEventListener("click", (event) => {
  if (event.target.nodeName === "OL") {
    return;
  }
  const bankId = event.target.closest(".banks__item").dataset.id;
  const bank = banks.find((bank) => {
    return Number(bankId) === bank.id;
  });

  banksInformationEl.innerHTML = createMarkupBankInformation(bank);
});

function checkBankList() {
  if (banks.length) {
    overlay.classList.add("hide");
    banksList.innerHTML = "";
    banksList.insertAdjacentHTML(
      "beforeend",
      createBankList(banks, createMarkupBank)
    );
  }
}
checkBankList();

createNewBankBtnRef.addEventListener("click", onModalCreateNewBank);
modalBtnCreateBank.addEventListener("click", onModalCreateNewBank);

function onModalCreateNewBank() {
  overlay.classList.add("hide");
  backdropRef.classList.remove("is-hidden");
}

modalCloseBtnRef.addEventListener("click", onModalCloseBtn);

function onModalCloseBtn() {
  backdropRef.classList.add("is-hidden");
}

backdropRef.addEventListener("click", onBackdropClick);

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onModalCloseBtn();
  }
}

document.addEventListener("keydown", onPushEsc);

function onPushEsc(event) {
  if (event.code === "Escape") {
    onModalCloseBtn();
  }
}

contactForm.addEventListener("submit", onAddNewBank);

function onAddNewBank(event) {
  event.preventDefault();
  const newBank = {};

  const formData = new FormData(event.target);

  formData.forEach((value, name) => (newBank[name] = value));
  newBank.id = Date.now();

  banks.push(newBank);

  event.target.reset();
  onModalCloseBtn();
  checkBankList();
}