// --------------------------------------------------------------------
// Panel Analogique du F15
// --------------------------------------------------------------------

// fonctions de gestion des instruments dans "instrument.js"

function panel_instrument_flight_F15(KaTZPit_data){
	
		// Animation des jauges instrument de vol du F15-------------------------------------------------------------
		console.log("Mise à jour des instruements du panel")
		
		// Badin et Vario	
		instrument_Mach_F15(KaTZPit_data["IAS"]/ 1.852)
		instrument_Vario_F15(KaTZPit_data["Vario"] * 60 * 3.28084)
		instrument_AoA_F15(KaTZPit_data["AoA"])
		instrument_GMetre_F15(KaTZPit_data["Acc_G"]/10)
		
		instrument_AltiBaro_F15(KaTZPit_data["QNH"]* 3.281 % 1000 )
		// Altimetre Baro , 2 aiguilles  -------------------------------------------------------------
		
		
		// Rotation HSI   dans Navigation Panel Update -------------------------------------------------------------------
			
		
		
}

		
		
function panel_instrument_engine_F15(KaTZPit_data){

		// Temp Moteur et Conso -----------------------------------------------------------------------
		var Temp_Eng = dataread_split_2(KaTZPit_data["Eng_temp"])
		
		instrument_EngTemp_F15(Temp_Eng[1],Temp_Eng[0])
		
		
		document.getElementById('T100_L').innerHTML = Math.floor(Temp_Eng[1]/100)
		document.getElementById('T100_R').innerHTML = Math.floor(Temp_Eng[0]/100)
		document.getElementById('T10_L').innerHTML = (Temp_Eng[1]).toFixed(0)
		document.getElementById('T10_R').innerHTML = (Temp_Eng[0]).toFixed(0)
		
		//document.getElementById('T10_L').innerHTML = (Temp_Eng[1]%100).toFixed(0)
		//document.getElementById('T10_R').innerHTML = (Temp_Eng[0]%100).toFixed(0)		

}








