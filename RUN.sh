#!/bin/bash

# Paths
SERVER_PATH="/home/meirl/Documents/travel-time-mern/server"
CLIENT_PATH="/home/meirl/Documents/travel-time-mern/client"

# Commands
SERVER_CMD="npm run dev"
CLIENT_CMD="npm run dev"

# Check OS
OS_TYPE=$(uname)

if [[ "$OS_TYPE" == "Linux" ]]; then
    # Use Alacritty on Linux
    alacritty --working-directory "$SERVER_PATH" -e bash -c "$SERVER_CMD" &
    alacritty --working-directory "$CLIENT_PATH" -e bash -c "$CLIENT_CMD" &
elif [[ "$OS_TYPE" == "Darwin" ]]; then
    # Use macOS Terminal
    osascript -e "tell application \"Terminal\" 
        do script \"cd $SERVER_PATH && $SERVER_CMD\"
        do script \"cd $CLIENT_PATH && $CLIENT_CMD\"
    end tell"
else
    echo "Unsupported OS: $OS_TYPE"
    exit 1
fi

#!/bin/bash

# Paths
SERVER_PATH="/home/meirl/Documents/travel-time-mern/server"
CLIENT_PATH="/home/meirl/Documents/travel-time-mern/client"

# Commands
SERVER_CMD="npm run dev"
CLIENT_CMD="npm run dev"

# Check OS
OS_TYPE=$(uname)

if [[ "$OS_TYPE" == "Linux" ]]; then
    # Use Alacritty on Linux
    alacritty --working-directory "$SERVER_PATH" -e bash -c "$SERVER_CMD" &
    alacritty --working-directory "$CLIENT_PATH" -e bash -c "$CLIENT_CMD" &
elif [[ "$OS_TYPE" == "Darwin" ]]; then
    # Use macOS Terminal
    osascript -e "tell application \"Terminal\" 
        do script \"cd $SERVER_PATH && $SERVER_CMD\"
        do script \"cd $CLIENT_PATH && $CLIENT_CMD\"
    end tell"
else
    echo "Unsupported OS: $OS_TYPE"
    exit 1
fi
