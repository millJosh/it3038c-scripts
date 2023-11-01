const os = require('os');
const fs = require('fs');

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const totalSpace = os.totalmem();
const freeSpace = os.freemem();

console.log('Total Space:', bytesToSize(totalSpace));
console.log('Free Space:', bytesToSize(freeSpace));
console.log('Used Space:', bytesToSize(totalSpace - freeSpace));
