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
    // updateNextBet(); // Ensure next bet is calculated right after initialization
    // updateDisplays()
}

function updateNextBet() {
    if (sequence.length >= 2) {
        // Calculate bet as sum of the first and last item in the sequence if there are at least two elements
        currentBet = sequence[0] + sequence[sequence.length - 1];
    } else if (sequence.length === 1) {
        // If there is only one element, bet that amount
        currentBet = sequence[0];
    } else {
        // If there are no elements, set bet to 0
        currentBet = 0;
    }

    if (betCount >= maxBetsPerColor) {
        // Switch color after max bets
        currentColor = (currentColor === 'Red' ? 'Black' : 'Red');
        betCount = 0;
    }
    betCount++;
}

function updateDisplays() {
    if (sequence.length === 0) {
        document.getElementById('bottomPanel').style.display = 'none';
    } else {
        document.getElementById('bottomPanel').style.display = 'block';

        // Update bet circle color and text
        const betCircle = document.getElementById('betCircle');
        betCircle.className = 'mx-auto h-16 w-16 flex items-center justify-center rounded-full ' + (currentColor === 'Red' ? 'red-circle' : 'black-circle');
        document.getElementById('betAmount').innerText = currentBet;

        document.getElementById('sequenceDisplay').innerText = sequence.join(', ');
        document.getElementById('profitDisplay').innerText = profit;
    }
}

function updateSequenceForWin() {
    profit += currentBet;
    if (sequence.length > 1) {
        sequence.pop(); // Remove the last element
        sequence.shift(); // Remove the first element
    } else if (sequence.length === 1) {
        sequence.shift(); // Only remove the first element if there is one left
    }
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
