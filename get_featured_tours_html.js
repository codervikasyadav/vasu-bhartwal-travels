/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');

http.get('http://localhost:8989', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const index = data.indexOf('Featured Pilgrimage Tours');
    if (index !== -1) {
      console.log('FOUND:');
      console.log(data.substring(index - 200, index + 1000));
    } else {
      console.log('NOT FOUND, searching for "Handpicked":');
      const idx2 = data.indexOf('Handpicked');
      if (idx2 !== -1) {
        console.log(data.substring(idx2 - 500, idx2 + 1000));
      } else {
        console.log('Handpicked not found either!');
      }
    }
  });
}).on('error', (err) => {
  console.error('Error: ' + err.message);
});
