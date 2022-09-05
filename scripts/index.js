module.exports = async function main(callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    callback(0);
  } catch (err) {
    console.error(err);
    callback(1);
  }
}
