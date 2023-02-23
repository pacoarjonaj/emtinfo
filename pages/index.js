import MapItem from "../components/map"
import { useState } from "react"
import { Button, Dropdown, TextInput } from "flowbite-react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "@/components/logo";

const Home = ({}) => {

	const [busList, setBusList] = useState()
	const [selectedCode, setSelectedCode] = useState("")
	const [selectedSense, setSelectedSense] = useState("")
	const [selectedDirection, setSelectedDirection] = useState("")


	const filterBusesList = async event => {
		event.preventDefault()

		const filterededList = await fetch(`http://${process.env.URL}/api/buses/filterBuses?code=${selectedCode}&sen=${selectedSense}&dir=${selectedDirection}`)
			.then(response => response.json())

		setBusList(filterededList)
	}

	function cleanSearch() {
		setBusList(null)
		document.getElementById("form").reset()
	}


	const containerStyle = {
		position: 'relative',
		width: '900px',
		height: '600px'
	}
	
	const center = {
		lat: 36.72016,
		lng: -4.42034
	}

	return (	
		<div className="flex flex-col w-full h-screen items-center overflow-auto py-4">

			<div className="">
				<Header/>
			</div>
			
			<div className="flex flex-row items-center justify-center space-x-24"> 
				<div className="flex flex-col w-1/5 space-y-32">

					<div className="flex flex-col space-y-2">
						<div className="text-center">
							<a className="text-base font-normal text-gray-800">Filtros</a>
						</div>

					<form  id="form" onSubmit={filterBusesList} className="w-auto items-center space-y-2">
						<TextInput 
							id="code"
							name="code"
							placeholder="Codigo de la linea"
							defaultValue={""}
							onChange={(event) => setSelectedCode(event.target.value)}
						/>

						<TextInput 
							id="sense"
							name="sense"
							placeholder="Sentido de la linea"
							defaultValue={""}
							onChange={(event) => setSelectedSense(event.target.value)}
						/>

						<TextInput 
							id="direction"
							name="direction"
							placeholder="Direccion de la linea"
							defaultValue={""}
							onChange={(event) => setSelectedDirection(event.target.value)}
						/>

						<div className="flex flex-row space-x-2">
							<Button id="submit" type="submit" className="my-2 bg-sky-500 hover:bg-sky-700">
								Buscar
							</Button>

							<Button id="clean" onClick={cleanSearch} className="my-2 bg-slate-500 hover:bg-slate-700">
								Limpiar búsqueda
							</Button>
						</div>

					</form>
				</div>	

				{/** Paypal */}
				<div className="flex flex-col space-y-2">
					<div className="text-center">
						<a className="text-base font-normal text-gray-800">Donaciones</a>
					</div>

					<div>
						<PayPalScriptProvider options={{ "client-id": process.env.PAYPAL_ID }}>
							<PayPalButtons
								createOrder={(data, actions) => {
									return actions.order.create({
										purchase_units: [{
											amount: {
												currency_code: "USD",
												value: "100",
											},
										}],
									})
								}}
								onApprove={(data, actions) => {
									return actions.order.capture().then((details) => {
											//alert(`Transacción realizada con éxito.`)
											document.getElementById("").click()
									});
								}}
							style={{ layout: "vertical", color: "gold" }} />
						</PayPalScriptProvider>
					</div>
				</div>
			</div>	

			<div className="relative w-auto my-8"> 
			<MapItem
				containerStyle={containerStyle}
				center={center}
				zoom={13}
				markerList={busList}
			/>
			</div>

		</div>

	</div>
		
	)
}


export default Home



	{/**
		const filterBusesByCodeSubmit = async event => {
		event.preventDefault()

		const filterededList = await fetch(`http://${process.env.URL}/api/buses/filterByCode?codLinea=${selectedCode}&sentido=${selectedSense}`)
			.then(response => response.json())

		setBusList(filterededList)
	}

	const filterBusesByDirection = async event => {
		event.preventDefault()

		const filterededList = await fetch(`http://${process.env.URL}/api/buses/filterByDirection?direccion=${selectedDirection}`)
			.then(response => response.json())

		setBusList(filterededList)
	}
	
	 */}