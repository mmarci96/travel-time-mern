#!/bin/bash

BASE_URL="http://localhost:8080/api/posts"

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

echo "Testing Post Endpoints..."
echo "-----------------------------------"

# 1. Create a Post
echo "1. Creating a Post:"
curl -X POST "$BASE_URL" \
-H "Content-Type: application/json" \
-d '{"author_id": "64bf3b6e2f8b3c1b4c9e8a3d", "postDto": {"image_url": "http://example.com/image.jpg", "title": "Test Post", "description": "This is a test post", "location": "NYC"}}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 2. Get All Posts
echo "2. Fetching All Posts:"
curl -X GET "$BASE_URL/all" \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 3. Get Post by ID
echo "3. Fetching Post by ID:"
curl -X GET "$BASE_URL/64bf3c4e2f8b3c1b4c9e8a4d" \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 4. Update a Post
echo "4. Updating a Post:"
curl -X PUT "$BASE_URL/64bf3c4e2f8b3c1b4c9e8a4d" \
-H "Content-Type: application/json" \
-d '{"author_id": "64bf3b6e2f8b3c1b4c9e8a3d", "updateData": {"title": "Updated Post Title"}}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

# 5. Delete a Post
echo "5. Deleting a Post:"
curl -X DELETE "$BASE_URL/64bf3c4e2f8b3c1b4c9e8a4d" \
-H "Content-Type: application/json" \
-d '{"author_id": "64bf3b6e2f8b3c1b4c9e8a3d"}' \
-w "\nHTTP Status: %{http_code}\n" -o /dev/null
print_result

echo "-----------------------------------"
echo "Post Tests Complete."
