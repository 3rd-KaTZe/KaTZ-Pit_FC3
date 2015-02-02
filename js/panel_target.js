// --------------------------------------------------------------------------------
// Panel Target
// --------------------------------------------------------------------------------

function panel_target_update(KaTZPit_data){

	// Gestion des valeurs affichées ----------------------------------------------
	
	// Calcul des Distances et Bearing des trois points mémorisés
	route1 = route_calc(KaTZPit_data["WP_dist"],KaTZPit_data["Bullseye"],KaTZPit_data["TGT1_km"],KaTZPit_data["TGT1_deg"]) 
	route2 = route_calc(KaTZPit_data["WP_dist"],KaTZPit_data["Bullseye"],KaTZPit_data["TGT2_km"],KaTZPit_data["TGT2_deg"]) 
	route3 = route_calc(KaTZPit_data["WP_dist"],KaTZPit_data["Bullseye"],KaTZPit_data["TGT3_km"],KaTZPit_data["TGT3_deg"]) 


	KaTZPit_data["T1_km"] = route1[0]
	KaTZPit_data["T1_deg"] = route1[1]
	KaTZPit_data["T2_km"] = route2[0]
	KaTZPit_data["T2_deg"] = route2[1]
	KaTZPit_data["T3_km"] = route3[0]
	KaTZPit_data["T3_deg"] = route3[1]

	// Affichage des Distances et Bearing par rapport à l'avion
	document.getElementById('T1_km').innerHTML = KaTZPit_data["T1_km"].toFixed(0)
	document.getElementById('T1_deg').innerHTML = KaTZPit_data["T1_deg"].toFixed(0)
	document.getElementById('T2_km').innerHTML = KaTZPit_data["T2_km"].toFixed(0)
	document.getElementById('T2_deg').innerHTML = KaTZPit_data["T2_deg"].toFixed(0)
	document.getElementById('T3_km').innerHTML = KaTZPit_data["T3_km"].toFixed(0)
	document.getElementById('T3_deg').innerHTML = KaTZPit_data["T3_deg"].toFixed(0)
	


	// Affichage des Distances et Bearing par rapport au BullsEye
	document.getElementById('TGT1_km').innerHTML = KaTZPit_data["TGT1_km"].toFixed(0)
	document.getElementById('TGT1_deg').innerHTML = KaTZPit_data["TGT1_deg"].toFixed(0)
	document.getElementById('TGT2_km').innerHTML = KaTZPit_data["TGT2_km"].toFixed(0)
	document.getElementById('TGT2_deg').innerHTML = KaTZPit_data["TGT2_deg"].toFixed(0)
	document.getElementById('TGT3_km').innerHTML = KaTZPit_data["TGT3_km"].toFixed(0)
	document.getElementById('TGT3_deg').innerHTML = KaTZPit_data["TGT3_deg"].toFixed(0)
	document.getElementById('TGT_keyin').innerHTML = KaTZPit_data["TGT_keyin"]
	
		

	// Gestion des voyants de selection de Target Point
	// Alarme si WP actuel <> du WP de référence
	
	if (KaTZPit_data["TGT_select"] ==1) {
		$("#VT_M1").fadeOut()
		if (KaTZPit_data["WP_num"] != KaTZPit_data["WPR1"]){$("#VT_W").fadeIn()} else {$("#VT_W").fadeOut()}
		document.getElementById('WP_Ref').innerHTML = KaTZPit_data["WPR1"]
	}
	else {$("#VT_M1").fadeIn()	
	}
	
	if (KaTZPit_data["TGT_select"] ==2) {
		$("#VT_M2").fadeOut()
		if (KaTZPit_data["WP_num"] != KaTZPit_data["WPR2"]){$("#VT_W").fadeIn()} else {$("#VT_W").fadeOut()}
		document.getElementById('WP_Ref').innerHTML = KaTZPit_data["WPR2"]		
	} 
	else {$("#VT_M2").fadeIn()
	}		
	
	if (KaTZPit_data["TGT_select"] ==3) {
		$("#VT_M3").fadeOut()
		if (KaTZPit_data["WP_num"] != KaTZPit_data["WPR3"]){$("#VT_W").fadeIn()} else {$("#VT_W").fadeOut()}	
		document.getElementById('WP_Ref').innerHTML = KaTZPit_data["WPR3"]
	} 
	else {$("#VT_M3").fadeIn()
	}	


}

