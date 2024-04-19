let sequence = [];
let currentBet = 0;
let profit = 0;
let lastState = null; // Store the last state for a single undo

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
    updateDisplays();
    lastState = null; // Clear last state after undo
    disableUndo(); // Disable undo button after use
});

function initializeSequence(unitSize) {
    sequence = new Array(10).fill(unitSize);  // Fill sequence with 10 parts of unit size
    updateNextBet(); // Ensure next bet is calculated right after initialization
}

function updateNextBet() {
    if (sequence.length > 1) {
        currentBet = sequence[0] + sequence[sequence.length - 1];  // Sum of the first and last elements
    } else if (sequence.length === 1) {
        currentBet = sequence[0];  // If only one element, the bet is that element
    } else {
        currentBet = 0;  // No elements in sequence
    }
}

function updateDisplays() {
    document.getElementById('nextBet').innerText = currentBet;  // Display the next bet
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
        currentBet: currentBet
    };
}

function enableUndo() {
    document.getElementById('undo').disabled = false;
}

function disableUndo() {
    document.getElementById('undo').disabled = true;
}
