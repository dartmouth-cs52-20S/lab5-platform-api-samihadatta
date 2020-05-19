import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
    res.send({ token: tokenForUser(req.user) });
};

// eslint-disable-next-line consistent-return
export const signup = (req, res, next) => {
    const { email } = req.body;
    const { password } = req.body;
    const { username } = req.body;
    console.log('email');
    console.log(email);
    console.log('password');
    console.log(password);
    console.log('username');
    console.log(username);

    if (!email || !password || !username) {
        return res.status(422).send('You must provide email, password, and username');
    }

    // 🚀 TODO:
    // here you should do a mongo query to find if a user already exists with this email.
    // if user exists then return an error. If not, use the User model to create a new user.
    // Save the new User object
    // this is similar to how you created a Post
    // and then return a token same as you did in in signin
    User.findOne({ email })
        .then((result) => {
            if (result) {
                console.log('sign up find result');
                console.log(result);
                res.status(302).send({ error: 'user already exists' });
            }
            const user = new User();
            user.email = email;
            user.password = password;
            user.username = username;
            user.save()
                .then((response) => {
                    res.json({ token: tokenForUser(response) });
                })
                .catch((error) => {
                    console.log('error in signup');
                    console.log(error);
                    res.status(511).send(error);
                });
        })
        .catch(

        );
};

// encodes a new token for a user object
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}
