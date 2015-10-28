
// Specification des différents appareils
// ID = Nom appareil
// Fuel_imax, Fuel_emax Capacité Carburant Maximale des reservoirs internes/externes
// Bingo, IAS_low, QFE_low, AoA_high , seuil des alarmes lowfuel, lowspeed, lowaltitude, high AoA
// TAS_eco, TAS (km/hr) conso mini au niveau de la mer
// TAS_alt, Facteur d'augmentation de la TAS eco avec l'altitude (km/hr par 1000 metres d'alti)
// Conso_eco, Consommation Carburant minimale à TAS Eco (kg/mn)
// Conso_alt, Diminution de la conso eco avec l'altitude (kg/mn par 1000 metres d'alti)
// Finesse, Finess Max (distance franchissable avec la reserve d'altitude)





function Mig29_init(){
	
	console.log("Initialisation des données du Mig-29C")

	var Plane_data = {ID:29, Fuel_imax:3500, Fuel_emax:3000, Bingo:800, IAS_low:250, QFE_low:40, AoA_high:10, TAS_eco:550, TAS_alt:19.8, Conso_eco:29.6, Conso_alt:-0.8, Finesse:700, ILS_AoA_up:150, ILS_AoA_dwn:-50, ILS_IAS_up:400, ILS_IAS_dwn:200, ILS_Vario_up:5, ILS_Vario_dwn: -15, ILS_QFE_up:400, ILS_QFE_dwn:0 }

	return (Plane_data);

}


function SU25_init(){
	
	console.log("Initialisation des données du SU-25T")

	var Plane_data = {ID:25, Fuel_imax:6251, Fuel_emax:8731, Bingo:600, IAS_low:200, QFE_low:40, AoA_high:10, TAS_eco:560, TAS_alt:22.8, Conso_eco:45.0, Conso_alt:-2.5, Finesse:700, ILS_AoA_up:150, ILS_AoA_dwn:-50, ILS_IAS_up:400, ILS_IAS_dwn:200, ILS_Vario_up:5, ILS_Vario_dwn: -15, ILS_QFE_up:400, ILS_QFE_dwn:0}
	
	return (Plane_data);
}


function SU27_init(){
	
	console.log("Initialisation des données du SU-27")

	var Plane_data = {ID:27, Fuel_imax:9397, Fuel_emax:1, Bingo:800, IAS_low:250, QFE_low:40, AoA_high:10, TAS_eco:650, TAS_alt:16.2, Conso_eco:45.0, Conso_alt:-1.6, Finesse:700, ILS_AoA_up:150, ILS_AoA_dwn:-50, ILS_IAS_up:400, ILS_IAS_dwn:200, ILS_Vario_up:5, ILS_Vario_dwn: -15, ILS_QFE_up:400, ILS_QFE_dwn:0}
	
	return (Plane_data);
}

function SU33_init(){
	
	console.log("Initialisation des données du SU-33")

	var Plane_data = {ID:33, Fuel_imax:9400, Fuel_emax:1, Bingo:800, IAS_low:250, QFE_low:40, AoA_high:10, TAS_eco:650, TAS_alt:16.2, Conso_eco:45.0, Conso_alt:-1.6, Finesse:700, ILS_AoA_up:150, ILS_AoA_dwn:-50, ILS_IAS_up:400, ILS_IAS_dwn:200, ILS_Vario_up:5, ILS_Vario_dwn: -15, ILS_QFE_up:400, ILS_QFE_dwn:0}
	
	return (Plane_data);
}

function F15_init(){
	
	console.log("Initialisation des données du F-15")
	
	// Les données ILS sont en unités impériales (kts, ft/mn, feet)

	var Plane_data = {ID:15, Fuel_imax:6102, Fuel_emax:5542, Bingo:1588, IAS_low:463, QFE_low:40, AoA_high:10, TAS_eco:600, TAS_alt:15.0, Conso_eco:29.6, Conso_alt:-1.1, Finesse:700, ILS_AoA_up:150, ILS_AoA_dwn:-50, ILS_IAS_up:200, ILS_IAS_dwn:100, ILS_Vario_up:1, ILS_Vario_dwn: -3, ILS_QFE_up:1000, ILS_QFE_dwn:0}
	
	return (Plane_data);
}


