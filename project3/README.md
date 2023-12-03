# This project is adding to my second project I will put a link to that here: https://github.com/millJosh/it3038c-scripts/tree/main/project2 

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

# Please keep in mind the following:
## The data it shows you will be different, however, the names should still be the same for the command prompt, files, and web browser, if your port 3000 is occupied there is a chance my code will not work in a web browser, you can either change the files port to a different one, or you might have to clear that port for it to work on the web

# Comple more things!
## I did mine in Linux Centos, so the people who do it there will have a smoother time I did not try this on Powershell but it should work on there as well if you can download and install everything needed. Also, if the files are taking a while to populate or if anything pops up let the script continue to run it will make the files eventually, we all have different systems so keep that in mind, Thank You.

## What my updated project shows now:
1. It shows data for: (Please refer to the screenshots above for what they look like)
- CPU’s Temperature and usage
- Memory Status (refer to the link for project 2)
- Disk Data 
- Network Interfaces
2. It automatically does a network scan of your local(private) IP address to find potential vulnerabilities in the network using Nmap
3. It logs all these pieces of data in 2 different log files one for the system data and one for the Nmap scan data
4. It takes these logs and puts them in a web browser for users to look at instead of having to open two files. Someone can go to the browser https://localhost:3000 either by clicking on the link in the command prompt or searching for it and seeing the files in real-time as they update. Of course, you can still go to the files themselves and see them but you would have to reload them as the script is still running, the plus side of viewing the files is that the data will be saved in there when you stop the script and you can secure those files yourself. The web browser doesn't have this option and will end when you stop the script(if you are lucky the screen will stay and you can still view the data in the web browser depending on your connection). I also didn’t put a count on how long the files will update because I want users to be able to look at the web browser for as long as they want. They can end it by hitting control and C at the same time. 
5. It also has a triple count of retry throws that will happen if an error occurs I don’t expect users to go through this so I will upload an example of it above.

## Why I think this is useful
1. The system monitoring can directly contribute to the health and performance of your machine, giving you a simple rundown if you are running out of space, and you need to clear it up, or your machine is getting too hot and you need to get off to cool it down.
2. Through automated security scans it can identify potential vulnerabilities in the network especially useful needing to close a port or monitor their system.
3. With data logging users can review historical data track changes over time, and reflect on their actions that made their machine's performance worse or better.  With the logs, they can store them in a safe location as well.
4. With the retry mechanism, let's say we are fetching the CPU temperature for example, it can improve reliability for data collection and help in situations where errors occur. 
5. This one was kinda just me having fun partially but it has its uses. Through the web interface, it gives users a convenient way to access and view information without having to keep their files or open them.
6. With the automatic dynamic IP grab, allows it to be used on different networks to work on this project. 

Other Reasons:
This script is very customizable so users can add what they would like to and it is easy to use letting users find things that they might find tedious to look for. 

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

### IMPORTANT! You will also need to install dependencies to use this project

The simplest way is to do the following in a command prompt:

npm install os fs systeminformation child_process network express

Or you could do them one at a time like:

npm install os

Follow that format for each dependency 

### Using Node
You should be able to use Node and the dependencies now, you just need to download the project file "FinalProject.js", and go to a machine (RECOMMENDED: Linux machine) that you installed Node on and move the file there so you can use the commands to run this project, or you could just download the file directly on that machine as well. To get the results as shown above, in the command prompt go to the directory you put the file in and you would type node than the file name in the command prompt. 

So it would look something like this:

node FinalProject.js

After you have run it and you want to look at the files it made, go to your files on your computer and the directory you used on your command prompt and it should be there.

To view it on the web browser you HAVE to keep the script running, if it is running you can either click the link inside the command prompt or type in https//:localhost:3000 in Firefox on Centos or the browser of your choice on PowerShell and it should be there. 

The script should still be running after you are done go to your command prompt and hit control and c at the same time and that will stop it.

And that is everything, I thank you for your time!

## References:
I used my second project and a ton of websites including Google, and the GitHub link for class

https://nodejs.org/api/os.html 

I used this entire site a lot as I was going through my project, not just this page I linked

https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

For my byte sizes

https://snyk.io/advisor/npm-package/systeminformation/functions/systeminformation.cpuTemperature

CPU temp took inspiration for my CPU usage as well

https://www.tabnine.com/code/javascript/functions/systeminformation/fsSize

Helped me with disk space

https://stackoverflow.com/questions/30763496/how-to-promisify-nodes-child-process-exec-and-child-process-execfile-functions

Helped with the promises from the child dependency

https://www.varonis.com/blog/nmap-commands

Helped a bit with Nmap, I just did a lot of googling for Nmap

https://expressjs.com/en/starter/hello-world.html

Helped with getting my web server started

I also used other sites but I can't remember what they were, but they were more for code confirmation and would help me figure out what I needed to type in my code.

