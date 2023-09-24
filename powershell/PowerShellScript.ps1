#Email: dark.law.68@gmail.com
#Password: wpqq pyxh rxor awtg

$IPAddress = $IPAddress = (get-netipaddress).ipv4address | Select-String "192*"

$CurrentUser = $env:USERNAME

$HostName = $env:COMPUTERNAME

$PowerShellVersion = $PSVersionTable.PSVersion.Major.ToString()

$CurrentDate = Get-Date -Format "dddd, MMMM dd, yyyy"

$Body = "This machine's IP is $IPAddress. User is $CurrentUser. Hostname is $HostName. PowerShell Version $PowerShellVersion. Today's Date is $CurrentDate."

$Body

Send-MailMessage -To "mill3ju@mail.uc.edu" -From "dark.law.68@gmail.com" -Subject "IT3038C Windows SysInfo" -Body $BODY -SmtpServer smtp.gmail.com -port 587 -UseSSL -Credential (Get-Credential)