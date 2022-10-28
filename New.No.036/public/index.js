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
    const result = await axios.post("/api/user/regist", {
      id: e.target["user-id"].value,
      pw: e.target["user-pw"].value,
      name: e.target["user-name"].value,
      class: e.target["user-class"].value,
    });
    if (result.status !== 200) alert("회원가입 오류");
  } catch (error) {
    console.error(error);
  }
};
