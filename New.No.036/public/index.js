document.forms["sign-up"].onsubmit = async function (e) {
  e.preventDefault();
  if (
    !e.target["user-id"].value ||
    !e.target["user-pw"].value ||
    !e.target["user-name"].value ||
    !e.target["user-class"].value
  )
    return;
  try {
    await axios.post("/api/user/regist", {
      id: e.target["user-id"].value,
      pw: e.target["user-pw"].value,
      name: e.target["user-name"].value,
      className: e.target["user-class"].value,
    });
  } catch (error) {
    console.error(error.response.data.message);
  }
};

document.forms["sign-in"].onsubmit = async function (e) {
  e.preventDefault();
  if (!e.target["user-id"].value || !e.target["user-pw"].value) return;

  try {
    const result = await axios.post("/api/user/login", {
      id: e.target["user-id"].value,
      pw: e.target["user-pw"].value,
    });
    console.log(result.data);
  } catch (error) {
    console.error(error.response.data.message);
  }
};

document.getElementById("sign-out-btn").onclick = function (e) {};
