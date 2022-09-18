const { Schema, model } = require('mongoose');

 const userSchema = new Schema(
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
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
         },
         thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
         friend: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    {
        toJSON:{
            virtuals: true
        }
    }
 )

 userSchema.virtual('friendCount').get(function () {
    return this.friend.length;
 });

 const User = model('user', userSchema);

 model.exports = User;