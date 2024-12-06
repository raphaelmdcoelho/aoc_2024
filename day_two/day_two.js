const fs = require('fs');

const getFileContent = (filePath) => fs.readFileSync(filePath, 'utf8');

const getRows = (text) => text.split('\n');

const splitLevels = (row) => row.split(' ');

const checkFlow = (levels) => {

    flow = '';

    for(let i = 0; i < (levels.length - 1); i++) {

        let element = parseInt(levels[i]);
        let nextElement = parseInt(levels[i + 1]);

        if(i === 0) {
            if(element > nextElement) {
                flow = 'desc';
            }

            if(element < nextElement) {
                flow = 'asc';
            }

            if(element === nextElement) {
                return false;
            }
        } 

        if(i > 0) {
            if(flow === 'asc' && (element > nextElement) || (element === nextElement)) {
                return false;
            }
        
            if(flow === 'desc' && (element < nextElement) || (element === nextElement) ) {
                return false;
            }
        }

    }
        return true;
}

const checkAdjacentDifference = (levels) => {
    for(var i = 0; i < levels.length - 1; i++) {
        const difference = Math.abs(parseInt(levels[i]) - parseInt(levels[i + 1]));
        if(difference < 1 || difference > 3) {
            return false;
        }
    }
    return true;
}

const isSafe = (levels) => {
    return checkFlow(levels) && checkAdjacentDifference(levels);
}

const validateLevels = (levels) => {

    if(isSafe(levels)) {
        return 1;
    } else {
        for(let i = 0; i < levels.length; i++) {
            let levelsCopy = [...levels];
            levelsCopy.splice(i, 1);
            if(isSafe(levelsCopy)) {
                return 1;
            }
        }
    }

    return 0;
}

const text = getFileContent('day_two_input.txt');
const rows = getRows(text);

let summResult = 0;

for(var row of rows) {
    const rowsWithoutSpecialCharacters = row.replace('\r', '');

    levels = splitLevels(rowsWithoutSpecialCharacters);

    summResult += validateLevels(levels);
}

console.log(summResult);