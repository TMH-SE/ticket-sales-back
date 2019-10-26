pm2 delete TICKET_BACKEND

pm2 status

cd ticket-sales-back

rm -rf node_modules/

npm i

echo "--------------Start app--------------------"
pm2 start --name TICKET_BACKEND npm -- run start:prod