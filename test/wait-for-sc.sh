until [ -f /tmp/sc.ready ]
do
     sleep 1
done
echo "SC ready"
exit
