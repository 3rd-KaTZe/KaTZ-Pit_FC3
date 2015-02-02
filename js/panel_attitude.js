// --------------------------------------------------------------------
// Panel Attitude
// --------------------------------------------------------------------

function panel_attitude_update(KaTZPit_data){

	// Animation des jauges---------------------------------------------------------------------
	// G-Metre, calcul des G-Min et G-Max ---------------------------------
	// Test de comparaison G-Actuel avec G-min et G-max	 
	var i_Gmax = Math.max(KaTZPit_data["Acc_Gmax"],KaTZPit_data["Acc_G"])
	var i_Gmin = Math.min(KaTZPit_data["Acc_Gmin"],KaTZPit_data["Acc_G"])

	// Mise à jour des valeurs G-min et G-Max dans la base de données
	KaTZPit_data["Acc_Gmax"] = i_Gmax
	KaTZPit_data["Acc_Gmin"] = i_Gmin
	
	Rotate_G(KaTZPit_data["Acc_G"]/10,i_Gmin/10,i_Gmax/10)
	
	// AoA -----------------------------------------------------------------
	Rotate_AoA(KaTZPit_data["AoA"]/10)

	// Taux de virage ------------------------------------------------------
	Translate_Yaw(KaTZPit_data["TxVirage"]/10)
	
	// Affichage taux de roulis et inclinometre-----------------------------
	document.getElementById('Bank_val').innerHTML = Math.abs(KaTZPit_data["Bank"]/10).toFixed(0)
	Rotate_Bank(KaTZPit_data["Bank"]/10)
	
}
	 
// Aiguilles du G-mètre avec (valeur,min,max) --------------------------
function Rotate_G(val,min,max){
	var a_origine = 127
	var a_gain = -10
	
	$("#AA_G").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
	})

	$("#AA_Gmin").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
	})

	$("#AA_Gmax").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
	})
}

// Aiguille de l'indicateur d'AoA (valeur) ---------------------------------
function Rotate_AoA(val){
	var a_origine = 218
	var a_gain = 3.4
	
	$("#AA_AoA").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
	})
}

// Silhouette de l'indicateur de roulis (valeur) ---------------------------
function Rotate_Bank(val){
	var a_origine = 0
	var a_gain = 1

	$("#AA_Bank").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
	})

	$("#IA_Bank").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
	})
}

// Translation Yaw indicateur (valeur) -------------------------------------
// 34px pour 10 °/mn
function Translate_Yaw(val){
	var a_origine = 0
	var a_gain = 3.4
	
	$("#AA_Yaw").css({

	// fonction de base >> '-moz-transform':'translate(100px,0px)',
	'-moz-transform':'translate('+(a_origine + a_gain * val)+'px,0px)',
	'-webkit-transform':'translate('+(a_origine + a_gain * val)+'px,0px)',
	'-ms-transform':'translate('+(a_origine + a_gain * val)+'px,0px)',

	})
}

	
