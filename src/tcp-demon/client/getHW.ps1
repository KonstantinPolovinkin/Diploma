Get-ComputerInfo > ./hwinfo.txt
Get-WmiObject win32_VideoController >> ./hwinfo.txt
Get-CimInstance -Class Win32_OperatingSystem | Format-List Total*Memory*, Free* >> ./hwinfo.txt

####
# $Monitors = Get-WmiObject WmiMonitorID -Namespace root\wmi
# $Monitors | Format-List * 
###

###
# function Decode {
#     If ($args[0] -is [System.Array]) {
#         [System.Text.Encoding]::ASCII.GetString($args[0])
#     }
#     Else {
#         "Not Found"
#     }
# }

# ForEach ($Monitor in Get-WmiObject WmiMonitorID -Namespace root\wmi) {  
#     $Manufacturer = Decode $Monitor.ManufacturerName -notmatch 0
#     $Name = Decode $Monitor.UserFriendlyName -notmatch 0
#     $Serial = Decode $Monitor.SerialNumberID -notmatch 0
#     $ManufactureWeek = (Get-WmiObject WmiMonitorID -Namespace root\wmi).WeekofManufacture
#     $ManufactureYear = (Get-WmiObject WmiMonitorID -Namespace root\wmi).YearOfManufacture
	
#     echo "Manufacturer: $Manufacturer`nName: $Name`nSerial Number: $Serial"
#     echo "Week of Manufacture: $ManufactureWeek"
#     echo "Year of Manufacture: $ManufactureYear"
# }
###