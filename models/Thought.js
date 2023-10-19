//requring mongoose
const mongoose = require('mongoose');

//creating a reaction schema. This will only have a schema not a model.  It will be nested in the thought schema
const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format timestamp on query
            get: (date) => date.toLocaleDateString("en-US")
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

//creating a thought schema
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format timestamp on query
            get: (date) => date.toLocaleDateString("en-US")
        },
        username: {
            type: String,
            required: true
        },
        // use ReactionSchema to validate data for a reaction
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//creating the thought model using the thought schema
const Thought = mongoose.model('Thought', thoughtSchema);

//exporting the thought model
module.exports = Thought;



