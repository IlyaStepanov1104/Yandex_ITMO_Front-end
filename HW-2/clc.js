function calc(s)  {
    // if (typeof(s) !== "number"){
    //     throw new Error('the argument is not a number');
    // }

    let result = s;
    function f(type, num){
        // if (typeof(num) !== "number"){
        //     throw new Error('the argument is not a number');
        // }
        switch (type) {
            case '+':
                result += num;
                break;
            case '-':
                result -= num;
                break;
            case '*':
                result *= num;
                break;
            case '/':
                result /= num;
                break;
            case '%':
                result %= num;
                break;
            case '**':
                result **= num;
                break;
            // default:
                // throw new Error('unsupported sign');
        }
        return f;
    }

    f.valueOf = function() {return result;}

    return f;
}


// console.log(typeof calc(1) === 'function');
// console.log(calc(1) + 1 === 2);
// console.log(calc(2) + calc(2) === 4);
// console.log(typeof calc(1)('+', 2)('-', 3) === 'function');
// console.log(calc(1)(        '+', 2)('-', 3) + 10 === 10);
// console.log(calc(1)('', 2));

const value = calc(1)('+', 3);
console.log(value('*', 3) + value('*', 2) === 12 + 8 === 20);