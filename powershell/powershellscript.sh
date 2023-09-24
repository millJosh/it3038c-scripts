Send-MailMessage -To "mill3ju@mail.uc.edu" -From "dark.law.68@gmail.com" -Subject "IT3038C Windows SysInfo" -Body $BODY -SmtpServer smtp.gmail.com -port 587 -UseSSL -Credential (Get-Credential)

