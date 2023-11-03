# Deployment
- front = https://ccapdev.azurewebsites.net/
  - this deployment is in dev mode
- front = https://ccapdev-front.vercel.app/
  - this deployment is in prod mode
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
    - `pnpm run front:dev:mock` with mock
4. start backend
    - `pnpm run back:dev`
