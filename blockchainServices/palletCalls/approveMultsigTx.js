const inquirer = require("inquirer");
const { getKeypair, getApi, signAndSend } = require("../setup");

const question = [
  {
	type: "input",
	name: "multisigAccount",
	message: "input multisig account",
	default: '5DjYJStmdZ2rcqXbXGX7TW85JsrW6uG4y9MUcLq2BoPMpRA7',
  },
  {
	type: "input",
	name: "call",
	message: "the function to call",
	default: "Mint",
  },
  {
	type: "input",
	name: "promptArguments",
	message: "an array of arguments",
	default: '["1", "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", "1"]',
  },
  {
	  type: 'input',
	  name: 'admin',
	  message: 'sender of the transaction',
	  default: '//Alice'
  },
  {
	  type: "input",
	  name: "threshold",
	  message: "m of n",
	  default: "2",
	},
	{
	  type: "input",
	  name: "otherSignatories",
	  message: "other signatories array",
	  default: '["5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty", "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y"]',
	},
];

const createMultisigTx = async () => {
  const { multisigAccount, call, promptArguments, threshold, otherSignatories, admin } = await inquirer.prompt(question);
  const arguments = JSON.parse(promptArguments)
  console.log({multisigAccount, call, arguments})
  const api = await getApi();
  const sender = getKeypair(admin);
  console.log(Number(arguments[0]), arguments[1], arguments[2])
  const preppedTx = api.tx.assets
	  .mint(Number(arguments[0]), arguments[1], arguments[2])
	  console.log(threshold, JSON.parse(otherSignatories), preppedTx.toHex(), false, 0)
  const tx = api.tx.multisig.asMulti(threshold, JSON.parse(otherSignatories), null, preppedTx.toHex(), false, 0)
  await signAndSend(tx, api, sender)
};

module.exports = {
  createMultisigTx,
};
