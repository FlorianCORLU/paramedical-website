import express from "express";
import homeController from "../controllers/homeController.js";

const router = express.Router();

// Home page routes
router.get("/", homeController.getHomePage);

router.post("/submit-contact-form", homeController.submitContactForm);

export default router;
