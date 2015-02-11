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
	
	instrument_G(KaTZPit_data["Acc_G"]/10,i_Gmin/10,i_Gmax/10)
	
	// AoA -----------------------------------------------------------------
	instrument_AoA(KaTZPit_data["AoA"]/10)

	// ADI ----------------------------------------------------------------
	// Affichage taux de roulis et inclinometre-----------------------------
	document.getElementById('Bank_val').innerHTML = Math.abs(KaTZPit_data["Bank"]/10).toFixed(0)
	
	// Affichage du Pitch - bleu en positif jaune en négatif-----------------
	var i_pitch = KaTZPit_data["Pitch"]/10
	
	if (i_pitch > 0){document.getElementById('Pitch_val').style.color = 'white'}
		else {document.getElementById('Pitch_val').style.color = '#FFFF7F'}
		
	document.getElementById('Pitch_val').innerHTML = i_pitch.toFixed(0)
	
	// Animation de l'ADI ----------------------------------------------------
	instrument_ADI(KaTZPit_data["Bank"]/10,KaTZPit_data["TxVirage"]/10,i_pitch)

}
	 





	
