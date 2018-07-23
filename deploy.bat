@echo off
rd G:\AllCodes\webstorm\elementUI\dist /s /q
md G:\AllCodes\webstorm\elementUI\dist
npm run build
