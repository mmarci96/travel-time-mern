
#!/bin/bash

# Paths
SERVER_PATH="./server"
CLIENT_PATH="./client"

# Commands
SERVER_CMD="npm run dev"
CLIENT_CMD="npm run dev"

# Check OS
OS_TYPE=$(uname)

if [[ "$OS_TYPE" == "Linux" ]]; then
    # Try using the default terminal emulator
    if command -v x-terminal-emulator &> /dev/null; then
        x-terminal-emulator -e bash -c "cd $SERVER_PATH && $SERVER_CMD" &
        x-terminal-emulator -e bash -c "cd $CLIENT_PATH && $CLIENT_CMD" &
    elif command -v gnome-terminal &> /dev/null; then
        gnome-terminal -- bash -c "cd $SERVER_PATH && $SERVER_CMD" &
        gnome-terminal -- bash -c "cd $CLIENT_PATH && $CLIENT_CMD" &
    elif command -v konsole &> /dev/null; then
        konsole --workdir "$SERVER_PATH" -e bash -c "$SERVER_CMD" &
        konsole --workdir "$CLIENT_PATH" -e bash -c "$CLIENT_CMD" &
    else
        echo "No supported terminal emulator found. Please install one (e.g., x-terminal-emulator, gnome-terminal, or konsole)."
        exit 1
    fi
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
