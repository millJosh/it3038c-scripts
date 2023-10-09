##Reference:
https://stackoverflow.com/questions/6786990/find-out-time-it-took-for-a-python-script-to-complete-execution
This talked about the import of data time but didn't really do much

##I mostly went of this from the website:
from datetime import datetime
startTime = datetime.now()
do something
Python 2: 
print datetime.now() - startTime 
Python 3: 
print(datetime.now() - startTime)

##How it functions:
Through the functions we get through the "import datetime" we can use the commands it provides us to show our date and time in a simple manner. 
1. We fist name the date and time I used time_now. 
2. Then we make it a string in addition with the commands we gain with the import, I named it timedate_format. 
3. The last thing to do is print it; put what you want in " " and put what you named the string at the end for me it is timedate_format

##Instructions:
You would first download this file, go to a machine that has python install so you can use the commands it has available. 
And to get the desired result you would type python than the files name in the command prompt. 
So it would look something like this: python time_and_date_currently.py

##This is the expected output:
('Date and Time Currently', 'Date: 10-09-2023 | Time: 06:21:54 PM')
