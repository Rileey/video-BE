import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// const db = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@signin.uwsar.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


const databaseConnection = {
    getConnect: () => {
        mongoose
          .connect(`mongodb+srv://deji:R1leythehuman@cloudinary.nsj2d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { 
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => console.log('connected successfully! Database name: Cloudinary'))
          .catch((err) => console.log(err.message));
    }
}


export default databaseConnection;
