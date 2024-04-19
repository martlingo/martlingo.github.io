window.onload = function() {
    document.getElementById('unitSize').value = 10; // Set default unit size
};

document.getElementById('start').addEventListener('click', function() {
    let unitSize = parseInt(document.getElementById('unitSize').value, 10);
    let targetProfit = unitSize * 10; // Calculate target profit
    let split = 10; // Fixed number of parts

    if (isNaN(unitSize) || unitSize <= 0) {
        alert('Please enter a valid positive value for the unit size.');
        return;
    }

    profit = 0;
    initializeSequence(unitSize, targetProfit, split);
    updateNextBet();
    updateDisplays();
});

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

function initializeSequence(unitSize, targetProfit, split) {
    sequence = [];
    let part = unitSize; // Each part is equal to the unit size
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
