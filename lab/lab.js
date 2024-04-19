let sequence = [];
let currentBet = 0;
let profit = 0;
let actionHistory = []; // To track actions for undo purposes

window.onload = function() {
    document.getElementById('unitSize').value = 10; // Set default unit size
};

document.getElementById('start').addEventListener('click', function() {
    let unitSize = parseInt(document.getElementById('unitSize').value, 10);
    let targetProfit = unitSize * 10; // Calculate target profit based on unit size
    let split = 10; // Fixed number of parts

    if (isNaN(unitSize) || unitSize <= 0) {
        alert('Please enter a valid positive value for the unit size.');
        return;
    }

    profit = 0; // Reset profit at the start of a new sequence
    initializeSequence(unitSize, targetProfit, split);
    updateNextBet();
    updateDisplays();
});

document.getElementById('won').addEventListener('click', function() {
    profit += currentBet;
    sequence.pop();
    sequence.shift();
    actionHistory.push('won'); // Record this action
    updateNextBet();
    updateDisplays();
});

document.getElementById('lost').addEventListener('click', function() {
    sequence.push(currentBet);
    profit -= currentBet;
    actionHistory.push('lost'); // Record this action
    updateNextBet();
    updateDisplays();
});

document.getElementById('undo').addEventListener('click', function() {
    if (actionHistory.length === 0) {
        alert("No actions to undo.");
        return;
    }
    let lastAction = actionHistory.pop(); // Remove the last action
    if (lastAction === 'won') {
        // Undo a won bet
        sequence.unshift(currentBet / 2); // Assuming equal parts were removed
        sequence.push(currentBet / 2);
        profit -= currentBet;
    } else if (lastAction === 'lost') {
        // Undo a lost bet
        sequence.pop();
        profit += currentBet;
    }
    updateNextBet();
    updateDisplays();
});

function initializeSequence(unitSize, targetProfit, split) {
    sequence = [];
    for (let i = 0; i < split; i++) {
        sequence.push(unitSize);
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
