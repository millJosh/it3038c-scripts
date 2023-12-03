const os = require('os');
const fs = require('fs');
const si = require('systeminformation');
const { exec } = require('child_process');
const network = require('network');
const express = require('express');

const app = express();
const port = 3000;

// Formatting Data Size
function dataSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// This handles asynchronous tasks through a retry mechanism, there will be a an example of this in the README file, if everything is correct and you downloaded the right things you shouldn't encounter this
async function retryAsyncTask(asyncTask, maxRetries = 3, retryDelay = 1000) {
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

    console.error(`Max retries reached. Unable to complete the task.`);
    throw new Error(`Max retries reached. Unable to complete the task.`);
}

// Lets me create a dElAyPromises
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to gather CPU temperature
async function getCpuTemperature() {

    try {
        const temperature = await si.cpuTemperature();
        return temperature.main;
    } catch (error) {
        console.error('Error getting CPU temperature', error);
        throw new Error('Failed to retrieve CPU temperature');
    }
}

// Function to gather CPU usage
async function getCpuUsage() {
    try {
        const usage = await si.currentLoad();
        const currentLoad = usage.cpus[0]?.load;

        if (typeof currentLoad !== 'undefined') {
            return currentLoad.toFixed(2);
        } else {
            throw new Error('Invalid CPU usage data');
        }
    } catch (error) {
        console.error('Error getting CPU usage', error);
        throw new Error('Failed to retrieve CPU usage');
    }
}

// Function to gather disk space information
async function getDiskSpace() {
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
        console.error('Error getting disk space information', error);
        throw new Error('Failed to retrieve disk space information');
    }
}

// Function to gather network information
async function getNetworkInfo() {
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
        console.error('Error getting network information', error);
        throw new Error('Failed to retrieve network information');
    }
}

// Function to gather system information
function getSystemInfo() {
    const osType = os.type();
    const osArch = os.arch();
    const systemUptime = os.uptime();

    return {
        osType,
        osArch,
        systemUptime: `${Math.floor(systemUptime / 3600)}h ${Math.floor((systemUptime % 3600) / 60)}m`,
    };
}

// Function to get private IP address with retry
async function getPrivateIpAddress() {
    return new Promise((resolve, reject) => {
        network.get_private_ip((err, ip) => {
            if (err) {
                console.error('Error getting local IP address', err);
                reject(err);
            } else {
                resolve(ip);
            }
        });
    });
}

// Function to save system information to a file and run Nmap scan
async function saveDataAndRunNmapWithRetry() {
    await retryAsyncTask(async () => {
        const totalMemory = os.totalmem();
        const availableMemory = os.freemem();
        const usedMemory = totalMemory - availableMemory;
        const usedMemoryPercentage = ((usedMemory) / totalMemory) * 100;
        const availableMemoryPercentage = (availableMemory / totalMemory) * 100;

        let cpuTemperature, cpuUsage;

        cpuTemperature = await getCpuTemperature();
        cpuUsage = await getCpuUsage();

        const diskSpace = await getDiskSpace();
        const networkInfo = await getNetworkInfo();
        const systemInfo = getSystemInfo();

        // Get the local IP address dynamically
        const targetIpAddress = await retryAsyncTask(getPrivateIpAddress);

        const dataInfo = `
            System Information:
            - Operating System: ${systemInfo.osType}
            - Architecture: ${systemInfo.osArch}
            - System Uptime: ${systemInfo.systemUptime}

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
            ${diskSpace.map((disk) => `   - ${disk.device}: Size: ${disk.size}, Used: ${disk.used}, Available: ${disk.available}, Capacity: ${disk.capacity}`).join('\n')}
            
            Network Information:
            ${networkInfo.map((iface) => `   - ${iface.name}: IP4: ${iface.ip4}, IP6: ${iface.ip6}, MAC: ${iface.mac}, Speed: ${iface.speed}`).join('\n')}
        `;

        const outputFilePath = 'SystemData.txt';

        fs.writeFileSync(outputFilePath, dataInfo);
        console.log('System data saved to SystemData.txt');

        // Run Nmap scan after creating the system data file
        await retryAsyncTask(() => runNmapScan(targetIpAddress));
    });
}

// Function to run an Nmap scan and save the results to a file with retry
async function runNmapScanWithRetry(targetIpAddress) {
    await retryAsyncTask(() => runNmapScan(targetIpAddress));
}

// Function to run an Nmap scan and save the results to a file
function runNmapScan(targetIpAddress) {
    const outputFilePath = 'SecurityAudit.txt';
    const nmapCommand = `nmap -Pn -p- --open --script vuln ${targetIpAddress}`;

    return new Promise((resolve, reject) => {
        exec(nmapCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running nmap: ${error.message}`);
                reject(error);
                return;
            }

            const auditResult = `
                Security Audit Results:
                ${stdout}
                
                Error Output:
                ${stderr}
            `;

            fs.writeFileSync(outputFilePath, auditResult);
            console.log('Security audit results saved to SecurityAudit.txt');
            resolve();
        });
    });
}

// Save data and run Nmap immediately and then every 30 seconds
saveDataAndRunNmapWithRetry();
const interval = setInterval(saveDataAndRunNmapWithRetry, 30000);

// Define a route for the web interface
app.get('/', async (req, res) => {
    try {
        // Read the SystemData.txt file
        const systemData = fs.readFileSync('SystemData.txt', 'utf8');

        // Read the SecurityAudit.txt file
        const securityAudit = fs.readFileSync('SecurityAudit.txt', 'utf8');

        // Send both files' content as the response
        res.send(`
            <pre>System Data:
            ${systemData}</pre>
            <pre>Security Audit Results:
            ${securityAudit}</pre>
        `);
    } catch (error) {
        console.error('Error processing web request', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the web server
app.listen(port, () => {
    console.log(`Web interface running at http://localhost:${port}`);
});

