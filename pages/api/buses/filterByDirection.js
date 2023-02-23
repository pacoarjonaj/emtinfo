import Bus from "@/models/Bus"
import connectMongoDB from "../../../utils/mongoose"


export default async (req,res) => {
	connectMongoDB()

	try{
		const bus = await Bus.find({
			direccion:new RegExp(req.query.direccion,'i')
		})
		return res.status(200).json(bus)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}
