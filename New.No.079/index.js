const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
  },
});

const walletListElem = document.getElementById("wallet-list");
const accountElem = document.getElementById("account");
const balanceElem = document.getElementById("balance");
const selectElem = document.getElementById("select-account");

let isCreating = false;
let interval;
let accounts = [];

async function mineStop() {
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_stop",
    },
  });
  clearInterval(interval);
  interval = undefined;
}

async function getBalance(_account) {
  const {
    data: { result },
  } = await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [_account, "latest"],
    },
  });
  balanceElem.innerHTML =
    parseInt(parseInt(result, 16) / Math.pow(10, 15)) / 1000;
}

async function getWallet(_account) {
  if (interval !== undefined) mineStop();
  accountElem.innerHTML = _account;
  await getBalance(_account);

  selectElem.innerHTML = "";
  accounts.forEach((item) => {
    if (item !== _account)
      selectElem.innerHTML += `<option value="${item}">${item}</option>`;
  });
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
  accounts = result;
}
getAccounts();
mineStop();

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

document.getElementById("start").onclick = async function () {
  if (accountElem.innerHTML === "") return;
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_setEtherbase",
      params: [accountElem.innerHTML],
    },
  });
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "miner_start",
    },
  });
  interval = setInterval(() => {
    getBalance(accountElem.innerHTML);
  }, 2000);
};

document.getElementById("stop").onclick = mineStop;

document.forms["transaction"].onsubmit = async function (e) {
  e.preventDefault();
  let to = selectElem.value;
  if (e.target["transaction-account"].value)
    to = e.target["transaction-account"].value;

  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "personal_unlockAccount",
      params: [accountElem.innerHTML, e.target["tran-pw"].value],
    },
  });
  await request({
    data: {
      id: 50,
      jsonrpc: "2.0",
      method: "eth_sendTransaction",
      params: [
        {
          from: accountElem.innerHTML,
          to,
          value:
            "0x" + (+e.target["ether"].value * Math.pow(10, 18)).toString(16),
        },
      ],
    },
  });
};

document.forms["select-meta"].onsubmit = function (e) {
  e.preventDefault();
  getWallet(e.target["meta"].value);
};
