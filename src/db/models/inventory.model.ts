import mongoose from 'mongoose'

const { Schema } = mongoose

const inventorySchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },
  accessories: {
    type: [String],
    default: []
  },
  backgrounds: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
})

inventorySchema.index({ ownerId: 1 })

export default mongoose.models.Inventory ?? mongoose.model('Inventory', inventorySchema)
