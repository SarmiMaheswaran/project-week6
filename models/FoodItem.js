const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  nutritionalInformation: {
    calories: Number,
    macronutrients: {
      proteins: Number,
      fats: Number,
      carbohydrates: Number,
      saturatedFats: Number,
      unsaturatedFats: Number,
      transFats: Number,
      sugars: Number
    },
    micronutrients: {
      vitamins: {
        A: Number,
        C: Number,
        D: Number,
        // add more vitamins as needed
      },
      minerals: {
        iron: Number,
        calcium: Number,
        potassium: Number,
        // add more minerals as needed
      }
    },
    fiber: Number,
    sodium: Number,
    cholesterol: Number
  },
  servingSize: String,
  allergens: [String],
  ingredients: [String],
  preparationMethods: [String],
  certifications: [String],
  countryOfOrigin: String,
  brand: String,
  dietaryRestrictions: [String],
  healthBenefits: [String],
  bestPractices: [String]
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
