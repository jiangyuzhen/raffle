const fs = require('fs');

const padLeft = (val, sed='0000') => {
  return sed.substring(0, sed.length - val.length) + val
}

const getContent = () => {
  let string = '';
  for (let i = 1; i <= 72; i++) {
      let s = `.person_${padLeft(i.toString(), '0000')} { background-image: url(./img/person/${padLeft(i.toString())}.jpg);} \n`;
      string += s;
  }
  return string;
}

fs.writeFile('img.css', getContent(), err => {
  if (err) throw err;
  console.log('success')
});
