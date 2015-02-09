// --------------------------------------------------------------------------------
// Panel ILS
// --------------------------------------------------------------------------------

function panel_ils_update(KaTZPit_data){

	if (Plane_data["ID"] == 15) {
		
		var i_IAS = (KaTZPit_data["IAS"]/1.852)
		var i_Vario = (KaTZPit_data["Vario"] * 60 * 3.28084) / 1000
		var i_QFE = (KaTZPit_data["QFE"] * 3.281)
		document.getElementById('Vario_ils').innerHTML = Math.min(i_Vario,99).toFixed(1)
		} 
	
	else {
		var i_IAS = KaTZPit_data["IAS"]
		var i_Vario = KaTZPit_data["Vario"]
		var i_QFE = KaTZPit_data["QFE"]
		document.getElementById('Vario_ils').innerHTML = Math.min(i_Vario,99).toFixed(0)
			
		}


	// Affichage des valeurs au dessus des jauges ---------------------------------------------
	document.getElementById('AoA').innerHTML = (KaTZPit_data["AoA"]/10).toFixed(0)
	document.getElementById('IAS_ils').innerHTML = Math.min(i_IAS / 100 , 9.9).toFixed(1)
	document.getElementById('QFE_ils').innerHTML = Math.min(i_QFE / 100 , 9.9).toFixed(1)
	
	// Repérage de la Piste sélectionnée par sa coordonnée X, prise dans la table RWY_data
	// Si x_coordonnée n'existe pas on renvoi "---"
	i_rwy_x = Math.abs(KaTZPit_data["Rwy_x"])
	i_rwy_txt = RWY_data[i_rwy_x] 
	if (typeof i_rwy_txt == "undefined"){i_rwy_txt = "---"}
	document.getElementById('Airport').innerHTML = i_rwy_txt
	
	// Animation des jauges---------------------------------------------------------------------
	// Croix ILS Up/Down et Latérale
	Translate_ILS(KaTZPit_data["ILS_up"],KaTZPit_data["ILS_lat"])
	
	// Silhouette Bank (idem Bank Indicator)

	// Jauges AoA, IAS, Vario, QFE
	// Calcul du %age de l'ionterval de variation défini dans plane spec.
	// Variation entre 0 et 100%
	j_AoA = Math.max(Math.min((KaTZPit_data["AoA"] - Plane_data["ILS_AoA_dwn"]) / (Plane_data["ILS_AoA_up"]-Plane_data["ILS_AoA_dwn"]),1),0)*100
	j_IAS = Math.max(Math.min((i_IAS - Plane_data["ILS_IAS_dwn"]) / (Plane_data["ILS_IAS_up"]-Plane_data["ILS_IAS_dwn"]),1),0)*100
	j_Var = Math.max(Math.min((i_Vario - Plane_data["ILS_Vario_dwn"]) / (Plane_data["ILS_Vario_up"]-Plane_data["ILS_Vario_dwn"]),1),0)*100
	j_QFE = Math.max(Math.min((i_QFE - Plane_data["ILS_QFE_dwn"]) / (Plane_data["ILS_QFE_up"]-Plane_data["ILS_QFE_dwn"]),1),0)*100
	Translate_jauge_ILS(j_AoA, j_IAS, j_Var, j_QFE)

	
	// Gestion des voyants ----------------------------------------------------------------------
	// Voyants de l'ILS
	if (KaTZPit_data["AoA"] < 100) {$("#VI_AoA").fadeIn()} else {$("#VI_AoA").fadeOut()}
	if (KaTZPit_data["IAS"] < 350 && KaTZPit_data["IAS"] > 250) {$("#VI_IAS").fadeIn()} else {$("#VI_IAS").fadeOut()}
	if (KaTZPit_data["Vario"] < 0 && KaTZPit_data["Vario"] > -10) {$("#VI_Vario").fadeIn()} else {$("#VI_Vario").fadeOut()}
	if (KaTZPit_data["QFE"] < 200) {$("#VI_QFE").fadeIn()} else {$("#VI_QFE").fadeOut()}

	// Calcul de croix ILS centrée (moins de 15% deviation up/down, et Latérale)
	if (Math.abs(KaTZPit_data["ILS_up"]) <15 && Math.abs(KaTZPit_data["ILS_lat"]) < 15) {$("#VI_Center").fadeIn()} else {$("#VI_Center").fadeOut()}

	
}

// Translation ILS Up/Down
function Translate_ILS(valup, valat){
	var a_origine = 0
	var a_gain = 0.75

	// valup : positif = Translation vers le bas , changement du signe DCS
	$("#IA_Up").css({
	'-moz-transform':'translate(0px,'+(a_origine - a_gain * valup)+'px)',
	'-webkit-transform':'translate(0px,'+(a_origine - a_gain * valup)+'px)',
	'-ms-transform':'translate(0px,'+(a_origine - a_gain * valup)+'px)',
	})

	// valat : positif = Translation vers la droite
	$("#IA_Lat").css({
	'-moz-transform':'translate('+(a_origine + a_gain * valat)+'px,0px)',
	'-webkit-transform':'translate('+(a_origine + a_gain * valat)+'px,0px)',
	'-ms-transform':'translate('+(a_origine + a_gain * valat)+'px,0px)',
	})

}

function Translate_jauge_ILS(aoa,ias,vario,qfe){
	var a_origine = 0
	var a_gain = -1.45
	
	$("#IA_aoa").css({

	// fonction de base >> '-moz-transform':'translate(100px,0px)',
	'-moz-transform':'translate(0px,'+(a_origine + a_gain * aoa)+'px)',
	'-webkit-transform':'translate(0px,'+(a_origine + a_gain * aoa)+'px)',
	'-ms-transform':'translate(0px,'+(a_origine + a_gain * aoa)+'px)',

	})
	
	$("#IA_ias").css({

	// fonction de base >> '-moz-transform':'translate(100px,0px)',
	'-moz-transform':'translate(0px,'+(a_origine + a_gain * ias)+'px)',
	'-webkit-transform':'translate(0px,'+(a_origine + a_gain * ias)+'px)',
	'-ms-transform':'translate(0px,'+(a_origine + a_gain * ias)+'px)',

	})
	
	$("#IA_var").css({

	// fonction de base >> '-moz-transform':'translate(100px,0px)',
	'-moz-transform':'translate(0px,'+(a_origine + a_gain * vario)+'px)',
	'-webkit-transform':'translate(0px,'+(a_origine + a_gain * vario)+'px)',
	'-ms-transform':'translate(0px,'+(a_origine + a_gain * vario)+'px)',

	})
	
	$("#IA_qfe").css({

	// fonction de base >> '-moz-transform':'translate(100px,0px)',
	'-moz-transform':'translate(0px,'+(a_origine + a_gain * qfe)+'px)',
	'-webkit-transform':'translate(0px,'+(a_origine + a_gain * qfe)+'px)',
	'-ms-transform':'translate(0px,'+(a_origine + a_gain * qfe)+'px)',

	})
}

	
