import mongoose from 'mongoose'

const { Schema } = mongoose

const monsterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: false,
    default: 1
  },
  xp: {
    type: Number,
    required: false,
    default: 0
  },
  maxXp: {
    type: Number,
    required: false,
    default: 100
  },
  traits: {
    type: String, // JSON stringified MonsterDesign
    required: true
  },
  state: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'angry', 'hungry', 'sleepy'],
    default: 'happy'
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  equippedAccessories: {
    hat: { type: String, default: null },
    glasses: { type: String, default: null },
    shoes: { type: String, default: null }
  },
  equippedBackground: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})

monsterSchema.index({ ownerId: 1 })
monsterSchema.index({ isPublic: 1, createdAt: -1 })

export default mongoose.models.Monster ?? mongoose.model('Monster', monsterSchema)
