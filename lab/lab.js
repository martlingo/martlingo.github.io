let sequence = [];
let currentBet = 0;
let profit = 0;

document.getElementById('start').addEventListener('click', function() {
    let minBet = parseInt(document.getElementById('minBet').value, 10);
    let targetProfit = parseInt(document.getElementById('targetProfit').value, 10);
    let split = parseInt(document.getElementById('split').value, 10);
    profit = 0; // Reset profit at the start
    if (minBet > 0 && targetProfit > 0 && split > 0) {
        initializeSequence(minBet, targetProfit, split);
        updateNextBet();
        updateDisplays();
        document.getElementById('won').style.display = 'block'; // Show 'Won' button
        document.getElementById('lost').style.display = 'block'; // Show 'Lost' button
    } else {
        alert('Please enter positive values for all fields.');
    }
});

// Initially hide 'Won' and 'Lost' buttons
document.getElementById('won').style.display = 'none';
document.getElementById('lost').style.display = 'none';

document.getElementById('won').addEventListener('click', function() {
    profit += currentBet;
    sequence.pop();
    sequence.shift();
    updateNextBet();
    updateDisplays();
});

document.getElementById('lost').addEventListener('click', function() {
    sequence.push(currentBet);
    profit -= currentBet;
    updateNextBet();
    updateDisplays();
});

function initializeSequence(minBet, targetProfit, split) {
    sequence = [];
    let part = Math.round(targetProfit / split);
    for (let i = 0; i < split; i++) {
        sequence.push(part);
    }
}

function updateNextBet() {
    if(sequence.length > 1) {
        currentBet = sequence[0] + sequence[sequence.length - 1];
    } else {
        currentBet = sequence[0] || 0;
    }
    document.getElementById('nextBet').innerText = currentBet;
}

function updateDisplays() {
    document.getElementById('sequenceDisplay').innerText = sequence.join(', ');
    document.getElementById('profitDisplay').innerText = profit;
}
