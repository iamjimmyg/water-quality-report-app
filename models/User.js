const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  reports: [{
    additionalHealthInformation: String,
    contaminantInformation: String,
    howToReachOut: String,
    sourceWaterAssessment: String,
    qualityTable: [{
      inorganicContaminants: [{
        barium: [{
          datesOfSampling: String,
          mclViolation: Boolean,
          levelDetected: Number,
          rangeOfResults: String,
          mclg: String,
          mcl: String,
          likelySourceOfContamination: String
        }],
        flouride: [{
          datesOfSampling: String,
          mclViolation: Boolean,
          levelDetected: Number,
          rangeOfResults: String,
          mclg: String,
          mcl: String,
          likelySourceOfContamination: String
        }],
        nitrate: [{
          datesOfSampling: String,
          mclViolation: Boolean,
          levelDetected: Number,
          rangeOfResults: String,
          mclg: String,
          mcl: String,
          likelySourceOfContamination: String
        }],
        sodium: [{
          datesOfSampling: String,
          mclViolation: Boolean,
          levelDetected: Number,
          rangeOfResults: String,
          mclg: String,
          mcl: String,
          likelySourceOfContamination: String
        }],
      }],
      disinfectantsAndDisinfectionByProducts: [{
        chlorineAndChloramines: [{
          datesOfSampling: String,
          mclOrMrdlViolation: Boolean,
          levelDetected: Number,
          rangeOfResults: String,
          mclgOrMrdlg: String,
          mclOrMrdl: String,
          likelySourceOfContamination: String
        }],
        haloaceticAcids: [{
          chlorineAndChloramines: [{
            datesOfSampling: String,
            mclOrMrdlViolation: Boolean,
            levelDetected: Number,
            rangeOfResults: String,
            mclgOrMrdlg: String,
            mclOrMrdl: String,
            likelySourceOfContamination: String
          }],
        tthm: [{
          chlorineAndChloramines: [{
            datesOfSampling: String,
            mclOrMrdlViolation: Boolean,
            levelDetected: Number,
            rangeOfResults: String,
            mclgOrMrdlg: String,
            mclOrMrdl: String,
            likelySourceOfContamination: String
          }],
        }]
      }]
    }],
      leadAndCopper: [{
        copper: [{
          datesOfSampling: String,
          alExceeded: Boolean,
          ninetiethPercentileResult: Number,
          exceedingTheAl: Number,
          mclg: Number,
          al: Number,
          likelySourceOfContamination: String
        }],
        lead: [{
          datesOfSampling: String,
          alExceeded: Boolean,
          ninetiethPercentileResult: Number,
          exceedingTheAl: Number,
          mclg: Number,
          al: Number,
          likelySourceOfContamination: String
        }]
      }]
    }]
  }]
});

module.exports = User = mongoose.model("users", UserSchema);
