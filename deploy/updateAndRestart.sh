pm2 delete TICKET_BACKEND

pm2 status

cd ticket-sales-back

npm rebuild bcrypt --update-binary

echo "--------------Start app--------------------"
pm2 start --name TICKET_BACKEND npm -- run start:prod