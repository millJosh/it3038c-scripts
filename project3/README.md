# Example of expected output in Command Prompt: 
![Command P](https://github.com/millJosh/it3038c-scripts/assets/113854085/abb257db-401e-43a0-a45a-35db8c0bef74)

# Example of expected output in SystemInformation.txt:
![SystemInfo](https://github.com/millJosh/it3038c-scripts/assets/113854085/7a9e2bf7-9095-41b3-9149-3ebc4aa6b364)

# Example of expected output in SecurityLookUp.txt:
![SecurityLookUp](https://github.com/millJosh/it3038c-scripts/assets/113854085/0d8542eb-044d-4c45-9fe3-063da0f9e0e9)

# Example of expected output in web browser
![Web](https://github.com/millJosh/it3038c-scripts/assets/113854085/05804775-cb1a-41e5-a0be-cee4ca54755c)

# Example of error output:
![Error](https://github.com/millJosh/it3038c-scripts/assets/113854085/f3583b08-f2f1-4d2b-8065-07c15af765a4)


### Please keep in mind that the data it shows you will be different, however, the names should still be the same for the command prompt, file, and web browser, Also if your port 3000 is occupied chances are my code will not work in a web browser, you can either change the file outputs to a different port, or you might have to clear that port for it to work on the web

## Two more things
# I did mine in Linux Centos, so the people who do it their will have a smoother time I did not try this on powershell but it should work on their as well if you can downloaded everything needed 
# Also, if the files are taking a while to populate or if anything pops up let the script contuine to run it will makes the files eventually, we all have different systems so keep that in mind

## This project is adding to my second project I will put a link to that here: https://github.com/millJosh/it3038c-scripts/tree/main/project2 

## What my updated project shows now:
1. It shows data for: (Please refer to the screenshots above for what they look like)
CPU’s Temperature and usage
Memory Status (refer to the link for project 2)
Disk Data 
The Network Interfaces
2. Automatically does a network scan of your local IP address to find potential vulnerabilities in the network using Nmap
3. It logs all these pieces of data in 2 different log files one for the system data and the nmap scan data
4. It takes these logs and puts them in a web browser for users to look at instead of having to open two files they can go to the browser and see the files in real time as they update. Of course, you can still go to the files themselves and see them but you would have to reload them as the script is still running, the plus side is that the data will be saved in those files when you stop the script. The web browser doesn't have this option and will end when you stop the script(if your lucky the screen will stay and you can still view the data in the web browser depending on your connection). I also didn’t put a count on how long the files will update because I want users to be able to look at the web browser for as long as they want.
5. It also has a triple count of retry throws that will happen if an error occurs I don’t expect users to go through this so I will upload an example of it above.

## Why I think this is useful
System Monitoring:
It provides real-time information about the system's CPU temperature, usage, memory status, disk space, and network interfaces. This can be valuable for monitoring system health and performance.
Automated Security Audits:
The script runs periodic Nmap scans with security scripts (--script vuln) to identify potential vulnerabilities in the network. This is useful for automated security monitoring and auditing.
Data Logging:
The script logs system information and security audit results to text files (SystemData.txt and SecurityAudit.txt). This allows users to review historical data and track changes over time.
Retry Mechanism:
The script includes a retry mechanism for asynchronous tasks, such as fetching CPU temperature or running Nmap scans. This improves the reliability of data collection, especially in scenarios where transient errors may occur.
Web Interface:
The web interface (http://localhost:3000) provides a convenient way to access and view system information and security audit results. Users can easily check the current state of the system without accessing the terminal.
Dynamic IP Retrieval:
The script dynamically retrieves the private IP address using the network package, making it adaptable to different network configurations.
Ease of Deployment:
Users can deploy and run this script on their systems without much configuration. The script is self-contained and provides a simple interface for both real-time and historical data.
Customization:
Users can extend or modify the script to include additional information or customize the data presentation according to their specific needs.


## Instructions: 
First, if you didn't, you need to install node to run this lab (You should have already done this since it was needed for a previous lab if you have it skip the installing steps) if you don't have node installed, I have some instructions to help you download it on Linux (preferred) or PowerShell.

### Installing Node on Windows
Download the installer from https://nodejs.org/en/download/

Select LTS 64bit. (LTS is Long Term Support and is typically an even release)

To verify the installation

$ node --version

You also need to verify if npm is working

$ npm --version

### Installing Node on Linux (preferred)
To install Node on Linux, we can use a provided RPM install. According to https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora, just run the following:

$ curl --silent --location https://rpm.nodesource.com/setup_14.x | sudo bash -

$ sudo yum -y install nodejs	

You also need to verify it by the same commands as above

$ node --version $ npm --version

### You will also need to download dependencies to use this lab as well 

The simplest way is to do 

npm install os fs systeminformation child_process network express

Or you could do them one at a time like:

NPM install os and follow this format for each dependency 

### Using Node
You should be able to use Node now, you just need to download the project file "FinalProject.js", and go to a machine (I would personally use a Linux machine) that you installed Node on and move the file there so you can use the commands to run this project, or you could just download the file directly on that machine as well. To get the results as shown above, in the command prompt go to the directory you put the file in and you would type node than the files name in the command prompt. 

So it would look something like this:

node FinalProject.js

After you have run it and you want to look at the files it made, go to your files on your computer and the directory you used on your command prompt and it should be there.

To view it on the web browser you HAVE to keep the script running, if it is running you can either click the link inside the command prompt or type in Https//:LocalHost:3000 in Firefox on Centos or the browser of your choice on PowerShell and it should be there. 

The script should still be running after you are done go to your command prompt and hit control and c at the same time and that will stop it.

And that is everything, I thank you for your time!

## References:
https://nodejs.org/api/os.html 

I used this entire site a lot as I was going through my project, not just this paged I linked

https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

For my byte sizes

https://github.com/nodejs/help/issues/2116

Helped me with fs

I also used other sites but I can't remember what they were, but they were more for code comfirmation, and would help me figure out what I needed to type in my code.
