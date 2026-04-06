const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('/Users/jay/Developer/Mobile devlopment proposal-3.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('proposal-text.txt', data.text);
    console.log('PDF extracted successfully.');
}).catch(function(error){
    console.error('Error fetching PDF:', error);
});
