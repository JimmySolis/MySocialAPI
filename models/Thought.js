const { Schema, model, mongoose } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
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
        createdAt: {
            type: Date,
          default: Date.now
        }
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
        createdAt: {
            type: Date,
          default: Date.now
        },
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
    const newDate = date.toLocaleTimeString();
    this.set({newDate});
});


thoughtSchema
.virtual('dateDisplay')
.get(function (){
    return `${this.createdAt}`
})
.set(function (v) {
    const newDate = v.toLocaleTimeString();
    this.set({newDate});
});


thoughtSchema.virtual('reactionCount').get(function (){
    return this.reaction.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

