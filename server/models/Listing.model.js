import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    ACrooms: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    wifiAvailable: {
      type: Boolean,
      required: true,
    },
    messFacility: {
      type: Boolean,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    userRef: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("pgListings", listingSchema);

export default Listing;
