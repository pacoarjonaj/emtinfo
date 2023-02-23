import {Schema, model, models} from 'mongoose'

const busSchema = new Schema({
	codLinea: {
		type: Number
	},
	nombreLinea: {
		type: String
	},
	sentido: {
		type: Number
	},
	orden: {
		type: Number
	},
	codParada: {
		type: Number
	},
	nombreParada: {
		type: String
	},
	direccion: {
		type: String
	},
	lon: {
		type: Number
	},
	lat: {
		type: Number
	}
}, {
	timestamps: false,
	versionKey: false
})

export default models.Bus || model('Bus', busSchema)