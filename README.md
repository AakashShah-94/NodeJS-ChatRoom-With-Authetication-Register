Chat Room NodeJS is web chatroom system with Node.js.

Technology

On The Server	On The Client	Development
Express	
Bootstrap
Jade
Mongoose	
jQuery	
cookie-parser
csurf
body-parser
bcrypt

Requirements
You need Node.js and MongoDB installed and running.
We use bcrypt for hashing secrets. If you have issues during installation related to bcrypt then refer to this wiki page.

You need a few records in the database to start using the user system.

Run these commands on mongo.
use chatrooms; //your mongo db name
db.Users.save({ firstname: 'admin', lastname: 'admin', email: 'your@email.com', password: '');

Features
-Login system with forgot password and reset password.
-Chat room working
-New Html style for the auth.jade, register.jade, room.jade, index.js

Enjoy.

License

MIT
