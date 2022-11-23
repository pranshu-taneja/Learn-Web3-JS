//------------------- Deploying and abi/bytecode extraction of the smart contract using Web3.js -------------------

let solc = require("solc");
// file system - read and write files to your computer
let fs = require("fs");
// ganache - local blockchain
// web3 interface
let Web3 = require("web3");
// setup a http provider
let web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
// reading the file contents of the smart contract
fileContent = fs.readFileSync("demo.sol").toString();           //You gotta read the solidity file right so here is how you do it
console.log(fileContent);
// create an input structure for my solidity complier
var input = {                           //format of extracting abi code 
  language: "Solidity",
  sources: {
    "demo.sol": {
      content: fileContent,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};


var output = JSON.parse(solc.compile(JSON.stringify(input)));			//Now here basically what exactly is happening is:- you are compiling the solc file by using the stringify input format... and then after getting the compiled data we made it json type and passed into input

console.log("Output: ", output);

//-------------------  Now Be very careful here -------------------

//You can actually just break the ABI and bytecode variable code and print their objects individually to see what's happening inside the objects calling
ABI = output.contracts["demo.sol"]["demo"].abi;							//Now all the compiled data you have gotten in output is basically contraining some objects and these objects of compiled data contains various things including abi and bytecode just like after compilation in remix ide

bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;			//Now here we are extracting object code which comes from bytecode from the compiled data of solidity file

console.log("Bytecode: ", bytecode);

console.log("ABI: ", ABI);

contract = new web3.eth.Contract(ABI);

let defaultAccount;                                 //See the story
web3.eth.getAccounts().then((accounts) => {         //First I fetched all the accounts using the inbuilt functionality with promises
  console.log("Accounts:", accounts);               //Now From all of the fetched accounts i picked up the first indexed account
  defaultAccount = accounts[0];                     //defaulaccount is the one we will use for transaction
  console.log("Default Account:", defaultAccount);  //just printing the default selected account
  contract                                          // Now we are going to deploy our smart contract from our Bytecode      //why Byte code and not ABI //see we used ABI(JSON FORMAT) to generate a object or byte code(small size) and that has all the commands/operations of our contract Ex: 0xPush whatever... Just understand that Its the byte code that will be pushed Right!! 
    .deploy({ data: bytecode })                     //Deployed Our bytecode simply just the method nothing too much
    .send({ from: defaultAccount, gas: 470000 })    //telling from which account to send and how much gas can be used
    .on("receipt", (receipt) => {                   //As just after deploying the contract on chain you will receive some data from the blockchain So to receive that we have this receipt to accept it into    //event,transactions,contract address will be returned by
      console.log("Contract Address:", receipt.contractAddress);            //That receipt will contain the contract address so here is how you see it
    })
    .then((demoContract) => {                       //If you have gotten out from all that above crap you gotta do the next real stuff      //btw then is used where promises are received
		// demoContract.methods.x(5);				//not working for now
		demoContract.methods.variable().call((err, data) => {        /// to use the funcitons inside of those contracts we use this
        	console.log("Initial Value:", data);                //this is just the functionality
      	});
    });
});

