/**
* Chat.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    schema: true,

  attributes: {
      message  : { type: 'string', unique: false },
      localName  : { type: 'string', unique: false },
      room:{
          model: 'room'
      },
      user:{
          model: 'user'
      }
  }
};

