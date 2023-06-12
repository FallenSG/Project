# Project
To run the project go to file `server/.env` and add your email_id and password to allow email sending from your mail id to the user.

To run the project, setup mongodb server.
And follow steps:
 1.) Go to server folder and download npm modules <br /> <br/>
  `cd server` <br />
  `npm i` <br/> <br />
 2.) Follow same step in client folder <br/> <br/>
  `cd ../client` <br/>
  `npm i` <br/> <br/>
 3.)  Note: This step allows for running of both servers simultaneously but is not a needed step and you can run both seperately <br/> <br />
  `cd ../` <br/>
  `npm i` <br /> <br />
 4.)  Run the commands to start project <br/>
  `sudo mongod` <br /> <br />
  And execute this command if `Step 3` is followed `npm run dev`. <br /> 
  Else, open another two command prompt and run the following on first prompt <br/>
    `cd server` <br/>
    `npm run start` <br />
   and following on second <br/>
    `cd client` <br/>
    `npm run start`
  
