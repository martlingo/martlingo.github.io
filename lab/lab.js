let sequence = [];
let currentBet = 0;
let profit = 0;
let lastState = null; // Store the last state for a single undo
let currentColor = 'Red'; // Initial betting color
let betCount = 0; // Counter to track number of bets on the current color
const maxBetsPerColor = 2; // Maximum bets on one color before switching

document.getElementById('start').addEventListener('click', function() {
    let unitSize = parseInt(document.getElementById('unitSize').value, 10);
    if (isNaN(unitSize) || unitSize <= 0) {
        alert('Please enter a valid positive value for the unit size.');
        return;
    }

    profit = 0; // Reset profit at the start of a new sequence
    initializeSequence(unitSize);
    updateNextBet();
    updateDisplays();
    disableUndo(); // Disable undo button on start
});

document.getElementById('won').addEventListener('click', function() {
    saveLastState(); // Save state before update
    updateSequenceForWin();
    updateDisplays();
    enableUndo(); // Enable undo after a change
});

document.getElementById('lost').addEventListener('click', function() {
    saveLastState(); // Save state before update
    updateSequenceForLoss();
    updateDisplays();
    enableUndo(); // Enable undo after a change
});

document.getElementById('undo').addEventListener('click', function() {
    if (!lastState) {
        alert("No actions to undo.");
        return;
    }
    // Restore the last state
    sequence = [...lastState.sequence];
    profit = lastState.profit;
    currentBet = lastState.currentBet;
    currentColor = lastState.currentColor; // Restore the color state
    betCount = lastState.betCount; // Restore the bet count
    updateDisplays();
    lastState = null; // Clear last state after undo
    disableUndo(); // Disable undo button after use
});

function initializeSequence(unitSize) {
    sequence = new Array(10).fill(unitSize);  // Fill sequence with 10 parts of unit size
    currentColor = 'Red'; // Start with Red
    betCount = 0; // Reset bet count
    updateNextBet(); // Ensure next bet is calculated right after initialization
}

function updateNextBet() {
    if (betCount >= maxBetsPerColor) {
        // Switch color after two bets
        currentColor = (currentColor === 'Red' ? 'Black' : 'Red');
        betCount = 0;
    }
    currentBet = 10; // Fixed bet amount for simplicity
    betCount++;
}

function updateDisplays() {
    document.getElementById('nextBet').innerText = `10 on ${currentColor}`; // Display the next bet as "10 on Color"
    document.getElementById('sequenceDisplay').innerText = sequence.join(', ');
    document.getElementById('profitDisplay').innerText = profit;
}

function updateSequenceForWin() {
    profit += currentBet;
    sequence.pop();
    sequence.shift();
    updateNextBet();
}

function updateSequenceForLoss() {
    sequence.push(currentBet);
    profit -= currentBet;
    updateNextBet();
}

function saveLastState() {
    lastState = {
        sequence: [...sequence],
        profit: profit,
        currentBet: currentBet,
        currentColor: currentColor, // Save current color
        betCount: betCount // Save bet count
    };
}

function enableUndo() {
    document.getElementById('undo').disabled = false;
}

function disableUndo() {
    document.getElementById('undo').disabled = true;
}
