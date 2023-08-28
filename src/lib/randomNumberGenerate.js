const usersData = require('../files/data.json');

const randomNumberGenerate = () => {
    const randomNumber = Math.round(Math.random() * usersData.length);
    console.log("usersData.lengt:", usersData.length, "randomNumber", randomNumber);
    if (randomNumber < 0 || randomNumber >= usersData.length) {
        return randomNumberGenerate();
    }
    return randomNumber;
};

const randomIdGenerated = () => {
    const idArray = usersData.map((user) => user.id);
    const shortIdArray = idArray.sort((function (a, b) { return a - b }))
    const expectedLength = shortIdArray[shortIdArray.length - 1];

    let missingElements = [];
    for (let i = 1; i <= expectedLength; i++) {
        if (!idArray.includes(i)) {
            missingElements.push(i);
        }
    }
    if (missingElements.length) {
        return missingElements[0]
    }
    else {
        return usersData.length + 1
    }
};
const lastIdNumber = () => {
    const idArray = usersData.map((user) => user.id);
    const shortIdArray = idArray.sort((function (a, b) { return a - b }))
    const expectedLength = shortIdArray[shortIdArray.length - 1];
    return expectedLength
};

module.exports = {
    randomNumberGenerate,
    randomIdGenerated,
    lastIdNumber
}

// if (1 <= randomNumber <= 10) {
//     return randomNumber;
// }