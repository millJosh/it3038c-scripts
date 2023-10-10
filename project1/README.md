# Example of expected output: 
('Date and Time Currently', 'Date: 10-09-2023 | Time: 06:21:54 PM')

It shows the date and time currently where someone is when they run this command

## How it functions: 
Through the function "import datetime" we can use the commands it provides us to show our date and time in a simple manner.
1. We need to first name the date and time, I used time_now.
2. Then we make it a string in addition with the commands we gain with the import, I named it timedate_format and you can see the code as a guide to see what I put for the rest.
3. The last thing to do is print it; put what you want in " " and put what you named the string at the end for me it is timedate_format

## Instructions: 
You would first download the project file, and go to a machine (perferably a linux machine) that has python install so you can use the commands to run this project. 
And to get the result as shown, you would type python than the files name in the command prompt. 
So it would look something like this: 

python time_and_date_currently.py

## Reference:
https://stackoverflow.com/questions/6786990/find-out-time-it-took-for-a-python-script-to-complete-execution 

This talked about the import of data time but it didn't really do much in terms of how I wanted it too look

I went off this from the website: 
- from datetime import datetime startTime = datetime.now() 
- do something 
- Python 2: print datetime.now() - startTime 
- Python 3: print(datetime.now() - startTime)
