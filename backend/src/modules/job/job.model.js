import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    type: {
      type: String,
      enum: ["Internship", "Job"],
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    stipend: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Job = mongoose.model("Job", jobSchema);