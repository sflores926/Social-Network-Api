const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
// const moment= require('moment');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      //changed it to a string to get date formattee will not with newDate() if type is a Date
      type: String,
      default: new Date(),
      //Use a getter method to format the timestamp on query not wokring 
      // get: moment(startingDate).format('YYYY-MM-DD HH:mm:ss')
      
    },

    username: {
      type: String,
      required: true
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Video model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
