const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: Schema.ObjectId,
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: Date,
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: Date,
        username:{
            type: String,
            require: true
        },
        reaction:[reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

reactionSchema
.virtual('dateDisplay')
.get(function (){
    return `${this.createdAt}`
})
.set(function (date) {
    return date.toLocaleTimeString()
});

// 

thoughtSchema
.virtual('dateDisplay')
.get(function (){
    return `${this.createdAt}`
})
.set(function (date) {
    return date.toLocaleTimeString()
});

// 

thoughtSchema.virtual('reactionCount').get(function (){
    return this.reaction.length
})

// 

const Thought = model('thought', thoughtSchema);

model.exports = Thought;

