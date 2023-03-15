const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const pinFileToIpfs = async () => {
  const formData = new FormData();
  const src = "imgs/asdf.png";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: "my character.png",
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "content-type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: "5153c1a45c655e9738cf",
          pinata_secret_api_key:
            "b6766b9643682216a0093d5f5483c62e01c73ed05cc6050c9d7c56a4077d8f51",
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// pinFileToIpfs();
// QmPxxSBwSdu7Ew7GxZLB2XXXmegQWQNaPhi8WaHc5tHXTU

const pinJson = async () => {
  const formData = {
    pinataMetadata: {
      name: "NFT 1",
    },
    pinataOptions: {
      cidVersion: 0,
    },
    pinataContent: {
      name: "315 NFT",
      description: "피나타 써보는중",
      image:
        "https://gateway.pinata.cloud/ipfs/QmPxxSBwSdu7Ew7GxZLB2XXXmegQWQNaPhi8WaHc5tHXTU",
      attributes: [],
    },
  };
  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      formData,
      {
        headers: {
          "content-type": "application/json",
          pinata_api_key: "5153c1a45c655e9738cf",
          pinata_secret_api_key:
            "b6766b9643682216a0093d5f5483c62e01c73ed05cc6050c9d7c56a4077d8f51",
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// pinJson();
// QmWzq4RdV86SFfDKx6kANPmBXDr4ZDykA1Hdry3mWBNDwr
