const os = require('os');
const fs = require('fs');
const si = require('systeminformation');
const { exec } = require('child_process');
const network = require('network');
const express = require('express');

const app = express();
const port = 3000;

// Data size format
function dataSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// This handles asynchronous tasks through a retry mechanism
async function taskRetry(asyncTask, maxRetries = 3, retryDelay = 1000) {
    let retries = 0;

    while (retries < maxRetries) {
        try {
            return await asyncTask();
        } catch (error) {
            console.error(`Error occurred: ${error.message}`);
            retries++;
            console.log(`Retrying (${retries}/${maxRetries}) in ${retryDelay / 1000} seconds...`);
            await sleep(retryDelay);
        }
    }

    console.error(`Can't complete task, no more attempts.`);
    throw new Error(`Can't complete task, no more attempts.`);
}

// Lets me create a delay with the use of promises from the child_process dependency
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Displays system information like the name, architecture, and uptime, for the uptime I added values to make it the time I wanted it to show
function systemInfo() {
    const osType = os.type();
    const osArch = os.arch();
    const systemUptime = os.uptime();

    return {
        osType,
        osArch,
        systemUptime: `${Math.floor(systemUptime / 3600)}h ${Math.floor((systemUptime % 3600) / 60)}m`,
    };
}

// CPU temperature and this also has an error catch message if it can't be obtained
async function grabCpuTemperature() {
    try {
        const temperature = await si.cpuTemperature();
        return temperature.main;
    } catch (error) {
        console.error('Issue retrieving CPU temp', error);
        throw new Error('Issue retrieving CPU temp');
    }
}

// CPU usage and has an error message if it can't be obtained
async function grabCpuUsage() {
    try {
        const usage = await si.currentLoad();
        const currentLoad = usage.cpus[0]?.load;

        if (typeof currentLoad !== 'undefined') {
            return currentLoad.toFixed(2);
        } else {
            throw new Error('Invalid CPU usage data');
        }
    } catch (error) {
        console.error('Cannot determine CPU usage', error);
        throw new Error('Cannot determine CPU usage');
    }
}

// This lets someone extract the disk information I think is most useful to a person running the script
async function diskSpace() {
    try {
        const disks = await si.fsSize();
        return disks.map((disk) => ({
            device: disk.mount,
            size: dataSize(disk.size),
            used: dataSize(disk.used),
            available: dataSize(disk.available),
            capacity: `${disk.use.toFixed(2)}%`,
        }));
    } catch (error) {
        console.error('Cannot retrieve disk information', error);
        throw new Error('Cannot retrieve disk information');
    }
}

// This displays the network information I think users would have to search for and it can be tedious, so I wanted to help with that
async function grabNetworkInfo() {
    try {
        const networkInfo = await si.networkInterfaces();
        return networkInfo.map((iface) => ({
            name: iface.iface,
            ip4: iface.ip4,
            ip6: iface.ip6,
            mac: iface.mac,
            speed: dataSize(iface.speed),
        }));
    } catch (error) {
        console.error('Cannot retrieve network information', error);
        throw new Error('Cannot retrieve network information');
    }
}

// This will grab the private IP address from the user's machine and print a error message if it can't
async function grabPrivateIpAddress() {
    return new Promise((resolve, reject) => {
        network.get_private_ip((err, ip) => {
            if (err) {
                console.error('Error grabbing local IP address', err);
                reject(err);
            } else {
                resolve(ip);
            }
        });
    });
}

// This is the section for my Nmap scan and system data; I also made the files output through this section as well
async function systemDatandNmapData() {
    await taskRetry(async () => {
        const totalMemory = os.totalmem();
        const availableMemory = os.freemem();
        const usedMemory = totalMemory - availableMemory;
        const usedMemoryPercentage = ((usedMemory) / totalMemory) * 100;
        const availableMemoryPercentage = (availableMemory / totalMemory) * 100;

        let cpuTemperature, cpuUsage;

        cpuTemperature = await grabCpuTemperature();
        cpuUsage = await grabCpuUsage();

        const diskSpaceInfo = await diskSpace();
        const networkInfo = await grabNetworkInfo();
        const systemInfoData = systemInfo();

        // Grabs the local IP address dynamically
        const targetIpAddress = await taskRetry(grabPrivateIpAddress);

        const dataInfo = `
            System Information:
            - Operating System: ${systemInfoData.osType}
            - Architecture: ${systemInfoData.osArch}
            - System Uptime: ${systemInfoData.systemUptime}

            CPU Information:
            - CPU Temperature: ${cpuTemperature}
            - CPU Usage: ${cpuUsage}
            
            Memory Information:
            - Total Memory: ${dataSize(totalMemory)}
            - Available Memory: ${dataSize(availableMemory)}
            - Used Memory: ${dataSize(usedMemory)}
            - Used Memory Percentage: ${usedMemoryPercentage.toFixed(2)}%
            - Available Memory Percentage: ${availableMemoryPercentage.toFixed(2)}%
            
            Disk Space Information:
            ${diskSpaceInfo.map((disk) => `   - ${disk.device}: Size: ${disk.size}, Used: ${disk.used}, Available: ${disk.available}, Capacity: ${disk.capacity}`).join('\n')}
            
            Network Information:
            ${networkInfo.map((iface) => `   - ${iface.name}: IP4: ${iface.ip4}, IP6: ${iface.ip6}, MAC: ${iface.mac}, Speed: ${iface.speed}`).join('\n')}
        `;

        const outputFilePath = 'SystemInformation.txt';

        fs.writeFileSync(outputFilePath, dataInfo);
        console.log('System info saved to SystemInformation.txt');

        // Runs an Nmap scan after a system data file is created (the systemDatandNmapData scan)
        await taskRetry(() => runNmapScan(targetIpAddress));
    });
}

// This runs another Nmap scan and saves what is outputted a standalone scan but contrubites the security lookup file
async function runNmapScan(targetIpAddress) {
    await taskRetry(() => _runNmapScan(targetIpAddress));
}

// Function to run an Nmap scan and save the results to a SecurityLookUp.txt file
function _runNmapScan(targetIpAddress) {
    const outputFilePath = 'SecurityLookUp.txt';
    const nmapCommand = `nmap -Pn -p- --open --script vuln ${targetIpAddress}`;

    return new Promise((resolve, reject) => {
        exec(nmapCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running nmap: ${error.message}`);
                reject(error);
                return;
            }

            const auditResult = `
                Security LookUp Results:
                ${stdout}
                
                Error Output:
                ${stderr}
            `;

            fs.writeFileSync(outputFilePath, auditResult);
            console.log('Security scan results saved to SecurityLookUp.txt');
            resolve();
        });
    });
}

// Once the script runs this will save the data immediately and then after 30 seconds
// I didn't put a stop to this so users can look at the browser freely; they can stop it on their own with control and c in the command prompt

systemDatandNmapData();
const interval = setInterval(systemDatandNmapData, 30000);

// This gives a route for the web interface
app.get('/', async (req, res) => {
    try {
        // These read the files
        const systemInformation = fs.readFileSync('SystemInformation.txt', 'utf8');
        const securityLookUp = fs.readFileSync('SecurityLookUp.txt', 'utf8');

        // Sends files content as the response
        res.send(`
            <pre>System Information:
            ${systemInformation}</pre>
            <pre>Security LookUp Results:
            ${securityLookUp}</pre>
        `);
    } catch (error) {
        console.error('Error processing web request', error);
        res.status(500).send('Internal Server Error');
    }
});

// Web server start
app.listen(port, () => {
    console.log(`Web running at http://localhost:${port}`);
});
