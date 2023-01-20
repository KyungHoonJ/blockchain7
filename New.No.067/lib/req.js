const getQuery = (queryString) => {
  if (!queryString) return {};
  return queryString
    .split("&")
    .map((item) => item.split("="))
    .reduce((prev, curr) => {
      prev[curr[0].trim()] = decodeURI(curr[1].trim());
      return prev;
    }, {});
};

const getMessage = (lines) => {
  const headers = {};
  while (true) {
    const temp = lines.shift();
    if (!temp) break;
    const index = temp.indexOf(":");
    let value = temp.slice(index + 1).trim();
    if (!isNaN(+value)) value = +value;
    headers[
      temp[0].toLowerCase() + temp.slice(1, index).replaceAll("-", "").trim()
    ] = value;
  }

  let body = lines.join("");
  if (body) {
    if (
      global.isJson &&
      headers["contentType"].indexOf("application/json") > -1
    ) {
      body = JSON.parse(body);
    } else if (
      headers["contentType"].indexOf("application/x-www-form-urlencoded") > -1
    ) {
      body = getQuery(body);
    }
  }

  return { headers, body };
};

const parser = (data) => {
  const lines = data.split("\r\n");
  const [method, url, version] = lines.shift().split(" ");
  const [path, queryString] = url.split("?");
  const query = getQuery(queryString);
  const dataObj = getMessage(lines);
  return { method, url, version, path, queryString, query, ...dataObj };
};

module.exports = parser;
