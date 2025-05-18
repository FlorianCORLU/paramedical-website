import verifyTurnstile from "../services/turnstile.js";
import sendEmail from "../services/mail.js";

const homeController = {
  // Displays home page
  getHomePage: async function (req, res) {
    try {
      res.render("index", {
        turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
      });
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  },

  // Use Turnstile Spam filter then Submit Contact form
  submitContactForm: async function (req, res) {
    const token = req.body["cf-turnstile-response"]; // Key received by the user
    const ip = req.ip; // User ip address, used for validation

    const isValid = await verifyTurnstile(token, ip);

    if (!isValid) {
      return res.status(403).send("CAPTCHA invalide");
    }

    // Retrieve data from the Contact form
    const contactData = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    };

    // Configure email to send
    const mailOptions = {
      from: `"(${contactData.email})"`,
      to: process.env.SMTP_USER,
      subject: "Fomulaire de contact",
      text: contactData.message,
      replyTo: contactData.email,
      html: `<p><strong>Nom :</strong> ${contactData.name}</p>
             <p><strong>Email :</strong> ${contactData.email}</p>
             <p><strong>Message :</strong> ${contactData.message}</p>`,
    };
    console.log("contactData :", contactData);
    try {
      await sendEmail(mailOptions);
      res.render("index", {
        emailStatus: "Success",
        message: "Formulaire bien reçu et email envoyé !",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      res.status(500).render("index", {
        emailStatus: "Error",
        message: "Erreur lors de l'envoi de l'email",
      });
    }
  },
};

export default homeController;