function Tgt_Key(num){
	
	// Fonction de gestion du Panel Target 
	// Appelée depuis le pit.htlm, par mapping des touches
	//

	// Clavier de saisie des caps/distances
	// Entrée de chiffre 0 à 9
	if (num < 10) {
		var numero = num.toString()
		KaTZPit_data["TGT_keyin"] = KaTZPit_data["TGT_keyin"] + numero
		console.log(KaTZPit_data["TGT_keyin"])
	}

	// Touche entrée km + on enregistre le WP actif qui sert de référence
	if (num == 11) {
		var entre = Number(KaTZPit_data["TGT_keyin"]) 
		if (KaTZPit_data["TGT_select"]==1) {
			KaTZPit_data["TGT1_km"] = entre
			KaTZPit_data["WPR1"] = KaTZPit_data["WP_num"]
		}
		if (KaTZPit_data["TGT_select"]==2) {
			KaTZPit_data["TGT2_km"] = entre
			KaTZPit_data["WPR2"] = KaTZPit_data["WP_num"]
		}
		if (KaTZPit_data["TGT_select"]==3) {
			KaTZPit_data["TGT3_km"] = entre
			KaTZPit_data["WPR3"] = KaTZPit_data["WP_num"]
		}
		KaTZPit_data["TGT_keyin"]=""
		}

	// Touche entrée deg + on enregistre le WP actif qui sert de référence
	if (num == 12) {
		var entre = Number(KaTZPit_data["TGT_keyin"]) 
		if (KaTZPit_data["TGT_select"]==1) {
			KaTZPit_data["TGT1_deg"] = entre
			KaTZPit_data["WPR1"] = KaTZPit_data["WP_num"]
		}
		if (KaTZPit_data["TGT_select"]==2) {
			KaTZPit_data["TGT2_deg"] = entre
			KaTZPit_data["WPR2"] = KaTZPit_data["WP_num"]
		}
		if (KaTZPit_data["TGT_select"]==3) {
			KaTZPit_data["TGT3_deg"] = entre
			KaTZPit_data["WPR3"] = KaTZPit_data["WP_num"]
		}
		KaTZPit_data["TGT_keyin"]=""
		}

	// Selection du point actif
	// Touche selection 1
	if (num == 21) { KaTZPit_data["TGT_select"] = 1 }
    
    // Touche selection  2
	if (num == 22) { KaTZPit_data["TGT_select"] = 2 }

	// Touche selection  3
	if (num == 23) { KaTZPit_data["TGT_select"] = 3 }

    
	// Touche de mémorisation de la position actuelle 
    // Touche memorisation M1
	// + on enregistre le WP actif qui sert de référence
	if (num == 31) { 
		KaTZPit_data["TGT1_deg"] = KaTZPit_data["Bullseye"]
		KaTZPit_data["TGT1_km"] = KaTZPit_data["WP_dist"]
		KaTZPit_data["WPR1"] = KaTZPit_data["WP_num"]
		}

	// Touche memorisation  M2
	// + on enregistre le WP actif qui sert de référence
	if (num == 32) {
		KaTZPit_data["TGT2_deg"] = KaTZPit_data["Bullseye"]
		KaTZPit_data["TGT2_km"] = KaTZPit_data["WP_dist"]
		KaTZPit_data["WPR2"] = KaTZPit_data["WP_num"]
		}

	// Touche memorisation  M3
	// + on enregistre le WP actif qui sert de référence
	if (num == 33) {
		KaTZPit_data["TGT3_deg"] = KaTZPit_data["Bullseye"]
		KaTZPit_data["TGT3_km"] = KaTZPit_data["WP_dist"]
		KaTZPit_data["WPR3"] = KaTZPit_data["WP_num"]
		}
}


	
