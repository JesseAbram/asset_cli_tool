const { createAsset } = require("./palletCalls/createAsset");
const { mint } = require("./palletCalls/mint");
const { burn } = require("./palletCalls/burn");
const { freeze } = require("./palletCalls/freeze");
const { thaw } = require("./palletCalls/thaw");
const {assetDetails} =require('./palletCalls/assetDetails')
const {accountDetails} =require('./palletCalls/accountDetails')

module.exports = {
    createAsset,
    mint,
    assetDetails,
    accountDetails,
    burn,
    freeze,
    thaw
}