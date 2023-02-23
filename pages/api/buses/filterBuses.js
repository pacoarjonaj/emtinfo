import Bus from "@/models/Bus"
import connectMongoDB from "../../../utils/mongoose"

function maybeCreateMongoQuery(prop, value){
	return value === "null" ? null : {[prop]: value}
}

function maybeCreateMongoPartialQuery(prop,value){
	return value === "null" ? null : {[prop]: new RegExp(value, 'i')}
}


export default async (req,res) => {
	connectMongoDB()

	const filterParams = []

	if(req.query.code != "") filterParams.push({ codLinea: req.query.code})
	if(req.query.sen != "") filterParams.push({ sentido: req.query.sen})
	if(req.query.dir != "") filterParams.push({ direccion: {$regex: req.query.dir, $options: 'i'}})

	try{
		const buses = await Bus.find({ $and: filterParams})

		return res.status(200).json(buses)

	}catch(error){
		return res.status(400).json({error: error.message })
	}
}
