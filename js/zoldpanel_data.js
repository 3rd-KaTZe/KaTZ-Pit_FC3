function paneldata_update(KaTZPit_data){

	
	//console.log("update")

	

	
	// --------------------------------------------------------------------------------
	// Panel Navigation
	
	// Calculateur de Vol : Time2WP, ETA, QNH@WP (altitude au WP avec la pente actuelle)
	
	// Time2WP (sec) = Distance (km) / TAS (km/h) * 3600 (sec/hr)
	KaTZPit_data["Time_2_WP"] = KaTZPit_data["WP_dist"] / KaTZPit_data["TAS"] * 3600
	// ETA, WP = Heure actuelle (Clock) + Time2WP
	KaTZPit_data["ETA"] = KaTZPit_data["Clock"] + KaTZPit_data["Time_2_WP"]
	// QNH @^WP = QNH (m) + Vario (m/s)  * Time2WP (sec)
	KaTZPit_data["QNH_WP"] = KaTZPit_data["QNH"] + KaTZPit_data["Vario"] * KaTZPit_data["Time_2_WP"]
	
	// Calcul Fuel2WP (time2wp(sec) * conso (kg/mn) / 60 (sec/mn))
	KaTZPit_data["Fuel_2_WP"] = KaTZPit_data["Time_2_WP"] * KaTZPit_data["Conso"] / 60
	i_playtime = ((KaTZPit_data["Fuel_e"] + KaTZPit_data["Fuel_i"])- KaTZPit_data["Fuel_2_WP"])/KaTZPit_data["Conso"]
	
		
	
	// Affichage
	// Donnée IAS, TAS
	
	// IAS en "km/h" et en "kts"
	document.getElementById('IAS_km').innerHTML = KaTZPit_data["IAS"].toFixed(0)
	document.getElementById('IAS_kt').innerHTML = (KaTZPit_data["IAS"]/1.852).toFixed(0)
	document.getElementById('Mach').innerHTML = (KaTZPit_data["Mach"]/100).toFixed(2)

	//QNH en "m" et en "feet"
	document.getElementById('QNH_m').innerHTML = KaTZPit_data["QNH"].toFixed(0)
	document.getElementById('QNH_f').innerHTML = (KaTZPit_data["QNH"]* 3.281).toFixed(0)
	
	// Les variables unités métriques/impériales sont converties suivant l'avion
	// Avant affichage

	if (Plane_data["ID"] == 15) {
		// TAS en kts
		document.getElementById('TAS').innerHTML = (KaTZPit_data["TAS"] / 1.852) .toFixed(0)
				
		// vario en pied/mn
		var i_Vario = KaTZPit_data["Vario"] * 60 * 3.28084
		var i_IAS = KaTZPit_data["IAS"]/1.852
		var i_QFE = (KaTZPit_data["QFE"] * 3.281)
		var i_QNHWP = (KaTZPit_data["QNH_WP"] * 3.281)
		var i_Fuel2WP = KaTZPit_data["Fuel_2_WP"] * 2.205
				
		} 
	
		else {
			document.getElementById('TAS').innerHTML = KaTZPit_data["TAS"].toFixed(0)
			// Variometre
			// Le parametre "vari_unit" permet de passer de "m/s" à "m/mn" avec la fonction NavMns()
			// Cette fonction  toggle des unités" est déclanchée, par le bouton sous l'affichage Vario
			var i_Vario = KaTZPit_data["Vario"] * KaTZPit_data["Vari_unit"]
			var i_IAS = KaTZPit_data["IAS"]
			var i_QFE = KaTZPit_data["QFE"]
			var i_QNHWP = KaTZPit_data["QNH_WP"]
			var i_Fuel2WP = KaTZPit_data["Fuel_2_WP"]
			
			}

	document.getElementById('Vario').innerHTML = i_Vario.toFixed(0)	
	document.getElementById('QFE').innerHTML = i_QFE.toFixed(0)

	// Mode de Vol
	// Si mode de vol n'existe pas on renvoi "---"
	i_fl_mod = FL_data[KaTZPit_data["FL_mode"]] 
	if (typeof i_fl_mod == "undefined"){i_fl_mod = "---"}
	document.getElementById('FL_mode').innerHTML = i_fl_mod

	// Cap, Direction WP, Relèvement Bulls (WP-180°), Direction Route
	document.getElementById('Cap').innerHTML = (KaTZPit_data["Cap"]/10).toFixed(0)
	document.getElementById('Way').innerHTML = (KaTZPit_data["Way"]/10).toFixed(0)
	KaTZPit_data["Bullseye"] = (KaTZPit_data["Way"]/10 +180) % 360
	document.getElementById('Bullseye').innerHTML = KaTZPit_data["Bullseye"].toFixed(0)
	document.getElementById('Route').innerHTML = (KaTZPit_data["Route"]/10).toFixed(0)

	
	// N° du WP, et Distance au WP en "km"
	document.getElementById('WP_num').innerHTML = KaTZPit_data["WP_num"]

	if (Plane_data["ID"] == 15) {
		document.getElementById('WP_dist').innerHTML = (KaTZPit_data["WP_dist"] / 1.852).toFixed(0)
		document.getElementById('TAS_Opt').innerHTML = (i_Tas_eco / 1.852).toFixed(0)
		} 
		else {
			document.getElementById('WP_dist').innerHTML = KaTZPit_data["WP_dist"].toFixed(0)
			document.getElementById('TAS_Opt').innerHTML = i_Tas_eco.toFixed(0)
		}
	
	
	
	// Heure, Temps de Vol, Chrono
	document.getElementById('Clock').innerHTML = time_format_0(KaTZPit_data["Clock"])
	document.getElementById('Time_Fly').innerHTML = time_format_0(KaTZPit_data["TimeFly"])
	var i_chrono = KaTZPit_data["TimeMis"] - KaTZPit_data["Chrono"]
	document.getElementById('Chrono').innerHTML = time_format_1(i_chrono)
		
	// Calculateur de Vol : Time2WP, ETA, QNH@WP (altitude au WP avec la pente actuelle)
	document.getElementById('Time_2_WP').innerHTML =  Math.floor(KaTZPit_data["Time_2_WP"] / 60) + "\'" + (KaTZPit_data["Time_2_WP"] % 60).toFixed(0)+"\""
	document.getElementById('QNH_WP').innerHTML = i_QNHWP.toFixed(0)
	document.getElementById('ETA').innerHTML = time_format_0(KaTZPit_data["ETA"])

	// Calculateur Playtime : TAS-Opt, Fuel2WP, PlayTime
	
	
	
	// Fuel2WP = Fuel
	document.getElementById('Fuel_2_WP').innerHTML = i_Fuel2WP.toFixed(0)
	document.getElementById('Playtime').innerHTML = i_playtime.toFixed(0) + " mn"

	
	// --------------------------------------------------------------------------------
	// Panel Weapon
	var i_shoot = KaTZPit_data["TimeMis"] - KaTZPit_data["Shoot_time"]
	document.getElementById('Shoot_time').innerHTML = Math.min(i_shoot, 99)
	//Si l'Ammo_checksum change on met à jour le panel weapon (pour soulager le programme)
	//Si l'Ammo_checksum change on lance le chrono de tir
	if (KaTZPit_data["WP_check"] > 0){
	
			weapon_panel_update()
			KaTZPit_data["Shoot_time"] = KaTZPit_data["TimeMis"]
			
			}
	// Le flag est remis à zero dans la subroutine weapon_panel_update()

	// --------------------------------------------------------------------------------
	// Panel ILS
	document.getElementById('AoA').innerHTML = (KaTZPit_data["AoA"]/10).toFixed(0)
	document.getElementById('IAS_ils').innerHTML = Math.min(i_IAS / 100 , 9.9).toFixed(1)
	document.getElementById('Vario_ils').innerHTML = Math.min(i_Vario,99).toFixed(0)
	document.getElementById('QFE_ils').innerHTML = Math.min(i_QFE / 100 , 9.9).toFixed(1)
	//document.getElementById('Airport').innerHTML = KaTZPit_data["Airport"]

	// Repérage de la Piste sélectionnée par sa coordonnée X, prise dans la table RWY_data
	// Si x_coordonnée n'existe pas on renvoi "---"
	i_rwy_x = Math.abs(KaTZPit_data["Rwy_x"])
	i_rwy_txt = RWY_data[i_rwy_x] 
	if (typeof i_rwy_txt == "undefined"){i_rwy_txt = "---"}
	document.getElementById('Airport').innerHTML = i_rwy_txt

	
	// --------------------------------------------------------------------------------
	// Panel Radio
	// Retour de la fréquence sélectionnée par SIOC
	document.getElementById('R_Chan0').innerHTML = (KaTZPit_data["TS_Chan"] / 1000).toFixed(1)


	// --------------------------------------------------------------------------------
	// Panel Target

	route1 = route_calc(KaTZPit_data["WP_dist"],KaTZPit_data["Bullseye"],KaTZPit_data["TGT1_km"],KaTZPit_data["TGT1_deg"]) 
	route2 = route_calc(KaTZPit_data["WP_dist"],KaTZPit_data["Bullseye"],KaTZPit_data["TGT2_km"],KaTZPit_data["TGT2_deg"]) 
	route3 = route_calc(KaTZPit_data["WP_dist"],KaTZPit_data["Bullseye"],KaTZPit_data["TGT3_km"],KaTZPit_data["TGT3_deg"]) 


	KaTZPit_data["T1_km"] = route1[0]
	KaTZPit_data["T1_deg"] = route1[1]
	KaTZPit_data["T2_km"] = route2[0]
	KaTZPit_data["T2_deg"] = route2[1]
	KaTZPit_data["T3_km"] = route3[0]
	KaTZPit_data["T3_deg"] = route3[1]


	document.getElementById('T1_km').innerHTML = KaTZPit_data["T1_km"].toFixed(0)
	document.getElementById('T1_deg').innerHTML = KaTZPit_data["T1_deg"].toFixed(0)
	document.getElementById('T2_km').innerHTML = KaTZPit_data["T2_km"].toFixed(0)
	document.getElementById('T2_deg').innerHTML = KaTZPit_data["T2_deg"].toFixed(0)
	document.getElementById('T3_km').innerHTML = KaTZPit_data["T3_km"].toFixed(0)
	document.getElementById('T3_deg').innerHTML = KaTZPit_data["T3_deg"].toFixed(0)

	document.getElementById('TGT1_km').innerHTML = KaTZPit_data["TGT1_km"].toFixed(0)
	document.getElementById('TGT1_deg').innerHTML = KaTZPit_data["TGT1_deg"].toFixed(0)
	document.getElementById('TGT2_km').innerHTML = KaTZPit_data["TGT2_km"].toFixed(0)
	document.getElementById('TGT2_deg').innerHTML = KaTZPit_data["TGT2_deg"].toFixed(0)
	document.getElementById('TGT3_km').innerHTML = KaTZPit_data["TGT3_km"].toFixed(0)
	document.getElementById('TGT3_deg').innerHTML = KaTZPit_data["TGT3_deg"].toFixed(0)
	document.getElementById('TGT_keyin').innerHTML = KaTZPit_data["TGT_keyin"]


}

	
