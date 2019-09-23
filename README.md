<p align="center">
  <img src="assets/images/logo.png" width="320" alt="Logo" />
</p>

## 1. Preparation

### 1.1 Clone code into local

```bash
$ git clone https://github.com/TMH-SE/ticket-sales-backend.git
```

#### 1.2 Create .env

```bash
# follow the file .env.example
SECRET_KEY=h3l1oW0rld
PORT=<your_port_run_backend>
NODE_ENV=development
```

### 1.3 Creat awsConfig.json

```bash
# follow the file .aws.json.example
{
"accessKeyId": <YOUR_ACCESS_KEY_ID>,
"secretAccessKey": <YOUR_SECRET_ACCESS_KEY>,
"sessionToken": <YOUR_SESSION_TOKEN>,
"region": "us-east-1"
}
```

### 1.4 Install dependencies

```bash
# using npm
$ npm i

# using yarn
$ yarn add
```

### 1.5 Run dbseed

```bash
# create table and account admin
$ npm run db:seed
```

## 2. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# Running the app with webpack
  # 1. Build webpack
  $ npm run webpack
  # 2. Once webpack started to watch files, run another command in the another command line window:
  $ npm run start:webpack
```

## 3. Git policy

### 3.1 Branch

```bash
  # create branch
  # naming branch follow the pattern: yourName_yourTask
  # e.g: hieu_khachHang
  $ git branch <your_branch>

  # check out your branch before perform your task
  $ git checkout <your_branch>
```

### 3.2 Commit code

```bash
  # save your changes
  $ git add .

  # commit code
  # your comment must be concise and describe your what you did
  $ git commit -m 'your comment'
```

### 3.3 Pull code

```bash
  # always pull code before whenever start coding or push code to repository
  $ git pull origin master
```

### 3.4 Push code

```bash
  # push code from local to repository
  $ git push origin <your_branch>
```

\*_*NOTE:*_ Before push code, you must pull code and fix conflict

## 4. License

Project is [MIT licensed](LICENSE).
