import connectMongoDB from "../../../utils/mongoose"
import { getBuses, postBUses } from "./controllerBus"


export default async function handler(req, res) {
	connectMongoDB().catch(() => res.status(405).json({error:"Error in the connection"}))

	//type of request
	const {method} = req
	
	switch(method){
		case 'GET':
			return getBuses(req,res)

		case 'POST':
			return postBUses(req,res)

		default:
			return res.status(400).json({msg: "This method is not supported"})
	}
 
}