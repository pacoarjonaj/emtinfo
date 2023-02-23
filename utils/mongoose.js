import mongoose from 'mongoose'

const connectMongoDB = async() => {
	try{
		mongoose.set("strictQuery", false)
		const {connection} = await mongoose.connect(process.env.MONGODB_URL)
	}catch(err){
		return Promise.reject(err)
	}
}

export default connectMongoDB