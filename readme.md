# Authorisation rules

## Cats

- GET /api/v1/cats/:id - Only authenticated users can retrieve their own cats.
- DELETE /api/v1/cats/:id - Only the owner of the cat can delete it.
- PUT /api/v1/cats/:id - Only the owner of the cat can change the cats data.
- GET /api/v1/cats/user/:userId - Only the owner of the cat can retrieve their own cats using their user_id.

## Users

- GET /api/v1/users/:id - Only authenticated users can retrieve their own information.
- DELETE /api/v1/users/:id - Only authenticated users can remove their own account.
- PUT /api/v1/users/:id - Only authenticated users can make changes to their own user information.
