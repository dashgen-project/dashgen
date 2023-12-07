# DashGen

This is an ongoing academic project from São Carlos School of Engineering - University of São Paulo (EESC-USP) to help teachers easily deliver course materials. The website can be accessed by clicking <a href="https://dashgen.vercel.app">here</a>.

## How to run locally

### Prerequisites

- Having [Git](https://git-scm.com/downloads) installed
- Having [Node.js](https://nodejs.org/en) installed

### Setting up the database

DashGen uses a cloud NoSQL databse named [MongoDB Atlas](https://www.mongodb.com/atlas/database). It's document-oriented and JSON-encoded. Let's set it up:

1. Access [MongoDB Atlas website](MongoDB Atlas) and click the "Try Free" button.

2. You will be taken to the "Sign up" page. You can sign up by using your Google account or inserting you information in this page's form.

3. After signing up, you will be taking to a welcome page, asking some information about you. Just go through the questions, your answers will not affect the experience.

4. Then you will be taken to a page to deploy your database. Choose the "M0" cluster option, then pick your provider (I have always used aws), select your region and enter your cluster name ("DashGenCluster" for example). Finally, click the "Create" button. If you are not automatically taken to this page, access [https://cloud.mongodb.com/](https://cloud.mongodb.com/) and click the "+" (plus sign) next to "Database Deployments".

5. Now, MongoDB will ask you some security-related questions.  For the connection authentication, choose the "Username and Password" option. At this point, MongoDB have probably generated a username and password for you already. Copy these to a secure location and click the "Create User" button. When asked "Where would you like to connect from", choose the "My Local Environment" option and add your current IP address to the IP Access List (right under the "My Local Environment" option box). Finally, click the "Finish and Close" button.

6. You will be taken the the project overview page, where you will have a "Database Deployments" box with the "DashGenCluster" tab inside. In the "DashGenCluster" tab, click the "CONNECT" button, then select the "Drivers" option.

7. 

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

4. Create the necessary 

