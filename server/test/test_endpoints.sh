#!/bin/bash

# Base URL
BASE_URL="http://localhost:8080/api"

# Colors for output
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # No Color

# Function to print test results
print_result() {
    if [ "$?" -eq 0 ]; then
        echo -e "${GREEN}Test Passed${NC}"
    else
        echo -e "${RED}Test Failed${NC}"
    fi
}

echo "Testing /signup endpoint..."
echo "-----------------------------------"

# 1. Successful Signup
echo "1. Valid Signup:"
curl -X POST "$BASE_URL/auth/signup" \
-H "Content-Type: application/json" \
-d '{"username": "exampleuser", "email": "example@example.com", "password": "securepassword123"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 2. Signup Missing Fields
echo "2. Signup with Missing Fields:"
curl -X POST "$BASE_URL/auth/signup" \
-H "Content-Type: application/json" \
-d '{"username": "exampleuser"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 3. Signup Duplicate Username
echo "3. Duplicate Username:"
curl -X POST "$BASE_URL/auth/signup" \
-H "Content-Type: application/json" \
-d '{"username": "exampleuser", "email": "another@example.com", "password": "password"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

echo "-----------------------------------"
echo "Testing /login endpoint..."
echo "-----------------------------------"

# 4. Successful Login
echo "4. Valid Login:"
curl -X POST "$BASE_URL/auth/login" \
-H "Content-Type: application/json" \
-d '{"email": "example@example.com", "password": "securepassword123"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 5. Login Missing Fields
echo "5. Login with Missing Fields:"
curl -X POST "$BASE_URL/auth/login" \
-H "Content-Type: application/json" \
-d '{"email": "example@example.com"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 6. Login Wrong Password
echo "6. Wrong Password:"
curl -X POST "$BASE_URL/api/login" \
-H "Content-Type: application/json" \
-d '{"email": "example@example.com", "password": "wrongpassword"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

echo "-----------------------------------"
echo "Tests Complete."
