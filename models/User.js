//requiring in mongoose
const {Schema, model}= require('mongoose');

//function to validate email
const validateEmail = function(email) {
  const regex= /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return regex.test(email);
}

//schema to create User model
const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please enter a valid email address']  
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//get total count of friends on retrieval
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

 //create the User model using the userSchema
const User = model('User', userSchema);

//export the User model
module.exports = User;