// --------------------------------------------------------------------
// Panel Attitude
// --------------------------------------------------------------------

function panel_attitude_update(KaTZPit_data){

		
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
	 





	
