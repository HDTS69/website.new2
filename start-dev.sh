#!/bin/bash

# Start your development server
npm run dev &

# Wait for the server to start
sleep 3

# Detect which port Next.js is using (it might use 3001, 3002, etc. if 3000 is busy)
PORT=$(lsof -i -P | grep LISTEN | grep node | grep -o "localhost:[0-9]*" | head -1 | cut -d':' -f2)

# If no port found, default to 3000
if [ -z "$PORT" ]; then
  PORT=3000
  echo "No active Next.js server detected, defaulting to port 3000"
else
  echo "Detected Next.js running on port $PORT"
fi

# Open Firefox Developer Edition with the detected port
"/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox" --new-window "http://localhost:$PORT" &

# Wait for Firefox to open
sleep 2

# Create a temporary AppleScript file
cat > /tmp/position_firefox.scpt << 'EOF'
tell application "Firefox Developer Edition"
  activate
  delay 1
  
  tell application "System Events"
    tell process "Firefox Developer Edition"
      set frontmost to true
      
      # Try to get screen information
      try
        set mainScreen to item 1 of (get screens)
        
        # Check if we have more than one screen
        if (count of (get screens)) > 1 then
          set secondScreen to item 2 of (get screens)
          set screenBounds to bounds of secondScreen
          
          # Extract coordinates
          set x1 to item 1 of screenBounds
          set y1 to item 2 of screenBounds
          set x2 to item 3 of screenBounds
          set y2 to item 4 of screenBounds
          
          # Set the window to fit the second screen with a small margin
          tell application "Firefox Developer Edition"
            set margin to 20
            set bounds of window 1 to {x1 + margin, y1 + margin, x2 - margin, y2 - margin}
          end tell
        else
          # If only one screen, maximize on the main screen
          tell application "Firefox Developer Edition"
            set bounds of window 1 to {0, 0, 1440, 900}
          end tell
        end if
      on error errMsg
        # Fallback if there's an error with the screens
        tell application "Firefox Developer Edition"
          set bounds of window 1 to {0, 0, 1440, 900}
        end tell
      end try
    end tell
  end tell
end tell
EOF

# Run the AppleScript
osascript /tmp/position_firefox.scpt

# Clean up
rm /tmp/position_firefox.scpt 