# Example of expected output: 
Total Space: 4 GB

Free Space: 1 GB

Used Space: 2 GB

It shows how much space someone has used, has available and the total amount of their hard drive space.

## How it functions: 
Through the modules const os = require('os') and const fs = require('fs') we can retreive information, such as the system memory in this case we use it to find total, used and available hard drive space. To follow along with the steps below please look at the code as you read so it can give you a better understanding. 

1. First import the modules we need to get the data we want which we talk about above, those being const os = require('os') and const fs = require('fs').
2. Next, we need to make a function for the bytes that we would like displayed, something that goes from bytes to terabytes.
3. Then we we identify the infromation we want from the system through the methods that the os module gives like total memory or free memory.
4. The last thing to do is display the infromation we want, the total space, available space and used space.


## Instructions: 
First if you didn't you need to install node to run this lab (You should have already done this since it was needed for a previous lab, if you have it skip the installing steps) if you don't have node installed, I have some instructions to help you download it on linux (preferred) or powershell.

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

You also need to verfiy it by the same commands as above

$ node --version $ npm --version

### Using Node
You should be able to use Node now, next you just need to download the project file "project2.js", and go to a machine (I would personal use a linux machine) that you installed node on and move the file there so you can use the commands to run this project, or you could just download the file directly on that machine as well. And to get the results as shown above, in the command prompt go to the directory with the file in it and you would type node than the files name in the command prompt. 

So it would look something like this:

node project2.js

## Reference:

