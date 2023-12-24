function objectToElement(classBEM, arg) {
  let anwser = classBEM;
  if (typeof arg === 'object') {
    Object.entries(arg).forEach(([key, value]) => {
      if (typeof value === 'boolean' && value) {
        anwser += ` ${classBEM}_${key}`;
      } else {
        anwser += ` ${classBEM}_${key}_${value}`;
      }
    });
  }
  return anwser;
}

const cn = function (blockName) {
  let block = blockName;

  return function () {
    let classBEM, arg;
    if (typeof arguments[0] === 'string') {
      classBEM = `${block}-${arguments[0]}`
      arg = arguments[1];
    } else {
      classBEM = block;
      arg = arguments[0];
    }
    return objectToElement(classBEM, arg);
  }
}

const mix = function () {
  let ans = [];
  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'string') {
      for (const arg of arguments[i].split(' ')) {
        if (!ans.includes(arg)) {
          ans.push(arg);
        }
      }
    }
  }
  return ans.join(' ');
}


const cat = cn('Cat');

console.log(cat()); // Cat
console.log(cat({size: 'm'})); // Cat Cat_size_m
console.log(cat('Tail')); // Cat-Tail
console.log(cat('Tail', {length: 'small'})); // Cat-Tail Cat-Tail_length_small

const dog = cn('Dog');

console.log(dog()); // Dog
console.log(dog({color: 'black', exists: true})); // Dog Dog_color_black Dog_exists

console.log();

console.log(mix(cat(), dog())); // Cat Dog
console.log(mix(cat(), undefined, cat(), dog())); // Cat Dog