
#!/bin/bash

while true; do
    # Extract free and used RAM values in GiB
    ram=$(free -m | awk 'NR==2{printf "%.2f-%.2f", $4/1024, $3/1024}')

    # Extract CPU usage percentage with 2 decimals
    cpu=$(top -bn1 | grep load | awk '{printf "%.2f", $(NF-2)}')

    # Get host IP address
    host=$(hostname -I)

    # Send data as JSON payload
    curl -X POST -H "Content-Type: application/json" \
    -d "{\"host\": \"${host}\",
          \"used_ram\": ${ram#*-},
          \"free_ram\": ${ram%-*},
           \"cpu\": ${cpu}}" \
    https://conectclub.bubbleapps.io/version-test/api/1.1/wf/monitoring-vps

    # Append payload to CSV file
    # echo "{\"host\": \"${host}\",
        #  \"used_ram\": ${ram#*-},
        ##  \"cpu\": ${cpu}}" >> monitor-stats.csv

    # Wait for x seconds
    sleep 600
done


