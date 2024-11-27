# RBAC Management Project

## Overview

This project is a Role-Based Access Control (RBAC) management system built with **React** for the frontend, **Express** for the backend, and **MongoDB Atlas** as the database. It allows the management of users and roles with features to add, edit, delete, and view both users and roles. Multiple roles can be assigned to a single user, with each role containing a name and a set of permissions.

## Project Description

For developing the UI, I have used **ShadCDN Component** Library along with **Typescript** and **TailwindCSS**. The Project also uses **React Context API** for managing the user and role state. For data fetching, I have used **Tanstack React Query** with **Axios**

1. **/** : Which is the launch page and it shows a table of all the users. The RBAC Manager can directly add, edit or remove a user from the table itself.

2. **/role-management** -: It is the page which shows a table of all the roles and like the users table, a role can be directly added, edited or removed a user from the table itself.

For this project I have created both the server (ExpressJs) and client in React
The React App is hosted on Netlify at the following URL :

[RBAC Management Dashboard](https://rbac-management.netlify.app)
[Github Repository ](https://github.com/rahul-mahato-025/VRV-Assignment-Client)

The Express App is hosted on Render for the time being. If you want to test the API you can use the following URL -

[RBAC Management Server URL](https://vrv-assignment-wl88.onrender.com/)
[Github Repository ](https://github.com/rahul-mahato-025/VRV-Assignment)

## API Documentation

1.**Roles API**

- POST /api/v1/roles - Creates a new role with a roleName and permission array.

- GET /api/v1/roles - Fetches a list of all the available roles.

- GET /api/v1/roles/roleId - Fetches the role with the roleId provided in the request param.

- PATCH /api/v1/roles/roleId - Updates the role with the roleId provided in the request param and new role body.

- DELETE /api/v1/roles/roleId - Deletes the role with the roleId provided in the request param.

- 1.**Users API**
- POST /api/v1/users - Creates a new role with a firstName, lastName(optional), email, status and roles array.

- GET /api/v1/users - Fetches a list of all the available users in the database.

- GET /api/v1/users /userId - Fetches the user with the userId provided in the request param.

- PATCH /api/v1/users /userId - Updates the user with the userId provided in the request param and new user body.

- DELETE /api/v1/users /userId - Deletes the user with the userId provided in the request param.

## Features

1. **User Management**

   - List all users.
   - Add a new user.
   - Edit existing user details.
   - Delete a user.
   - Assign multiple roles to a user.

2. **Role Management**

   - List all roles.
   - Add a new role.
   - Edit role details (role name and permissions).
   - Delete a role.

3. **Dark Mode**
