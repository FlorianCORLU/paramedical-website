const homeController = {

// Displays home page
  getHomePage: async function (req, res) {
    try {
      res.render("index");
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  },
};


export default homeController;
