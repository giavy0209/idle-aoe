export const waitfor = (ms : number) => new Promise(r => setTimeout(r , ms))

export const getRndInteger = function (min : number, max : number) {
    return (Math.random() * (max - min) ) + min;
  }