// Only for utf-8 encoding
const dataSplitter = (readableStream, prefix, postfix) => {
  let remainder = '';
  readableStream.setEncoding('utf8');
  if (!prefix || !postfix) throw new Error('Provide all the arguments');

  readableStream.on('data', (chunk) => {
    chunk = remainder + chunk;
    remainder = '';

    let data = chunk.split(prefix);
    if (data.length < 2) throw new Error('Not valid data');

    if (prefix === postfix) {
      if (data.at(-1) !== '' || data.at(-2) === '') {
        remainder = prefix + data.at(-1);
        data.pop();
      }

      const prevLen = data.length;
      data = data.filter((element) => element !== '');
      if (data.length * 2 + 1 !== prevLen) throw new Error('Not valid data');
    } else {
      if (data.at(-1).at(-1) !== postfix) {
        remainder = prefix + data.at(-1);
        data.pop();
      }

      if (data.length) data.shift();

      data = data.map((element) => {
        if (!element || element.split(postfix).length > 2)
          throw new Error('Not valid data');
        return element.slice(0, -1);
      });
    }

    if (data.length) console.log(data);
  });

  readableStream.on('end', () => {
    if (remainder !== '') throw new Error('Not valid data');
    console.log('End ths stream');
    console.log('------------------------------------------');
  });
};

module.exports = dataSplitter;
