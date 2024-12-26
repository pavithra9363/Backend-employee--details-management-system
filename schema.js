const mongoose=require('mongoose');
const employeeSchema = {
    empid: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      format: 'email',
      required: true
    },

    position: {
      type: 'string',
      required: true
    },

    salary: {
      type: 'number',
      required: true
    },

    photo: {
      type: String, 
      required:true 
    }
  };

const model = mongoose.model('model', employeeSchema);


module.exports =model;

