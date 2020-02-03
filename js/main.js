'use strict';

var gSize = 16;
var gCurrNum = 0;
var gNums;
var gWatch;


function init(){
    var elTimerContainer = document.querySelector('.timer');
    gWatch = new timerWatch(elTimerContainer);
    buildBoard();
}

function createNumsArr() {
    var arr = [];
    for (let i = 1; i <= gSize; i++) {
        arr.push(i)
    }
    return arr;
}

function buildBoard() {
    gNums = createNumsArr();
    shuffle(gNums);
    renderTable();

    let elTds = document.querySelectorAll('.board td');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].innerText = gNums[i];
    }
}

function renderTable() {
    let strHtml = '';

    for (let i = 0; i < Math.sqrt(gSize); i++) {
        strHtml += `<tr>`
        for (let j = 0; j < Math.sqrt(gSize); j++) {
            strHtml += `<td onclick="cellClicked(this)"></td>`;
        }
        strHtml += `</tr>`
    }
    let elTable = document.querySelector('.board');
    elTable.innerHTML = strHtml;
}

function cellClicked(elBtn) {
    if ((elBtn.innerText - 1) === gCurrNum) {
        gCurrNum++;
        elBtn.classList.add('clicked');
        if(gCurrNum === 1) gWatch.start();
    }
    if (gCurrNum === gNums.length) {
        gWatch.stop();
        // watch.reset();
    }
}

function changeLevel(elOpt) {

    switch (elOpt.innerText) {
        case 'Eazy':
            gSize = 16;
            break;
        case 'Hard':
            gSize = 25;
            break;
        case 'Extreme':
            gSize = 36;
            break;
        default:
            break;
    }
    gWatch.stop();
    gWatch.reset();
    buildBoard();
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function timerWatch(elem) {

    var time = 0;
    var offset;
    var interval;
    var isOn;

    function update() {
        if (isOn) time += delta();
    
        elem.textContent = timeFormatter(time);
    }

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;

        offset = now

        return timePassed;
    };

    function timeFormatter(time) {
        time = new Date(time);

        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds().toString();


        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }
        while (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds;
        }
        return `${seconds}.${milliseconds}`;
    };

    this.start = function () {
        interval = setInterval(update.bind(this), 10);
        offset = Date.now();
        isOn = true;
    };
    this.stop = function () {
        clearInterval(interval);
        interval = null;
        isOn = false;

    }
    this.reset = function () {
        time = 0;
        update();
    };
    isOn = false;
};

