# set -e

DEPLOY_SERVERS=$DEPLOY_SERVERS

ALL_SERVERS=(${DEPLOY_SERVERS//,/ })
echo "ALL_SERVERS ${ALL_SERVERS}"

for server in "${ALL_SERVERS[@]}"
do
  echo "deploying to ${server}"
  ssh -o "StrictHostKeyChecking=no" ec2-user@${server} 'bash -s' < ./deploy/updateAndRestart.sh
done