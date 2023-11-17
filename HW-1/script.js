function calc(s)  {
    if (typeof(s) !== "number"){
        throw new Error('the argument is not a number');
    }

    let result = s;
    function f(type, num){
        if (typeof(num) !== "number"){
            throw new Error('the argument is not a number');
        }
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
            default:
                throw new Error('unsupported sign');
        }
        return f;
    }

    f.valueOf = function() {return result;}

    return f;
}