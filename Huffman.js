//Задача: закодировать строку,составить таблицу кодов,и на основе этой таблицы раскодировать строку
//Дерево будем хранить в массиве,отдельная ячейка-отдельный узел
function Node(letter, freq, used, father, code) {
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}

let fs = require("fs");
let arg = process.argv;
let alph = new Array();
let inputData = fs.readFileSync(arg[2]);
inputData = inputData.toString();
for (let i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)] = 0;
}
for (let i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)] += 1;
}
let tree = new Array();
for (q in alph) {
    let n = new Node(q, alph[q], false, null, '');
    tree.push(n);
}
long = tree.length;
for (let i = 0; i < long - 1; i++) {
    let min = inputData.length;
    let num1;
    let num2;
    for (let k = 0; k < tree.length; k++) {
        if (min > tree[k].freq && !tree[k].used) {
            min = tree[k].freq;
            num1 = k;
        }
    }
    tree[num1].used = true;
    tree[num1].father = tree.length;
    tree[num1].code = '0';
    let minS = inputData.length;
    for (let i = 0; i < tree.length; i++) {
        if (minS > tree[i].freq && !tree[i].used) {
            minS = tree[i].freq;
            num2 = i;
        }
    }

    tree[num2].used = true;
    tree[num2].father = tree.length;
    tree[num2].code = '1';
    let n = new Node(tree[num1].letter + tree[num2].letter, tree[num1].freq + tree[num2].freq, false, null, '')
    tree.push(n);
}
let codes = [];
for (let i = 0; i < long; i++) {
    let g = i;
    codes[tree[g].letter] = '';
    while (tree[g].father != null) {
        codes[tree[i].letter] = tree[g].code + codes[tree[i].letter];
        g = tree[g].father;

    }
}
let str = '';
for (let i = 0; i < long; i++) {
    let j = inputData[i];
    str += codes[j];


}
fs.writeFileSync(arg[3],str);
console.log("Successful!")