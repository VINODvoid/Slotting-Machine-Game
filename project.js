const prompt = require('prompt-sync')();
// Global Variables
// Rows and Columns
const ROWS = 3;
const COLS = 3;
// Symbols and their values
const SYMBOLS_COUNT = {
    "A" :2,
    "B" :4,
    "C":6,
    "D":8
}
const SYMBOLS_VALUES = {
    "A" :5,
    "B" :4,
    "C":3,
    "D":2
}










const deposit  = () =>{
    while (true) {
    const depositAmount = prompt('How much would you like to deposit? ');
    const numberDepositAmount = parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log('Invalid input, please try again');  
    }
    else {
        return numberDepositAmount;
    }
}
};

const getNumberOfLines = () =>{
    while (true) {
        const nLines = prompt("Enter the number of lines on ( 1 - 3 ): ");
    const numberOfLines = parseFloat(nLines);
    if (isNaN(numberOfLines) || numberOfLines > 3 || numberOfLines <= 0)
    {
        console.log('Invalid Number of lines, please try again'); 
    }
    else
    {
        return numberOfLines;
    
    }
        
    }
};
const getBet =(balance ,lines)=>{
    while (true) {
        const bet = prompt("Enter the amount you want to bet per line: ");
    const numberBet = parseFloat(bet);
    if (isNaN(numberBet) || numberBet > balance || numberBet > (balance/lines) )
    {
        console.log('Invalid Bet, please try again'); 
    }
    else
    {
        return numberBet;
    
    }
        
    }
};


const spin= ()  =>{
    const symbols = [];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT))
    {
        for(let i=0; i<count; i++)
        {
            symbols.push(symbol);
        }
    }
   const reels = []
   for(let i=0; i<COLS; i++)
   {
        reels.push([]);
       const reelSymbols = [...symbols]; 
        for (let j = 0; j < ROWS; j++)
        {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbols  = reelSymbols[randomIndex];
            reels[i].push(selectedSymbols);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels; 
};

const transpose = (reels) =>{
    const rows = [];

    for ( let i=0 ; i<ROWS; i++ )
    {
        const row = [];
        rows.push(row);
        for(let j=0;j<COLS;j++)
        {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) =>{
    for(const row of rows)
    {
        let rowString = "";
        for(const[i,symbol] of row.entries())
        {
            rowString += symbol;
        
        
        if( i !=row.length -1)
        {
            rowString += "|";
        }
       
    }
 console.log(rowString);
}
}

const calculateWinnings = (rows,bet,lines) =>{
    let winnings = 0;
    for (let row =0 ; row < ROWS; row++)
    {
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols)
        {
            if(symbol != symbols[0])
            {
                allSame = false;
                break;
            }
        }
        if(allSame)
        {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}
const game = () => {
// Depositing money
let balance = deposit();
while (true)
{
console.log(`You have $${balance}.`);
// Getting number of lines
const numberOfLines = getNumberOfLines();
console.log(`You have successfully deposited $${balance}.`);
// Getting bet amount
const bet = getBet(balance , numberOfLines);
balance -= bet * numberOfLines;
// Spinning the reels
const reels = spin();
// Transposing the reels
const rows = transpose(reels);
// Printing the reels
printRows(rows);
// Calculating the winnings
const winnings = calculateWinnings(rows,bet,numberOfLines);  
balance += winnings;
console.log(`You won $${winnings}.`);
if(balance <= 0)
{
    console.log('You have no money left');
    break ;
}
const playAgain = prompt('Do you want to play again? (Y/N) ');
if(playAgain != "y")
{
    break ;
}
}
};
game();