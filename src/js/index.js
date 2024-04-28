//axios
const searches = document.querySelector("#search");
let allTransaction = [];

//render

const transactionRoot = document.querySelector(".transactions-section__body");
function renderTransactions(transactions) {
  let resault = "";
  transactions.forEach((transaction) => {
    resault += `
    <tr class="transactions__body">
        <td class="number">${transaction.id}</td>
        <td class="type ${
          transaction.type === "افزایش اعتبار" ? "green" : "red"
        }">${transaction.type}</td>
        <td class="price">${Number(transaction.price).toLocaleString()}</td>
        <td class="tracing-code">${transaction.refId}</td>
        <td class="date">${
          dates(transaction.date) + " " + "ساعت" + " " + time(transaction.date)
        }</td>
        </tr>`;
  });
  transactionRoot.innerHTML = resault;
}

//show section transaction list
const btns = document.querySelector(".upload__btn");

function showTransaction() {
  document.querySelector(".transactions-section").style.display = "block";
  document.querySelector("#search").style.opacity = "1";
  btns.style.display = "none";
  axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      allTransaction = res.data;
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
}

//date

function dates(d) {
  return new Date(+d).toLocaleDateString("fa-IR");
}
function time(t) {
  return new Date(+t).toLocaleTimeString("fa-IR");
}

//search
searches.addEventListener("input", async (e) => {
  const refId = e.target.value;
  const { data } = await axios
    .get(`http://localhost:3000/transactions?refId_like=${refId}`)
    .then((res) => res)
    .catch((err) => console.log(err));
  renderTransactions(data);
});

//sort
const buttonArrowDown = document.querySelector(".arrow-down");
const buttonArrowUp = document.querySelector(".arrow-up");

function sortByOldestPrice() {
  axios
    .get("http://localhost:3000/transactions?_sort=price&_order=desc")
    .then((res) => {
      allTransaction = res.data;
      console.log(res.data);
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
  document.querySelector(".arrow-down").style.display = "none";
  document.querySelector(".arrow-up").style.display = "block";
}

function sortByLatestPrice() {
  axios
    .get("http://localhost:3000/transactions?_sort=price&_order=as")
    .then((res) => {
      allTransaction = res.data;
      console.log(res.data);
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
  document.querySelector(".arrow-down").style.display = "block";
  document.querySelector(".arrow-up").style.display = "none";
}

function sortByOldestDate() {
  axios
    .get("http://localhost:3000/transactions?_sort=date&_order=desc")
    .then((res) => {
      allTransaction = res.data;
      console.log(res.data);
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
  document.querySelector(".arrow-down__Date").style.display = "none";
  document.querySelector(".arrow-up__Date").style.display = "block";
}

function sortByLatestDate() {
  axios
    .get("http://localhost:3000/transactions?_sort=date&_order=as")
    .then((res) => {
      allTransaction = res.data;
      console.log(res.data);
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
  document.querySelector(".arrow-down__Date").style.display = "block";
  document.querySelector(".arrow-up__Date").style.display = "none";
}

