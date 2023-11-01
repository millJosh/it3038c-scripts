# Example of expected output in Command Prompt: 
![Project2-1](https://github.com/millJosh/it3038c-scripts/assets/113854085/0d817b47-8ef4-4c13-bd80-d3850d9128fb)

# Example of expected output in MemoryData.txt:
![Project2-2](https://github.com/millJosh/it3038c-scripts/assets/113854085/2e031d0f-0022-43a1-9ed8-7d4f80a5e398)

## What it shows:
1. It shows how much memory someone has used, how much is left available, and the total amount of memory on their drive space. 
2. Also shows the percentages of the available and used memory.
3. Lastly, it takes those values caculated and puts them into a MemoryData file in your directory, so you can use it for future reasons, it does it three times and for the sake of your time and mine it's only on a 10 second timer. 

## How it functions: 
Through the modules const os = require('os') and const fs = require('fs') we can retreive information, such as the system memory in this case we can use it to find total, used and available hard drive memory. If you choose to follow along with the steps below please look at the code as you read so it can give you a better understanding. 

### Part 1: Displaying the memory on your Hard Drive
1. First import the modules we need to get the data we want which we talk about above, those being const os = require('os') and const fs = require('fs').
2. Next, we need to make a function for the bytes that we would like displayed, something that goes from bytes to terabytes.
3. Then we we identify the infromation we want from the system through the methods that the os module gives like total memory or free memory.
4. The last thing to do is display the infromation we want, the total space, available space and used space.

### Part 2: Displaying the data earlier as percentages
1. We can use the same functions as before for the math we need to do for the percentages, we just need to name them and do some mutiplication and division.
2. The other thing we need to do is change the way it is outputted to let it show as a percentage.

### Part 3:
1. We need to make a function for the file we want to create, in this function we want to put in all the fields we made before.
2. Through the fs method we can make sure all that information is going to our txt file.
3. We also want to make sure that if a error occurs then it prints out a message for it but if it succeeds it prints "Memory data saved to MemoryData.txt".
4. By using interval and setInterval we can make the file update itself continuously, and after 3 times of doing so it stops itself. 

## Instructions: 
First if you didn't, you need to install node to run this lab (You should have already done this since it was needed for a previous lab, if you have it skip the installing steps) if you don't have node installed, I have some instructions to help you download it on linux (preferred) or powershell.

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

After you have run it and you want to look at the file it made, go to your files on your computer and the directory you used on your command prompt and it should be there.

And that is everything, I thank you for your time!

## Reference:

