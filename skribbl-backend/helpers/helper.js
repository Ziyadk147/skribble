const { defaultRandomWords } = require("../constants/constants");

const fetchRandomWord = (wordList) => {
    if(!wordList || wordList.length === 0 ) return undefined;
    const randomWorldIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomWorldIndex];
};

const generateSpacesForSelectedWord = (word) => {
    return '_ '.repeat(word.length)
}

const getSpacifiedWord = () => {
    const randomWord = fetchRandomWord(defaultRandomWords);
    const spacifiedWord = generateSpacesForSelectedWord(randomWord);
    return {
        randomWord,
        spacifiedWord
    }
}
module.exports =  {fetchRandomWord ,getSpacifiedWord , generateSpacesForSelectedWord};