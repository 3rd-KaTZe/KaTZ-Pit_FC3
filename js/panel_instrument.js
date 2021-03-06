// --------------------------------------------------------------------
// Panel Analogique du F15
// --------------------------------------------------------------------

// fonctions de gestion des instruments dans "instrument.js"


// Commun FC3, Reset Chrono de vol et Flight Time
function Chrono(){
	// Mise à zero du Chrono :  time départ = time mission actuel
	KaTZPit_data["Chrono_Start"] = KaTZPit_data["TimeMis"]
}

//
function FltTime(){
	// Mise à zero du Flight Time dans SIOC
	CmdSiocSpe(48,0)
}



function panel_instrument_flight_F15(KaTZPit_data){
	
		// Animation des jauges instrument de vol du F15-------------------------------------------------------------
		//console.log("Mise à jour des instruements du panel")
		
		// Badin et Vario	
		instrument_Mach_F15(KaTZPit_data["IAS"]/ 1.852)
		instrument_Vario_F15(KaTZPit_data["Vario"] * 60 * 3.28084)
		instrument_AoA_F15(KaTZPit_data["AoA"])
		instrument_GMetre_F15(KaTZPit_data["Acc_G"]/10)

		// Error in Altimeter from FC3 (+1.8%)
		// Introduce in KaTZ-Pit to match FC3 pit indication
		// FL level (and altimeter) on Nav panel is correct (based on 1013mb)

		var i_altibaro = KaTZPit_data["QNH"] * 0.982
		instrument_AltiBaro_F15(i_altibaro * 3.281 % 1000 )
		document.getElementById('A1000').innerHTML = Math.floor(i_altibaro * 3.281 / 1000)
		document.getElementById('A100').innerHTML = Math.round(i_altibaro * 3.281 /10) * 10
		// Flag pour les 10000
		if ((i_altibaro * 3.281 / 1000) < 10) {$("#AFlag").fadeIn()} else {$("#AFlag").fadeOut()}
		
}

		
		
function panel_instrument_engine_F15(KaTZPit_data){

		// Montre de Bord
		var hr = KaTZPit_data["Clock"] / 3600
		var mn = Math.floor(KaTZPit_data["Clock"] % 3600 / 60)
			
		var mnchrono = Math.floor(KaTZPit_data["Chrono"] / 60)
		var secchrono = KaTZPit_data["Chrono"] % 60
					
		instrument_Clock_US(hr,mn,mnchrono,secchrono)

		// Affichage des RPM sur les tachometres
		EngRpm = dataread_split_2(KaTZPit_data["Eng_rpm"])
		
		// Rotation Aiguilles Moteur (origine et gain dans les fonctions)
		instrument_EngRPM_F15((EngRpm[1]/10), (EngRpm[0]/10))


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
		// Montre de Bord
		var hr = KaTZPit_data["Clock"] / 3600
		var mn = Math.floor(KaTZPit_data["Clock"] % 3600 / 60)
		var sec = KaTZPit_data["Clock"] % 60
			
		var hrflt = KaTZPit_data["TimeFly"] / 3600
		var mnflt = Math.floor(KaTZPit_data["TimeFly"] % 3600 / 60)
			
		var mnchrono = Math.floor(KaTZPit_data["Chrono"] / 60)
		var secchrono = KaTZPit_data["Chrono"] % 60
			
		instrument_Clock(hr,mn,sec,hrflt,mnflt,mnchrono,secchrono)
		
		// Animation des jauges---------------------------------------------------------------------
		// G-Metre, calcul des G-Min et G-Max ---------------------------------
		// Test de comparaison G-Actuel avec G-min et G-max	 
		var i_Gmax = Math.max(KaTZPit_data["Acc_Gmax"],KaTZPit_data["Acc_G"])
		var i_Gmin = Math.min(KaTZPit_data["Acc_Gmin"],KaTZPit_data["Acc_G"])

		// Mise à jour des valeurs G-min et G-Max dans la base de données
		KaTZPit_data["Acc_Gmax"] = i_Gmax
		KaTZPit_data["Acc_Gmin"] = i_Gmin
	
		instrument_G_25(KaTZPit_data["Acc_G"]/10,i_Gmin/10,i_Gmax/10)
		
		// AoA -----------------------------------------------------------------
		instrument_AoA(KaTZPit_data["AoA"]/10)
		
		// Badin avec affichage IAS/TAS
		var iTas = Math.max(KaTZPit_data["TAS"],400)
		instrument_IAS_SU25(KaTZPit_data["IAS"],iTas)

		// Altiradar
		var i_altirad = KaTZPit_data["QFE"]
		
		if (i_altirad > 1500){i_altirad = 1500}
		instrument_AltiRad_SU33(i_altirad)
		
		// AltiBaro
		instrument_AltiBaro_SU25(KaTZPit_data["QNH"])
		// Affichage des 1000m et des m<1000m
		document.getElementById('A1000').innerHTML = Math.floor(KaTZPit_data["QNH"] / 1000)
		document.getElementById('A100').innerHTML = (KaTZPit_data["QNH"]).toFixed(0)
		
		// Variometre + Bille, même instrument que sur le Mig29
		instrument_Vario_M29(KaTZPit_data["Vario"],KaTZPit_data["Yaw"]/100, KaTZPit_data["Bille"])
		
		
		
		
		
}

