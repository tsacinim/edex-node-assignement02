const fs = require('fs');

// seed store data by reading from disk
const storeData = fs.readFileSync('./data.json', "utf8")
  .replace(/\r?\n|\r/g,'\n'); // normalize line endings

module.exports = JSON.parse(storeData)