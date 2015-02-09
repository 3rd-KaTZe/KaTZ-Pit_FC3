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
		// IAS en 1000 , puis en dessous le chiffre total
		document.getElementById('A1000').innerHTML = Math.floor(KaTZPit_data["QNH"]* 3.281 / 1000)
		document.getElementById('A100').innerHTML = (KaTZPit_data["QNH"]* 3.281).toFixed(0)
		// Flag pour les 10000
		if ((KaTZPit_data["QNH"] * 3.281 / 1000) < 10) {$("#AFlag").fadeIn()} else {$("#AFlag").fadeOut()}
		
}

		
		
function panel_instrument_engine_F15(KaTZPit_data){

		// Temp Moteur et Conso -----------------------------------------------------------------------
		var Temp_Eng = dataread_split_2(KaTZPit_data["Eng_temp"])
		
		instrument_EngTemp_F15(Temp_Eng[1],Temp_Eng[0])
		
		
		document.getElementById('T100_L').innerHTML = Math.floor(Temp_Eng[1]/100)
		document.getElementById('T100_R').innerHTML = Math.floor(Temp_Eng[0]/100)
		document.getElementById('T10_L').innerHTML = (Temp_Eng[1]).toFixed(0)
		document.getElementById('T10_R').innerHTML = (Temp_Eng[0]).toFixed(0)
		
		// Consommation moteur, total puis calculé en fonction des rpm moteur
		// Affichage des RPM sur les tachometres
		EngTmp = dataread_split_2(KaTZPit_data["Eng_temp"])
		var delL = Math.max((EngTmp[1]-150),0)
		var delR = Math.max((EngTmp[0]-150),0)
				
		var i_Conso = KaTZPit_data["Conso"] / 100 * 2.205 * 60
		
		if (delL + delR == 0) { 
		var pct_L = 0 
		var i_Conso = 0
		}
		
		else {var pct_L = delL / (delL + delR)}
		
		
		var i_ConsoL = (i_Conso * pct_L)
		var i_ConsoR = (i_Conso * (1-pct_L))
				
		document.getElementById('FF_L').innerHTML = i_ConsoL.toFixed(0)
		document.getElementById('FF_R').innerHTML = i_ConsoR.toFixed(0)
		
		instrument_EngFF_F15(i_ConsoL / 100,i_ConsoR / 100)

}

function panel_instrument_flight_SU25(KaTZPit_data){
	
		// Animation des jauges instrument de vol du SU25-------------------------------------------------------------
		
		// Badin et Vario
		var iTas = Math.max(KaTZPit_data["TAS"],400)
		
		instrument_IAS_SU25(KaTZPit_data["IAS"],iTas)
		instrument_AltiBaro_SU25(KaTZPit_data["QNH"])
		// IAS en 1000 , puis en dessous le chiffre total
		document.getElementById('A1000').innerHTML = Math.floor(KaTZPit_data["QNH"] / 1000)
		document.getElementById('A100').innerHTML = (KaTZPit_data["QNH"]).toFixed(0)
	
}

function panel_instrument_flight_Mig29(KaTZPit_data){
	
		// Animation des jauges instrument de vol du Mig29-------------------------------------------------------------
		
		// Badin 
		instrument_IAS_M29(KaTZPit_data["IAS"])
		document.getElementById('IAS1000').innerHTML = Math.floor(KaTZPit_data["IAS"] / 1000)

		
		// Altimetre
		instrument_AltiBaro_M29(KaTZPit_data["QNH"])
		
		// Machmetre
		instrument_Mach_M29(KaTZPit_data["Mach"])
		
		// Bille/Yaw/Vario
		instrument_Vario_M29(KaTZPit_data["Vario"],KaTZPit_data["Yaw"]/100, KaTZPit_data["Bille"])


	
}