function panel_instrument_engine_SU25(KaTZPit_data){

		// Affichage des RPM sur les tachometres
		EngRpm = dataread_split_2(KaTZPit_data["Eng_rpm"])
		
		// Rotation Aiguilles Moteur (origine et gain dans les fonctions)
		instrument_EngRPM_RU(EngRpm[1], EngRpm[0])

		// Temp Moteur  -----------------------------------------------------------------------
		var Temp_Eng = dataread_split_2(KaTZPit_data["Eng_temp"])
		instrument_EngTemp_SU25(Temp_Eng[1],Temp_Eng[0])
		
}

function panel_instrument_flight_Mig29(KaTZPit_data){
	
		// Animation des jauges instrument de vol du Mig29-------------------------------------------------------------
		
		// Montre de Bord
		var hr = KaTZPit_data["Clock"] / 3600
		var mn = Math.floor(KaTZPit_data["Clock"] % 3600 / 60)
		var sec = KaTZPit_data["Clock"] % 60
			
		var hrflt = KaTZPit_data["TimeFly"] / 3600
		var mnflt = Math.floor(KaTZPit_data["TimeFly"] % 3600 / 60)
			
		var mnchrono = Math.floor(KaTZPit_data["Chrono"] / 60)
		var secchrono = KaTZPit_data["Chrono"] % 60
			
		instrument_Clock(hr,mn,sec,hrflt,mnflt,mnchrono,secchrono)
				
		// Animation des jauges---------------------------------------------------------------------
		// G-Metre, calcul des G-Min et G-Max ---------------------------------
		// Test de comparaison G-Actuel avec G-min et G-max	 
		var i_Gmax = Math.max(KaTZPit_data["Acc_Gmax"],KaTZPit_data["Acc_G"])
		var i_Gmin = Math.min(KaTZPit_data["Acc_Gmin"],KaTZPit_data["Acc_G"])

		// Mise à jour des valeurs G-min et G-Max dans la base de données
		KaTZPit_data["Acc_Gmax"] = i_Gmax
		KaTZPit_data["Acc_Gmin"] = i_Gmin
	
		instrument_G_29(KaTZPit_data["Acc_G"]/10,i_Gmin/10,i_Gmax/10)
		
		// AoA -----------------------------------------------------------------
		instrument_AoA(KaTZPit_data["AoA"]/10)
		
		// Badin 
		instrument_IAS_M29(KaTZPit_data["IAS"])
		document.getElementById('IAS1000').innerHTML = Math.floor(KaTZPit_data["IAS"] / 1000)

		
		// Altimetre
		instrument_AltiBaro_M29(KaTZPit_data["QNH"])
		
		// Machmetre
		instrument_Mach_M29(KaTZPit_data["Mach"])
		
		// Bille/Yaw/Vario
		instrument_Vario_M29(KaTZPit_data["Vario"],KaTZPit_data["Yaw"]/100, KaTZPit_data["Bille"])

		// Altiradar
		var i_altirad = KaTZPit_data["QFE"]
		
		if (i_altirad > 1000){i_altirad = 1000}
		instrument_AltiRad_Mig29(i_altirad)
	
}

function panel_instrument_engine_Mig29(KaTZPit_data){

		// Affichage des RPM sur les tachometres
		EngRpm = dataread_split_2(KaTZPit_data["Eng_rpm"])
		
		// Rotation Aiguilles Moteur (origine et gain dans les fonctions)
		instrument_EngRPM_RU(EngRpm[1], EngRpm[0])

		// Temp Moteur,  même jauge que SU25  -----------------------------------------------------------------------
		var Temp_Eng = dataread_split_2(KaTZPit_data["Eng_temp"])
		instrument_EngTemp_SU25(Temp_Eng[1],Temp_Eng[0])
}


