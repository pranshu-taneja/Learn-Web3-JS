let imp = require("web3"); //It import the web3 package [btw don't get confused on tutorials by web3 and Web3 ] imp lets say is web3 in them. just variable names but for me its confusing

//Now put the RPC url to connect with the blockchain in this case its ganache
let web3 = new imp(new imp.providers.HttpProvider("HTTP://127.0.0.1:7545")); //keep a sharp eye on two new keyword used

web3.eth.getAccounts().then((account)=>{
  console.log(account);
}); //error if you don't use two new in the httpprovider rpc statement
//eth is the module to connect with the etherum network

//well i Tried getting these accounts using account[0] kinda thing but due to promise pening problem it didn't work until now 

web3.eth                //eth as you know is used to connect to etherum network
  .getBalance("0x922ceA1a46069131241A4Ae5f07A60146b0c8dE0")
  .then(console.log); //use then cuz its promise which are used in api so that waiting doesn't dead our resoponse it will be stored when available

web3.eth.sendTransaction({
  from: "0x69Ce7E2bBe9B787c8F12163BD906595857f2FcF7",
  to: "0x922ceA1a46069131241A4Ae5f07A60146b0c8dE0",
  value: web3.utils.toWei("1", "ether"),        //web3.utils provides various functionalities one of them is towei (amount, unit).... this will simply calculate and convert the ether unit into wei(smallest unit in transaction)
});


