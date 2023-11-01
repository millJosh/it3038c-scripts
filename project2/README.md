# Example of expected output: 
Total Space: 4 GB
Free Space: 1 GB
Used Space: 2 GB

It shows how much sapce someone has used, has aviabale and the total amount of their space

## How it functions: 
Through the function "import datetime" we can use the commands it provides us to show our date and time in a simple manner.
1. We need to first name the date and time, I used time_now.
2. Then we make it a string in addition with the commands we gain with the import, I named it timedate_format and you can see the code as a guide to see what I put for the rest.
3. The last thing to do is print it; put what you want in " " and put what you named the string at the end for me it is timedate_format

## Instructions: 
First if you didn't you need to install node to run this lab (You should have already done this since it was needed for a previous lab, if you have it skip the installing steps)
if you haven't I have some instructions to help you download it on linux (Perfered) or powershell.

### Installing Node on Windows
Download the installer from https://nodejs.org/en/download/

Select LTS 64bit. (LTS is Long Term Support and is typically an even release)

To verify the installation

$ node --version

You also need to verify if npm is working

$ npm --version

### Installing Node on Linux (Perfered)
To install Node on Linux, we can use a provided RPM install. According to https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora, just run the following:

$ curl --silent --location https://rpm.nodesource.com/setup_14.x | sudo bash -
$ sudo yum -y install nodejs	

You also need to verfiy it by the same commands as above

$ node --version $ npm --version

### Using Node
You should be able to use Node now, next you just need to download the project file "project2.js", and go to a machine (I would use a linux machine) that you installed node on and move the file there so you can use the commands to run this project. And to get the result as shown above, in the command prompt go to the directory with the file in it and you would type node than the files name in the command prompt. So it would look something like this:

node project2.js

## Reference:

