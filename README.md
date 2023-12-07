# DashGen

This is an ongoing academic project from São Carlos School of Engineering - University of São Paulo (EESC-USP) to help teachers easily deliver course materials. The website can be accessed by clicking <a href="https://dashgen.vercel.app">here</a>. The application is hosted with [Vercel](https://vercel.com/).

## Repository content

These are the main folders and files contained by this repository:

- **index.js** is the entry point of the application, i.e., where everything starts. Application settings, database connection and server listening is handled in this file.
- **schemas.js** contains schemas for all database objects, in order to validate requests bodies (these validations happen in **middleware.js**)
- **middleware.js** contains middleware functions to
  - check if a user is logged in
  - check if a user is the author of a dashboard
  - validate requests to create and edit dashboards
  - validate requests to perform login and registration
  - validate requests to send password recovery e-mail
  - validate requests to change password
- **package.json** contains information about the npm packages necessary for running this application
- **vercel.json** contains configurations for hosting the application with Vercel
- **.gitignore** contains files and names to be ignored by Git
- **models/** contains the database models for each collection
- **seeds/** contains code for seeding the database (not necessary and not sure if it's still working)
- **utils/** contains multiple JavaScript utilies used accross the application
- **views/** contains the views of the application as EJS files
- **routes/** contains the routes of the application, i.e., it's where the HTTP requests are handled
- **controllers/** contains the functions called for each route of the application (these functions are called in the files of the folder **routes/**, but they are defined in the files of this folder)
- **public/** contains additional JavaScript, CSS and images that can be accessed from the application views, including the Bootstrap JavaScript and CSS files

## How to run locally

### Prerequisites

- Having [Git](https://git-scm.com/downloads) installed
- Having [Node.js](https://nodejs.org/en) installed

### Setting up a new database instance

This is only needed if you want to use your own database instance. If you want to use the database instance currently being used by the production version of DashGen, get in touch with me to get the necessary information to connect to the database. DashGen uses a cloud NoSQL databse named [MongoDB Atlas](https://www.mongodb.com/atlas/database). It's document-oriented and JSON-encoded. Let's set it up:

1. Access [MongoDB Atlas website](https://www.mongodb.com/atlas/database and click the "Try Free" button.

2. You will be taken to the "Sign up" page. You can sign up by using your Google account or inserting you information in this page's form.

3. After signing up, you will be taking to a welcome page, asking some information about you. Just go through the questions, your answers will not affect the experience.

4. Then you will be taken to a page to deploy your database. Choose the "M0" cluster option, then pick your provider (I have always used aws), select your region and enter your cluster name ("DashGenCluster" for example). Finally, click the "Create" button. If you are not automatically taken to this page, access [https://cloud.mongodb.com/](https://cloud.mongodb.com/) and click the "+" (plus sign) next to "Database Deployments".

5. Now, MongoDB will ask you some security-related questions.  For the connection authentication, choose the "Username and Password" option. At this point, MongoDB have probably generated a username and password for you already. Copy these to a secure location and click the "Create User" button. When asked "Where would you like to connect from", choose the "My Local Environment" option and add your current IP address to the IP Access List (right under the "My Local Environment" option box). Finally, click the "Finish and Close" button.

6. You will be taken the the project overview page, where you will have a "Database Deployments" box with the "DashGenCluster" tab inside. In the "DashGenCluster" tab, click the "CONNECT" button, then select the "Drivers" option.

7. Install MongoDB driver globally:

```
npm instll -g mongodb
```

8. Copy the connection string to somewhere safe. The connection string should look like this: `mongodb+srv://<username>:<password>@dashgencluster.zp8prd7.mongodb.net/?retryWrites=true&w=majority`. Replace `<username>` and `<password>` by the credentials you copied in step 5.

Your cloud database should be set up by now.

### Setting up the local environment

The commands in the following steps should be executed in a shell environment. If you are using Windows, search for the "git bash" program after installing git. If you are using some Linux distro, just open the terminal (`Ctrl`+`Alt`+`T` for Ubuntu). In Linux distros, you may need to include `sudo` before some of the commands.

1. Clone this repository and enter the created folder:

```
git clone https://github.com/hsanderr/dashgen.git
cd dashgen
```

2. Install the dependencies:

```
npm install --save
```

3. Create a file named ".env", which will contain some secret information:

```
touch .env
```

4. Add the following lines to the ".env" file:

```
EMAIL_PWD=<emailPwd>
PORT=3000
YOUTUBE_API_KEY=<youtubeApiKey>
SECRET=<secret>
DB_URL=<connectionString>
```

`EMAIL_PWD` is the password of the e-mail being used to send the password recovery codes to the users. Currently, we are using a Zoho e-mail with a Hostinger domain. `PORT` is the port which the server will be listening to when running locally. `YOUTUBE_API_KEY` is the YouTube Data API key, to use yours check [YouTube Data API Overview](https://developers.google.com/youtube/v3/getting-started) and [Obtaining authorization credentials](https://developers.google.com/youtube/registering_an_application) for more information. `SECRET` is the MongoDB session storage to encrypt session id according to OWASP recommendations (sincerely,I didn't quite understand what this is used for, but I think that you can set it to whatever you want). `DB_URL` is the connection string of the cloud database. You will have to replace `<emailPwd>`, `<youtubeApiKey>`, `<secret>` and `<connectionString>` for valid values, which you may get in the file "secret" of [this Google Drive folder](https://drive.google.com/drive/folders/1SGLZjO1zWzIceZX4-Miwwy9wMEcb2ZSi?usp=drive_link) (you will have to get in touch with me to get access to this folder). If you are using your own database instance, you can replace `<connectionString>` with your connection string. You can also create and use your own YouTube Data API key and *probably* use any value for `SECRET`, but I highly recommend that you get the value for `EMAIL_PWD` with me, because it's not that simple to create and set up an e-mail for this application.

By now, everything should ready for you to run the application:

```
node index.js
```

If everything goes well, DashGen should be running locally on your computer and you can access DashGen with any browser using the following link: **http://localhost:3000/**.

## Accounts management

Official DashGen accounts have been created for the necessary tools to this application: Google, Vercel, MongoDB, Zoho and Hostinger. Get in touch with me for more information.

Copyright 2021-2023 &copy; Henrique Sander Lourenço (henriquesander27@gmail.com)
