#!/bin/bash
cd /home/server/htdocs/server.xarme.org
git pull origin main
/home/server/.nvm/versions/node/v22.9.0/bin/pm2 restart xarme
