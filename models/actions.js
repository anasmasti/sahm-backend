const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  vetement: {
    size: {
      type: String,
    },
    type: {
      type: String,
    },
    gender: {
      type: String,
    },
    selected: {
      type: String,
    }
  },

  formation: {
    type: {
      type: String,
    },
    selected: {
      type: String,
    }
  },
  abonnement_transport: {
    type_abonnement: {
      type: String,
    }, 
     selected: {
      type: String,
    }
  },

  abonnement_mobile: {
    operator: {
      type: String,
    },
    selected: {
      type: String,
    }
  },
  medicamment:{
    nom_medicament:String
  },

  autre: {
    text: String,
    selected: String
  },

  details: String,

  statut: String,

  etat :{
    type: String,
  } ,
  date_action: Date,
  giver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
    default: null
},
  benificier: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
    default: null
  }

});

const Action = mongoose.model("Action", ActionSchema);
module.exports = Action;
