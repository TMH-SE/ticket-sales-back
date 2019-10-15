pm2 status

cd ticket-sales-back

echo "--------------Start app--------------------"
pm2 start --name TICKET_BACKEND npm -- run start:prod