import mongoose from 'mongoose'

const { Schema } = mongoose

const activeQuestSchema = new Schema({
  templateId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  target: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  reward: { type: Number, required: true },
  emoji: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { _id: false })

const dailyQuestSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  quests: {
    type: [activeQuestSchema],
    default: []
  }
}, {
  timestamps: true
})

dailyQuestSchema.index({ ownerId: 1, date: 1 }, { unique: true })

export default mongoose.models.DailyQuest ?? mongoose.model('DailyQuest', dailyQuestSchema)
