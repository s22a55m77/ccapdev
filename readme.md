# Project 
Our application, toiletToPick, aims to solve this everyday problem by providing a user friendly interface that allows users to rate and comment on the available toilet facilities. It is developed using React and Nestjs.

# Deployment
- front = https://ccapdev.azurewebsites.net/
  - this deployment is in dev mode
- front = https://ccapdev-front.vercel.app/
  - this deployment is in prod mode (main)
- back = https://ccapdev-back.azurewebsites.net
  - this deployment is in prod mode
# Start Project
1. install nodejs and pnpm
    - `npm install -g pnpm`
        - run this command after installed the nodejs
2. install all dependencies
    - `pnpm i`
3. start frontend
    - `pnpm run front:dev` without mock
    - listening in port 5173
4. start backend
    - `pnpm run back:dev`
    - listening in port 3000
