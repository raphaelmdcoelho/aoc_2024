const fs = require('fs');

//Part 1:

const getFileContent = (filePath) => fs.readFileSync(filePath, 'utf8');

const getRows = (text) => text.split('\n');

const splitColumns = (row) => row.split('   ');

const orderLists = () => {
    const leftList = [];
    const rightList = [];

    let text = getFileContent('day_one_input.txt');
    let rows = getRows(text);
    
    for(var row of rows) {

        const rowRemovedSpecialChars = row.replace('\r', '');

        let rowSplitted = splitColumns(rowRemovedSpecialChars);

        leftList.push(rowSplitted[0]);
        rightList.push(rowSplitted[1]);
    }

    const leftListSorted = leftList.sort((a, b) => a - b);
    const rightListSorted = rightList.sort((a, b) => a - b);

    return {leftList: leftListSorted, rightList: rightListSorted};
}

const lists = orderLists();

let resultSum = 0;

for(var i = 0; i < lists.leftList.length; i++) {
    
    const result = Math.abs(parseInt(lists.leftList[i]) - parseInt(lists.rightList[i]));
    resultSum += result;
}

console.log(resultSum);

//Part 2:

function countOccurrences(array, item) {
    let count = 0;
    for (let element of array) {
        if (element === item) {
            count++;
        }
    }
    return count;
}

let resultSumOccurrences = 0;

lists.leftList.forEach(left => {
    let occurrences = countOccurrences(lists.rightList, left);
    resultSumOccurrences += occurrences * left;
});
    
console.log(resultSumOccurrences);



