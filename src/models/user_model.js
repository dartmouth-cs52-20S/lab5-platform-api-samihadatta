import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

mongoose.set('useFindAndModify', false);

// create a UserSchema with a title field
const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    username: { type: String },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true,
});

UserSchema.pre('save', function beforeUserSave(next) {
    // this is a reference to our model
    // the function runs in some other context so DO NOT bind it
    const user = this;

    // TODO: do stuff here

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Generate a salt as they do in the docs and then hash user.password with the salt. Tip: in the docs the first argument to hash is the password, in our case you have it in a variable user.password - in case that was confusing documentation.
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    // overwrite plain text password with encrypted password
    user.password = hash;
    return next();

    // when done run the **next** callback with no arguments
    // call next with an error if you encounter one
    // return next();
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (error, matched) => {
        if (error) {
            return callback(error); // or callback(error) in the error case
        } else {
            return callback(null, matched); // return callback(null, comparisonResult) for success
        }
    });
};

// create UserModel class from schema
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
