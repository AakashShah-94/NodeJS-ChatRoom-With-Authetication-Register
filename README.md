Chat Room NodeJS
A website and chat room system Node.js.

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
use drywall; //your mongo db name
db.users.save({ username: 'root', isActive: 'yes', email: 'your@email.addy', roles: {admin: rootAdmin._id} });

Features

Login system with forgot password and reset password.
Signup and Login with Facebook, Twitter, GitHub, Google and Tumblr.

Enjoy.

License

MIT
