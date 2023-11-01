//First Part: Telling someone how much memory they have
const os = require('os');
const fs = require('fs');

function datasize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const availableMemory = os.freemem();
const totalMemory = os.totalmem();

console.log('Total Memory:', datasize(totalMemory));
console.log('Available Memory:', datasize(availableMemory));
console.log('Used Memory:', datasize(totalMemory - availableMemory));

//Second Part: Converting Memory to a Percentage

const UPercentage = ((totalMemory - availableMemory) / totalMemory) * 100;
const APercentage = (availableMemory / totalMemory) * 100;
console.log('Avilable Memory Percentage:', APercentage.toFixed(2) + '%');
console.log('Used Memory Percentage:', UPercentage.toFixed(2) + '%');

//Third Part: Saving memory information to a file

let updatesCount = 0;

function Filesave() {

    const DataInfo = `
        Total Memory: ${datasize(totalMemory)}
        Available Memory: ${datasize(availableMemory)}
        Used Memory: ${datasize(totalMemory - availableMemory)}
	Used Memory Percentage: ${(UPercentage)}
	Avilable Memory Percentage: ${(APercentage)}
    `;

    fs.writeFile('MemoryData.txt', DataInfo, (err) => {
        if (err) {
            console.error('Error writing memory file', err);
        } else {
            console.log('Memory data saved to MemoryData.txt');
	    updatesCount++;

	    if (updatesCount >= 3) {
		clearInterval(interval);
		}
        }
    });
}

const interval = setInterval(Filesave, 10000);
