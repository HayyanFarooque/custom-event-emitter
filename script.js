class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }

    off(event, listenerToRemove) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }
}

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Get references to the buttons and event log
const event1Btn = document.getElementById('event1Btn');
const event2Btn = document.getElementById('event2Btn');
const clearLogsBtn = document.getElementById('clearLogsBtn');
const eventLog = document.getElementById('eventLog');

let event1Count = 0;
let event2Count = 0;

// Define event listeners
const logEvent1 = () => {
    event1Count++;
    const li = document.createElement('li');
    li.textContent = `Event 1 triggered! (${event1Count} times)`;
    li.classList.add('event1-log');
    eventLog.appendChild(li);
};

const logEvent2 = (message) => {
    event2Count++;
    const li = document.createElement('li');
    li.textContent = `Event 2 triggered: ${message} (${event2Count} times)`;
    li.classList.add('event2-log');
    eventLog.appendChild(li);
};

// Register event listeners
eventEmitter.on('event1', logEvent1);
eventEmitter.on('event2', logEvent2);

// Trigger events when buttons are clicked
event1Btn.addEventListener('click', () => {
    eventEmitter.emit('event1');
});

event2Btn.addEventListener('click', () => {
    eventEmitter.emit('event2', 'Hello from Event 2!');
});

// Clear logs when the clear button is clicked
clearLogsBtn.addEventListener('click', () => {
    eventLog.innerHTML = '';
    event1Count = 0;
    event2Count = 0;
    console.log('Event logs cleared');
});