function panel_instrument_flight_SU33(KaTZPit_data){
	
		// Animation des jauges instrument de vol du Mig29-------------------------------------------------------------
		// Montre de Bord
		var hr = KaTZPit_data["Clock"] / 3600
		var mn = Math.floor(KaTZPit_data["Clock"] % 3600 / 60)
		var sec = KaTZPit_data["Clock"] % 60
			
		var hrflt = KaTZPit_data["TimeFly"] / 3600
		var mnflt = Math.floor(KaTZPit_data["TimeFly"] % 3600 / 60)
			
		var mnchrono = Math.floor(KaTZPit_data["Chrono"] / 60)
		var secchrono = KaTZPit_data["Chrono"] % 60
			
		instrument_Clock(hr,mn,sec,hrflt,mnflt,mnchrono,secchrono)
		
		// Gmetre et AoA
		
		// G-Metre, calcul des G-Min et G-Max ---------------------------------
		// Test de comparaison G-Actuel avec G-min et G-max	 
		var i_Gmax = Math.max(KaTZPit_data["Acc_Gmax"],KaTZPit_data["Acc_G"])
		var i_Gmin = Math.min(KaTZPit_data["Acc_Gmin"],KaTZPit_data["Acc_G"])

		// Mise à jour des valeurs G-min et G-Max dans la base de données
		KaTZPit_data["Acc_Gmax"] = i_Gmax
		KaTZPit_data["Acc_Gmin"] = i_Gmin
	
		instrument_GAoA_SU33(KaTZPit_data["Acc_G"]/10,i_Gmin/10,i_Gmax/10,KaTZPit_data["AoA"]/10)
	
		
		// Badin 
		instrument_IAS_SU33(KaTZPit_data["IAS"],KaTZPit_data["Mach"]/10)
		//document.getElementById('IAS1000').innerHTML = Math.floor(KaTZPit_data["IAS"] / 1000)
	
		
		// Altiradar
		var i_altirad = KaTZPit_data["QFE"]
		
		if (i_altirad > 1500){i_altirad = 1500}
		instrument_AltiRad_SU33(i_altirad)
		
		// Altimetre
		instrument_AltiBaro_SU33(KaTZPit_data["QNH"])
		document.getElementById('Alti1000').innerHTML = Math.floor(KaTZPit_data["QNH"] / 1000)
		
		document.getElementById('QNH_Base').innerHTML = (KaTZPit_data["QNH_Base"] / 7600 * 1013).toFixed(0)
		
		// Vario
		instrument_Vario_SU33(KaTZPit_data["Vario"])

}

function panel_instrument_engine_SU33(KaTZPit_data){

		// Affichage des RPM sur les tachometres
		EngRpm = dataread_split_2(KaTZPit_data["Eng_rpm"])
		
		// Rotation Aiguilles Moteur (origine et gain dans les fonctions)
		instrument_EngRPM_RU(EngRpm[1], EngRpm[0])

		// Temp Moteur  -----------------------------------------------------------------------
		var Temp_Eng = dataread_split_2(KaTZPit_data["Eng_temp"])
		instrument_EngTemp_SU33(Temp_Eng[1],Temp_Eng[0])
		
}

function panel_instrument_flight_SU27(KaTZPit_data){
	
		// Animation des jauges instrument de vol du Mig29-------------------------------------------------------------
		// Montre de Bord
		var hr = KaTZPit_data["Clock"] / 3600
		var mn = Math.floor(KaTZPit_data["Clock"] % 3600 / 60)
		var sec = KaTZPit_data["Clock"] % 60
			
		var hrflt = KaTZPit_data["TimeFly"] / 3600
		var mnflt = Math.floor(KaTZPit_data["TimeFly"] % 3600 / 60)
			
		var mnchrono = Math.floor(KaTZPit_data["Chrono"] / 60)
		var secchrono = KaTZPit_data["Chrono"] % 60
			
		instrument_Clock(hr,mn,sec,hrflt,mnflt,mnchrono,secchrono)
		
		// Gmetre et AoA
		
		// G-Metre, calcul des G-Min et G-Max ---------------------------------
		// Test de comparaison G-Actuel avec G-min et G-max	 
		var i_Gmax = Math.max(KaTZPit_data["Acc_Gmax"],KaTZPit_data["Acc_G"])
		var i_Gmin = Math.min(KaTZPit_data["Acc_Gmin"],KaTZPit_data["Acc_G"])

		// Mise à jour des valeurs G-min et G-Max dans la base de données
		KaTZPit_data["Acc_Gmax"] = i_Gmax
		KaTZPit_data["Acc_Gmin"] = i_Gmin
	
		instrument_GAoA_SU33(KaTZPit_data["Acc_G"]/10,i_Gmin/10,i_Gmax/10,KaTZPit_data["AoA"]/10)
	
		
		// Badin 
		instrument_IAS_SU33(KaTZPit_data["IAS"],KaTZPit_data["Mach"]/10)
		//document.getElementById('IAS1000').innerHTML = Math.floor(KaTZPit_data["IAS"] / 1000)

		
		// Altiradar
		var i_altirad = KaTZPit_data["QFE"]
		
		if (i_altirad > 1500){i_altirad = 1500}
		instrument_AltiRad_SU33(i_altirad)
		
		// Altimetre
		document.getElementById('QNH_Base').innerHTML = (KaTZPit_data["QNH_Base"] / 10).toFixed(0)
		instrument_AltiBaro_SU27(KaTZPit_data["QNH"])
								
		// Bille/Yaw/Vario
		instrument_Vario_M29(KaTZPit_data["Vario"],KaTZPit_data["Yaw"]/100, KaTZPit_data["Bille"])

}

function panel_instrument_engine_SU27(KaTZPit_data){

		// Affichage des RPM sur les tachometres
		EngRpm = dataread_split_2(KaTZPit_data["Eng_rpm"])
		
		// Rotation Aiguilles Moteur (origine et gain dans les fonctions)
		instrument_EngRPM_RU(EngRpm[1], EngRpm[0])

		// Temp Moteur  -----------------------------------------------------------------------
		var Temp_Eng = dataread_split_2(KaTZPit_data["Eng_temp"])
		instrument_EngTemp_SU33(Temp_Eng[1],Temp_Eng[0])
		
}









