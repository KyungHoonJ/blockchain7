const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

const walletListElem = document.getElementById("wallet-list");
const accountElem = document.getElementById("account");

let isCreating = false;

async function getWallet(_account) {
  accountElem.innerHTML = _account;
}

async function getAccounts() {
  const {
    data: { result },
  } = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_accounts",
    },
  });
  walletListElem.innerHTML = "";
  result.forEach((item) => {
    walletListElem.innerHTML += `<li onclick="getWallet('${item}')">${item}</li>`;
  });
}
getAccounts();

document.forms["new-wallet"].onsubmit = async function (e) {
  e.preventDefault();
  if (e.target["new-pw"].value.length < 5 || isCreating) return;
  isCreating = true;
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "personal_newAccount",
      params: [e.target["new-pw"].value],
    },
  });
  await getAccounts();
  e.target["new-pw"].value = "";
  isCreating = false;
};
