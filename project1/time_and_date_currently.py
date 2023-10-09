import datetime

time_now = datetime.datetime.now()

timedate_format = time_now.strftime("Date: %m-%d-%Y | Time: %I:%M:%S %p")

print("Date and Time Currently", timedate_format)

