function panel_emergency_update(KaTZPit_data){

	// Gestion des Alarmes
	// Voyent Master warning
	if (KaTZPit_data["Master_Warn"] ==1) {$("#VE_Alarm").fadeIn()} else {$("#VE_Alarm").fadeOut()}
	if (KaTZPit_data["DCS_Focus"] ==2) {$("#Led_DCS").fadeIn()} else {$("#Led_DCS").fadeOut()}
	
		
}

	
