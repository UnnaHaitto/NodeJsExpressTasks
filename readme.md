# Authorisation rules

## Cats

- GET /api/v1/cats/ - Authenticated users can retrieve their own cats. Admins can retrieve all cats.
- GET /api/v1/cats/:id - Authenticated users can only retrieve their own cats. Admins can retrieve any cat.
- POST /api/v1/cats/ - Authenticated users can add cats to their own accounts.
- DELETE /api/v1/cats/:id - Only the owner of the cat can delete it. Admins can delete any cat.
- PUT /api/v1/cats/:id - Only the owner of the cat can change the cats data. Admins can change any cats data.

## Users

- GET /api/v1/users - Only admin can retrieve list of all the users.
- GET /api/v1/users/:id - Only authenticated users can retrieve their own information. Admins can retrieve any users info.
- DELETE /api/v1/users/:id - Only authenticated users can remove their own account. Admins can remove any account.
- PUT /api/v1/users/:id - Only authenticated users can make changes to their own user information. Admins can update any users information.
