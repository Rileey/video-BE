import express from "express";
import cors from "cors";
import cloudinary from "./utils/cloudinary";
import videoUpload from "./utils/multer";
import User from "./model/user"
import 'regenerator-runtime/runtime'


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Controller Imports
// import rootController from "./controllers/rootController"
const routes = express();

// routes.get("/", rootController.get)

//post uploads
routes.post("/uploads", videoUpload.single('video'), async (req, res) => {
    
    try {
        if (!req.file){
            return res.status(400).json({message: "We need a file"});
        }
            try {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    resource_type: "auto"
                })
                let user = new User({
                            name: req.body.name,
                            avatar: result.secure_url,
                            public_id: result.public_id
                        });
                               await user.save()
                               res.json(user)
            } catch (err) {
                console.log(err.message);
                return res.status(400).json({message: "cloudinary error"})
            }
    
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: "Server Error"})
    }
})

// get all posts
routes.get("/uploads", async (req, res) => {
    try {
        let user = await User.find();
        res.json(user);
    } catch (err) {
        console.log(err);
    }
})

//get post by user id
routes.get("/uploads", async (req, res) => {
    const { id } = req.query;
    const { name } = req.query;
    try {

        const user = id ? await User.findById(id) 
        : await User.findOne({ name: name })

        if (user !== null) {
            res.status(200).json({user}).status("success")
        } else {
            res.status(404).send({message: "wrong id"}).end();
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({message: "Invalid id"});
    }
})


//delete post by user id
routes.delete("/uploads/:id", async (req, res) => {
    try {
        //Find user by id
        let user = await User.findById(req.params.id);
        //Delete image from cloudinary
        await cloudinary.uploader.destroy(user.public_id);
        //Delete user from db
        await user.remove();
        res.json(user);
    } catch (err) {
        console.log(err);
    }
})


// update post by user id
routes.put("/uploads/:id", videoUpload.single('video'), async (req, res) => {
    try {
        //Find user by id
        let user = await User.findById(req.params.id);
        await cloudinary.uploader.destroy(user.public_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            name: req.body.name || user.name,
            avatar: result.secure_url || user.avatar,
            public_id: result.public_id || user.public_id
        };
        user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(user);
    } catch (err) {
        console.log(err)
    }
})


routes.get("/cloudinary", ((req, res) => {
    res.json({data: 'cloudinary'});
}))


export default routes;