#!/bin/bash

BASE_URL="http://localhost:8080/api/comments"

# Colors
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m" # No Color

print_result() {
    if [ "$?" -eq 0 ]; then
        echo -e "${GREEN}Test Passed${NC}"
    else
        echo -e "${RED}Test Failed${NC}"
    fi
}

echo "Testing Comments Endpoints..."
echo "-----------------------------------"

# 1. Create a Comment
echo "1. Creating a Comment:"
curl -X POST "$BASE_URL" \
-H "Content-Type: application/json" \
-d '{"author_id": "64bf3b6e2f8b3c1b4c9e8a3d", "post_id": "64bf3c4e2f8b3c1b4c9e8a4d", "content": "This is a test comment"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 2. Fetch Comments by Post ID
echo "2. Fetching Comments for a Post:"
curl -X GET "$BASE_URL/64bf3c4e2f8b3c1b4c9e8a4d" \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 3. Update a Comment
echo "3. Updating a Comment:"
curl -X PUT "$BASE_URL" \
-H "Content-Type: application/json" \
-d '{"comment_id": "64bf3e5f2f8b3c1b4c9e8a5d", "author_id": "64bf3b6e2f8b3c1b4c9e8a3d", "content": "Updated comment content"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 4. Delete a Comment
echo "4. Deleting a Comment:"
curl -X DELETE "$BASE_URL" \
-H "Content-Type: application/json" \
-d '{"comment_id": "64bf3e5f2f8b3c1b4c9e8a5d", "author_id": "64bf3b6e2f8b3c1b4c9e8a3d"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

echo "-----------------------------------"
echo "Comments Tests Complete."
