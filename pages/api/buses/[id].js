import Bus from "../../../models/Bus"
import connectMongoDB from "../../../utils/mongoose"


connectMongoDB()

export default async (req, res) => {
	const {
		method,
		body,
		query: {id},
	} = req;

	switch(method) {

		// http://localhost:3000/api/buses/[id]
		
		case 'GET':
			try{
				const bus = await Bus.findById(id)
				if(!bus) return res.status(404).json({msg: "Bus not found"})
				return res.status(200).json(bus)

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		case 'PUT':
			try{
				const bus = await Bus.findByIdAndUpdate(id, body, {new: true})
				if (!bus) return res.status(404).json({msg: "Bus not found"})
				return res.status(202).json(bus)

			}catch(error){
				return res.status(500).json({msg: "This method is not supported"})
			}

		case 'DELETE':
			try{
				const deletedBus = await Bus.findByIdAndDelete(id)
				if (!deletedBus) return res.status(404).json({msg: "Bus not found"})
				return res.status(202).json({msg: "Bus deleted"})

			}catch(error){
				return res.status(400).json({msg: error.message})
			}

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
}
