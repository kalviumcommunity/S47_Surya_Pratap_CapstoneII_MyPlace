import { log } from "console";
import Listing from "../models/Listing.model.js";
import cloudinary from "../utils/cloudinary.js";
import { ListingValidate } from "../Validator/listing.Validator.js";
import fs from "fs";

export const createListing = async (req, res) => {
  console.log(req.files);
  const { error, value } = ListingValidate(req.body);
  if (error) {
    return res.status(500).json({ error: error.details });
  }
  try {
    let videosPaths = [];
    if (
      req.files &&
      req.files.videos &&
      Array.isArray(req.files.videos) &&
      req.files.videos.length > 0
    ) {
      for (let video of req.files.videos) {
        videosPaths.push("/" + video.path);
      }
    }

    if (req.files["images"]) {
      const imagePromises = req.files["images"].map(async (image) => {
        const uploadedImage = await cloudinary.uploader.upload(image.path);
        fs.unlinkSync(image.path);
        return uploadedImage.secure_url;
      });
      const uploadedImages = await Promise.all(imagePromises);
      req.body.images = uploadedImages;
    }
    const listingData = { ...req.body };

    listingData.videos = videosPaths;

    const createdListing = await Listing.create(listingData);
    console.log("Created a dateabase entry", createdListing);
    return res
      .status(201)
      .json({ message: "Listing Created Successfully!!", createdListing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
