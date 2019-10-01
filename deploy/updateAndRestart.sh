# set -e

# rm -rf ticket-sales-back/

# git clone https://minhhieutran11197:Hieu1234@gitlab.com/minhhieutran11197/ticket-sales-back.git

# . ~/.nvm/nvm.sh

# pm2 status

cd ticket-backend

# echo "--------------Running npm install----------------"
# npm install

# echo "--------------Generating graphql-----------------"
# npm run generate

# echo "--------------Database seeding-------------------"
# npm run db:seed

# echo "--------------Building---------------------"
# npm run build

echo "--------------Start app--------------------"
pm2 start --no-autorestart --name TICKET_BACKEND npm -- run start:prod