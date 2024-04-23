import express from "express";
import { createListing } from "../controllers/listing.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync("public")) {
        fs.mkdirSync("public");
      }
      if (!fs.existsSync("public/videos")) {
        fs.mkdirSync("public/videos");
      }
      if (!fs.existsSync("public/images")) {
        fs.mkdirSync("public/images");
      }
  
      cb(null, file.fieldname === "videos" ? "public/videos" : "public/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      if (
        ext !== ".mkv" &&
        ext !== ".mp4" &&
        ext !== ".jpg" &&
        ext !== ".jpeg" &&
        ext !== ".png"
      ) {
        return cb(new Error("Only videos and images are allowed"));
      }
      cb(null, true);
    },
  });
  
  router.post(
    "/create",
    verifyToken,
    upload.fields([
      {
        name: "videos",
        maxCount: 2, 
      },
      {
        name: "images",
        maxCount: 6, 
      },
    ]),
    createListing
  );
  

export default router;
