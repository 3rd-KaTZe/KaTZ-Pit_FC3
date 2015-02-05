// --------------------------------------------------------------------
// Panel Fuel
// --------------------------------------------------------------------

function panel_fuel_update(KaTZPit_data){
	
	// Calculateur de consommation et d'autonomie ------------------------------------
	var i_Fuel_in = KaTZPit_data["Fuel_1"] / 100
	var i_Fuel_out = KaTZPit_data["Fuel_2"] / 100
	var i_Fuel_tot = i_Fuel_in + i_Fuel_out
	var i_Conso = KaTZPit_data["Conso"] / 100

	// TAC = Tactical (au régime moteur actuel)
	// Calcul d'autonomie Minutes = Kero (kg) / Conso (kg/mn/100)
	var i_Autono_mn = i_Fuel_tot / i_Conso
	document.getElementById('Range_mn').innerHTML = (i_Autono_mn).toFixed(0)
	
	// OPT = Optimale (au régime moteur Eco)
	// Calcul de la Consommation Eco en fonction de l'altitude QNH
	var i_Conso_eco = Plane_data["Conso_eco"] + Plane_data["Conso_alt"] * KaTZPit_data["QNH"] / 1000
	// Calcul Autonomie temps distance en fonction de l'altitude QNH
	var i_Autono_eco = i_Fuel_tot / i_Conso_eco
	// Distance Franchissable = TAS (km/hr) * Autonomie (mn) / 60
	var i_Range_eco = i_Autono_eco * KaTZPit_data["TAS_Opt"] / 60
	
		
	// Affichage quantites et consommation , range ----------------------------------------------
	// Avions US en livres

	if (Plane_data["ID"] == 15) { // Avion US : F15
		// Quantity en Livres
		document.getElementById('Fuel_i').innerHTML = ( i_Fuel_in * 2.205).toFixed(0)
		document.getElementById('Fuel_e').innerHTML = (i_Fuel_out * 2.205).toFixed(0)
		document.getElementById('Fuel_t').innerHTML = (i_Fuel_tot * 2.205).toFixed(0)
		document.getElementById('Conso').innerHTML = (i_Conso * 2.205).toFixed(0)
		// Range en Nautical Miles
		document.getElementById('Range_tac').innerHTML = (i_Autono_mn * KaTZPit_data["TAS"] / 60 / 1.852).toFixed(0)
		document.getElementById('Range_opttac').innerHTML = (i_Range_eco/1.852).toFixed(0)
		}

	else { // Avion Russe
		document.getElementById('Fuel_i').innerHTML = i_Fuel_in.toFixed(0)
		document.getElementById('Fuel_e').innerHTML = i_Fuel_out.toFixed(0)
		document.getElementById('Fuel_t').innerHTML = i_Fuel_tot.toFixed(0)
		document.getElementById('Conso').innerHTML = i_Conso.toFixed(0)
		
		document.getElementById('Range_tac').innerHTML = (i_Autono_mn * KaTZPit_data["TAS"] / 60 ).toFixed(0)	
		document.getElementById('Range_opttac').innerHTML = i_Range_eco.toFixed(0)
		}
	
	// Autonomie Eco en mn
	document.getElementById('Range_optmn').innerHTML = i_Autono_eco.toFixed(0)
	
	// Animation des jauges---------------------------------------------------------------------
	// Jauge Carburants
	// Calcul du %age de remplissage des réservoirs Fuel Interne / Externe
	// En fonction des données de spec. avion
	var i_Fuel_ipct = i_Fuel_in / Plane_data["Fuel_imax"]
	var i_Fuel_epct = i_Fuel_out / Plane_data["Fuel_emax"]

	// Appel de la fonction jauge
	Jauge_Fuel(i_Fuel_ipct,i_Fuel_epct)
	
	// Gestion des voyants ----------------------------------------------------------------------
	// Néant

}

// Jauge Carburant
function Jauge_Fuel(pct_i, pct_e){
	var a_origine = 0
	var a_gain = 5

	// Jauge Interne
	// On fixe l'origine du "scale down" en bas
	$("#FA_Gauge_Main").css({
	'-moz-transform-origin':'bottom left',
	'-webkit-transform-origin':'bottom left',
	'-ms-transform-origin':'bottom left',
	})

	// Scale down %age restant = hauteur barre orange
	$("#FA_Gauge_Main").css({
	'-moz-transform':'scaleY('+pct_i+')',
	'-webkit-transform':'scaleY('+pct_i+')',
	'-ms-transform':'scaleY('+pct_i+')',
	})

	// Jauge Externe, desactivée sur SU27, SU33

	if (Plane_data["ID"] == 27) {pct_e = 0}
	if (Plane_data["ID"] == 33) {pct_e = 0}

	// On fixe l'origine du "scale down" en bas
	$("#FA_Gauge_Tank").css({
	'-moz-transform-origin':'bottom left',
	'-webkit-transform-origin':'bottom left',
	'-ms-transform-origin':'bottom left',
	})

	// Scale down %age restant = hauteur barre orange
	$("#FA_Gauge_Tank").css({
	'-moz-transform':'scaleY('+pct_e+')',
	'-webkit-transform':'scaleY('+pct_e+')',
	'-ms-transform':'scaleY('+pct_e+')',
	})

}




	
