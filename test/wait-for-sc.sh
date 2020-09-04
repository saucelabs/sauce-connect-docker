until [ -f /tmp/sc.ready ]
do
     sleep 5
done
echo "SC ready"
exit