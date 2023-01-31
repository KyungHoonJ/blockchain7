const addressLi = document.getElementById("wallet_address");
const publicKeyLi = document.getElementById("wallet_publicKey");
const privateKeyLi = document.getElementById("wallet_privateKey");
const balanceLi = document.getElementById("wallet_balance");

const info = (_wallet) => {
  addressLi.innerHTML = _wallet.address;
  publicKeyLi.innerHTML = _wallet.publicKey;
  privateKeyLi.innerHTML = _wallet.privateKey;
  balanceLi.innerHTML = _wallet.balance;
};

document.getElementById("new_wallet_btn").onclick = () => {
  axios.post("/wallet/create").then(({ data }) => {
    // console.log(data);
    info(data);
  });
};

const getInfo = async (_address) => {
  const wallet = (await axios.get("/wallet/" + _address)).data;
  info(wallet);
};

const listUl = document.getElementById("wallet_list");
document.getElementById("wallet_list_btn").onclick = () => {
  axios.get("/wallet/list").then(({ data }) => {
    // console.log(data);
    listUl.innerHTML = "";
    data.forEach((item) => {
      listUl.innerHTML += `<li onclick="getInfo('${item}')">${item}</li>`;
    });
  });
};

document.getElementById("transaction_form").onsubmit = (e) => {
  e.preventDefault();

  const publicKey = publicKeyLi.innerHTML;
  const address = addressLi.innerHTML;
  const received = e.target.received.value;
  const amount = e.target.amount.value;

  const req = {
    sender: {
      publicKey,
      address,
    },
    received,
    amount,
  };

  axios.post("/transaction/send", req);
};
