@echo off

if not "%setTask%" == "1" (
:: Need to set the path applicable to any machine
SchTasks /Create /TN getHardwareInfo /XML C:\Users\Konstantin\Desktop\Diploma\src\client\schTask\schTask.xml
setx setTask 1
)

if "%setTask%" == "1" (
SchTasks /run /TN getHardwareInfo
)
