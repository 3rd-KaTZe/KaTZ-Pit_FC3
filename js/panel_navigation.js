// --------------------------------------------------------------------------------
// Panel Navigation
// --------------------------------------------------------------------------------

function panel_navigation_update(KaTZPit_data){

	// *****************************************************************************
	// Calculateur de Vol : Time2WP, ETA, QNH@WP -----------------------------------
	// *****************************************************************************
	
	// Time pour le WP(sec) = Distance (km) / TAS (km/h) * 3600 (sec/hr)
	// Plafonné à 99mn59sec quand TAS=0, pour éviter division par zero TAS et Conso augmentés de 0.1
	var i_TAS = KaTZPit_data["TAS"] + 0.1
	var i_Conso = KaTZPit_data["Conso"] / 100 + 1
	var i_Fuel_tot = (KaTZPit_data["Fuel_1"] + KaTZPit_data["Fuel_2"])/100
	
	i_time2wp = Math.min(KaTZPit_data["WP_dist"] / i_TAS * 3600, 5999)
	// ETA au WP (sec) = Heure actuelle (Clock) + Time2WP
	i_eta2wp = KaTZPit_data["Clock"] + i_time2wp
	// QNH@WP (altitude au WP en metres avec la pente actuelle)
	// QNH @^WP = QNH (m) + Vario (m/s)  * Time2WP (sec)
	i_qnhwp = Math.max(Math.min(KaTZPit_data["QNH"] + KaTZPit_data["Vario"] * i_time2wp,9999),0)
	
	// Calcul de la TAS_Eco en fonction de l'altitude QNH
	KaTZPit_data["TAS_Opt"]= Plane_data["TAS_eco"] + Plane_data["TAS_alt"] * KaTZPit_data["QNH"] / 1000
	// Calcul Fuel2WP (time2wp(sec) * conso (kg/mn) / 60 (sec/mn))
	i_fuel2wp = Math.min(i_time2wp * i_Conso / 60,9999)
	i_playtime = Math.min((i_Fuel_tot - i_fuel2wp)/i_Conso,999)
	
	
	// *****************************************************************************
	// Affichage -------------------------------------------------------------------
	// *****************************************************************************
	
	// Mode de Vol
	// Si mode de vol n'existe pas on renvoi "---"
	i_fl_mod = FL_data[KaTZPit_data["FL_mode"]] 
	if (typeof i_fl_mod == "undefined"){i_fl_mod = "---"}
	document.getElementById('FL_mode').innerHTML = i_fl_mod
	
	// Cap, N°WP, Direction WP, Relèvement Bulls (WP-180°), Direction Route
	document.getElementById('Cap').innerHTML = (360 - KaTZPit_data["Cap"]/10).toFixed(0)
	document.getElementById('Way').innerHTML = (360 - KaTZPit_data["Way"]/10).toFixed(0)
	KaTZPit_data["Bullseye"] = (360 - KaTZPit_data["Way"]/10 + 180) % 360
	document.getElementById('Bullseye').innerHTML = KaTZPit_data["Bullseye"].toFixed(0)
	document.getElementById('Route').innerHTML = (360 - KaTZPit_data["Route"]/10).toFixed(0)
	document.getElementById('WP_num').innerHTML = KaTZPit_data["WP_num"]
	
	
	// Donnée IAS, QNH
	// Sur tous les pits, les valeurs metriques et impériales sont affichées
	
	// IAS en "km/h" et en "kts"
	document.getElementById('IAS_km').innerHTML = (KaTZPit_data["IAS"]) .toFixed(0)
	document.getElementById('IAS_kt').innerHTML = (KaTZPit_data["IAS"] / 1.852).toFixed(0)
	document.getElementById('Mach').innerHTML = (KaTZPit_data["Mach"]/1000).toFixed(2)

	//QNH en "m" et en "feet"
	document.getElementById('QNH_m').innerHTML = KaTZPit_data["QNH"].toFixed(0)
	document.getElementById('QNH_f').innerHTML = (KaTZPit_data["QNH"]* 3.281).toFixed(0)
	
	
	// Données TAS, Variomètre, Distance
	// Les variables unités métriques/impériales sont converties suivant l'avion
	// Avant affichage

	if (Plane_data["ID"] == 15) {
		// TAS en kts
		document.getElementById('TAS').innerHTML = (KaTZPit_data["TAS"] / 1.852) .toFixed(0)
				
		// vario en pied/mn
		document.getElementById('Vario').innerHTML = (KaTZPit_data["Vario"] * 60 * 3.28084).toFixed(0)
		document.getElementById('QNH_WP').innerHTML = (i_qnhwp* 3.281).toFixed(0)
		
		document.getElementById('QFE').innerHTML = (KaTZPit_data["QFE"] * 3.281).toFixed(0)
		document.getElementById('WP_dist').innerHTML = (KaTZPit_data["WP_dist"] / 1.852).toFixed(0)
		document.getElementById('TAS_Opt').innerHTML = (KaTZPit_data["TAS_Opt"] / 1.852).toFixed(0)
		document.getElementById('Fuel_2_WP').innerHTML = (i_fuel2wp * 2.205).toFixed(0)
				
		} 
	
	else {
		document.getElementById('TAS').innerHTML = KaTZPit_data["TAS"].toFixed(0)
		
		// Variometre
		// Le parametre "vari_unit" permet de passer de "m/s" à "m/mn" avec la fonction NavMns()
		// Cette fonction  toggle des unités" est déclanchée, par le bouton sous l'affichage Vario
		var i_Vario = KaTZPit_data["Vario"] * KaTZPit_data["Vari_unit"]
		document.getElementById('Vario').innerHTML = i_Vario.toFixed(0)	
		document.getElementById('QNH_WP').innerHTML = i_qnhwp.toFixed(0)
		
		document.getElementById('QFE').innerHTML = KaTZPit_data["QFE"].toFixed(0)
		document.getElementById('WP_dist').innerHTML = KaTZPit_data["WP_dist"].toFixed(0)
		document.getElementById('TAS_Opt').innerHTML = KaTZPit_data["TAS_Opt"].toFixed(0)
		document.getElementById('Fuel_2_WP').innerHTML = i_fuel2wp.toFixed(0)
			
		}

	
	// Heure, Temps de Vol, Chrono ----------------------------------------------------
	KaTZPit_data["Chrono"] = KaTZPit_data["TimeMis"] - KaTZPit_data["Chrono_Start"]
	console.log (KaTZPit_data["Clock"])
	console.log (KaTZPit_data["Chrono_Start"])
	console.log (KaTZPit_data["Chrono"])
	
	
	
	// Pour les heures, Formatage fonction 0 >> hh:mm:ss 
	document.getElementById('Clock').innerHTML = time_format_0(KaTZPit_data["Clock"])
	document.getElementById('Time_Fly').innerHTML = time_format_0(KaTZPit_data["TimeFly"])
	// Pour les durées, Formatage fonction 1 >> h:m's" 
	document.getElementById('Chrono').innerHTML = time_format_1(KaTZPit_data["Chrono"])
		
	// Calculateur de Vol durées : Time2WP, ETA
	// Time2WP, Formatage en mn's"
	document.getElementById('Time_2_WP').innerHTML =  Math.floor(i_time2wp / 60) + "\'" + (i_time2wp % 60).toFixed(0)+"\""
	// Pour les heures, Formatage fonction 0 >> hh:mm:ss 
	document.getElementById('ETA').innerHTML = time_format_0(i_eta2wp)

	// Playtime, formatage en mn
	document.getElementById('Playtime').innerHTML = i_playtime.toFixed(0) + " mn"
	
	// Gestion des voyants ----------------------------------------------------------------------
	// Changement des unités Variometre	, affichage du bouton m/s ou m/mn
	if (KaTZPit_data["Vari_unit"] == 1) {$("#N_SW_mmn").fadeOut()} else {$("#N_SW_mmn").fadeIn()}
	
	// *****************************************************************************
	// Rotation du HSI -------------------------------------------------------------
	// *****************************************************************************
	var i_Cap = KaTZPit_data["Cap"]/10
	var i_Way = ((360 - KaTZPit_data["Way"]/10) + i_Cap) % 360
	var i_Route = ((360 - KaTZPit_data["Route"]/10) + i_Cap) % 360
	
	// Animation de l'index de Target (depuis panel target)
	if (KaTZPit_data["TGT_select"] == 1) {i_tgt = KaTZPit_data["T1_deg"]} 
	if (KaTZPit_data["TGT_select"] == 2) {i_tgt = KaTZPit_data["T2_deg"]} 
	if (KaTZPit_data["TGT_select"] == 3) {i_tgt = KaTZPit_data["T3_deg"]} 
	var i_tgt = (i_tgt + i_Cap) % 360

	// Rotation Aiguilles HSI, appel de la fonction
	Rotate_HSI(i_Cap, i_Way, i_Route,i_tgt)
	
}

// Rotation des flèches et rosace du HSI (Cap,WayPoint,Route)
function Rotate_HSI(cap,way,route,tgt){
	var a_origine = 0
	var a_gain = 1
	
	$("#AN_Rosace").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*cap)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*cap)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*cap)+'deg)',
	})

	$("#AN_Way").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*way)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*way)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*way)+'deg)',
	})

	$("#AN_Route").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*route)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*route)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*route)+'deg)',
	})

	$("#AN_TgT").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*tgt)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*tgt)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*tgt)+'deg)',
	})

}

function NavMns(){
	
	// Fonction Toggle de l'Affichage Variometre m/s ou m/mn
	if (KaTZPit_data["Vari_unit"] == 1) {KaTZPit_data["Vari_unit"] = 60	}

	else {KaTZPit_data["Vari_unit"] = 1}
	
}





	
