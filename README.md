![image](https://github.com/iridant/register_and_login/assets/10984744/64143a8d-9a33-4518-a05c-6fead378c106)

# register_and_login
A simple, in-planning registration and login panel that uses MongoDB and JWT.

![image](https://github.com/iridant/register_and_login/assets/10984744/456376ce-c2df-44c3-955f-c83de5ef0e18)

## TODO:
- ...
- Hook up the backend to the frontend
- "Finish"
- Dockerize project

## DONE:
- Create a monorepo with Nx that contains a React app.
- Add an Express.js app to the project
- Empty existing Nx React template
- Make frontend landing page somewhat easy on the eyes
- Create login and registration component's basic design
- Outline authentication endpoints within Express backend app
- Create model and schema for users
- Add functionality to middlewares
- Add functionality to endpoints: signIn, signOut, signUp
- Outline pages for access control testing at a later stage on frontend
- Add existing login session verification
- Create auth service on frontend
- Add access control to front-end
- Partially fix access-control vulnerability introduced in [commit 3e3d445](https://github.com/iridant/register_and_login/commit/3e3d44563b4d6964f39d42eba219f6448c0b8231), users can still modify localStorage role to "admin" and always will be able to do so.  I will sanity check the user's role as well within the backend. While the code will still be downloaded, a user will not be able to see pages/components they are not supposed to regardless of them being populated with data or not.  These changes may be reverted in the longrun in favor of lowering the amount of API calls made to the backend (1 call to API, and 1 database read per access of a "protected" route.
- Undo previous "vulnerability" fix. Fewer API calls and database reads are more favorable than disallowing the user from seeing pages by accident.
- Add dropdown on frontend navbar containing user profile, account, and signout buttons.

## Cloning and Running:

- Clone the repository to your local machine using git clone
- Download/switch to Node.js v18.16.0
- Go into the repository folder that was previously cloned and run the following commands

 ```
 npm install
 npx nx serve frontend
 ```
