function panel_emergency_update(KaTZPit_data){

	// Gestion des Alarmes
	// Voyent Master warning
	if (KaTZPit_data["Master_Warn"] ==1) {$("#VE_Alarm").fadeIn()} else {$("#VE_Alarm").fadeOut()}
	
	
	// Debug
	// Affichage des Valeurs tests affichées sous le bouton marche
	var total_error = total_error + KaTZPit_data["Error"]
	document.getElementById('IP_Host').innerHTML = serverws.ip
	document.getElementById('IP_Port').innerHTML = serverws.port
	
	
}

	
