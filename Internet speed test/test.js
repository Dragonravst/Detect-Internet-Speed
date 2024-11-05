let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 5; 
let testCompleted = 0;

const imageApi = "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"; // Fixed size image URL

image.onload = async function () {
    endTime = new Date().getTime();

    const response = await fetch(imageApi);
    imageSize = response.headers.get("content-length");
    calculateSpeed();
};

function calculateSpeed() {
    let timeDuration = (endTime - startTime) / 1000;
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    testCompleted++;

    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        bitSpeed.innerHTML = `Speed In Bits: ${averageSpeedInBps}`;
        kbSpeed.innerHTML = `Speed In Kbs: ${averageSpeedInKbps}`;
        mbSpeed.innerHTML = `Speed In Mbs: ${averageSpeedInMbps}`;
        info.innerHTML = "Test Completed!";
    } else {
        startTime = new Date().getTime();
        image.src = imageApi; 
    }
}

const init = () => {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

window.onload = init;
