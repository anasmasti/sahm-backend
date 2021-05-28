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
  },

  formation: {
    type: String,
  },
  abonnement_transport: {
    type_abonnement: {
      type: String,
    },
  },

  abonnement_mobile: {
    operator: {
      type: String,
    },
  },

  autre: {
    type: String,
  },
});

const Action = mongoose.model("Action", ActionSchema);
module.exports = Action;
