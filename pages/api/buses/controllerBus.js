import Bus from "../../../models/Bus"

// http://localhost:3000/api/buses

export async function getBuses(req,res){
	try{
		const buses = await Bus.find()
	 	return res.status(200).json(buses)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}


export async function postBUses(req,res){
	try{
		const newBus = new Bus(req.body)
		const savedBus = await newBus.save()
		return res.status(201).json(savedBus)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}
