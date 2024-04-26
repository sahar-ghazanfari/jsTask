//axios
const searches = document.querySelector("#search");
let allTransaction = [];

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/transactions")
    .then((res) => {
      allTransaction = res.data;
      console.log(res.data);
      renderTransactions(res.data);
    })
    .catch((err) => console.log(err));
});

//render

const transactionRoot = document.querySelector(".transactions-section__body");
function renderTransactions(transactions) {
  let resault = "";
  transactions.forEach((transaction) => {
    resault += `
    <tr class="transactions__body">
        <td class="number">${transaction.id}</td>
        <td class="type">${
          transaction.type
          // changeTextColor(transaction.type)
        }</td>
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
  btns.style.display = "none";
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

//color change
// const colors = document.querySelector(".type");
// function changeTextColor(text) {
//   if (text === "افزایش اعتبار") {
//     colors.style.color = "green";
//   } else {
//     colors.style.color = "red";
//   }
// }
