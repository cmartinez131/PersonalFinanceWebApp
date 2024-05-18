const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    // Add other profile fields as needed
  },
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
