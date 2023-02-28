const solc = require("solc");
const fs = require("fs");
const path = require("path");

class Compiler {
  /**
   *
   * @param {string} _fileName 파일 이름
   */
  static compile(_fileName) {
    const contractPath = path.join(__dirname, "contracts", _fileName);
    const data = JSON.stringify({
      language: "Solidity",
      sources: {
        [_fileName]: {
          content: fs.readFileSync(contractPath, "utf-8"),
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    });
    const compiled = solc.compile(data);
    return Compiler.writeOutput(JSON.parse(compiled));
  }
  /**
   *
   * @param {*} _compiled 컴파일된 솔리디티 객체
   */
  static writeOutput(_compiled) {
    const result = {};
    for (const contractFileName in _compiled.contracts) {
      const [contractName] = contractFileName.split(".");
      const contract = _compiled.contracts[contractFileName][contractName];
      const abi = contract.abi;
      const bytecode = contract.evm.bytecode.object;
      const tempObj = { abi, bytecode };
      const buildPath = path.join(__dirname, "build", `${contractName}.json`);
      fs.writeFileSync(buildPath, JSON.stringify(tempObj));
      result[contractName] = tempObj;
    }
    return result;
  }
}

module.exports = Compiler;
