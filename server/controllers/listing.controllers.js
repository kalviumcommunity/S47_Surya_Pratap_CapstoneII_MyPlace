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

export const deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedListing = await Listing.findByIdAndDelete(id);
    res.status(201).json({ message: "Lising Deleted Successfully" });
  } catch (error) {
    res.send(error.message);
  }
};

export const updateListingInfo = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  console.log(req.file);
  console.log(req.body.images);

  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("No Listing Found");
    }
    if (req.user.id !== listing.userRef) {
      return res.status(401).send("You can only update your own listing");
    }
    console.log("Data to be updated", req.body);
    const updatedListing = await Listing.findByIdAndUpdate(id, req.body);
    res.status(200).json(updatedListing);
    console.log("listing updated", updatedListing);
  } catch (error) {
    console.error("Error updating listing:", error);
    res.status(500).send(error.message);
  }
};

export const getListingById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const listing = await Listing.findById({ _id: id });
    if (!listing) {
      return res.status(404).send("No Listing Found");
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

export const updateListingImages = async (req, res) => {
  const { id } = req.params;
  try {
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("No Listing Found");
    }
    if (req.user.id !== listing.userRef) {
      return res.status(401).send("You can only update your own listing");
    }

    if (req.files["images"]) {
      const imagePromises = req.files["images"].map(async (image) => {
        const uploadedImage = await cloudinary.uploader.upload(image.path);
        fs.unlinkSync(image.path);
        return uploadedImage.secure_url;
      });
      const uploadedImages = await Promise.all(imagePromises);
      log(uploadedImages);
      const updatedListing = await Listing.findByIdAndUpdate(
        id,
        { images: uploadedImages },
        { new: true }
      );
      res.status(200).json(updatedListing);
      console.log("listing updated", updatedListing);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

export const updateListingVideos = async (req, res) => {
  const { id } = req.params;

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

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { videos: videosPaths },
      { new: true }
    );
    res.status(200).json(updatedListing);
    console.log("listing updated", updatedListing);
  } catch (error) {
    log(error.message);
    res.send(error.message);
  }
};
