const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avator:{ type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref:'Category'}],
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills:[{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
  }],
  goods1:[{ type: mongoose.SchemaTypes.ObjectId, ref:'Goods'}],
  goods2:[{ type: mongoose.SchemaTypes.ObjectId, ref:'Goods'}],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  patners: [{ 
    hero: { type: mongoose.SchemaTypes.ObjectId, ref:'Hero'},
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema)