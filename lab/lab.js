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
    sequence = new Array(10).fill(unitSize);
    updateNextBet();
}

function updateNextBet() {
    currentBet = (sequence.length > 1) ? sequence[0] + sequence[sequence.length - 1] : (sequence[0] || 0);
}

function updateDisplays() {
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
