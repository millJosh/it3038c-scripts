const os = require('os');
const fs = require('fs');

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const availableMemory = os.freemem();
const totalMemory = os.totalmem();

console.log('Total Memory:', bytesToSize(totalMemory));
console.log('Available Memory:', bytesToSize(availableMemory));
console.log('Used Memory:', bytesToSize(totalMemory - availableMemory));

function saveMemoryInfoToFile() {
    const availableMemory = os.freemem();
    const totalMemory = os.totalmem();

    const memoryInfo = `
        Total Memory: ${bytesToSize(totalMemory)}
        Available Memory: ${bytesToSize(availableMemory)}
        Used Memory: ${bytesToSize(totalMemory - availableMemory)}
    `;

    fs.writeFile('memory_info.txt', memoryInfo, (err) => {
        if (err) {
            console.error('Error writing memory info to file:', err);
        } else {
            console.log('Memory info saved to memory_info.txt');
        }
    });
}

setInterval(saveMemoryInfoToFile, 10000);

const usedMemoryPercentage = ((totalMemory - availableMemory) / totalMemory) * 100;
console.log('Used Memory Percentage:', usedMemoryPercentage.toFixed(2) + '%');


