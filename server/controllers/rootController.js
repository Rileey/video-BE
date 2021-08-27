const rootController = {};

rootController.get = (req, res) => {
    res.json({
        message: "root route"
    });
};

export default rootController;