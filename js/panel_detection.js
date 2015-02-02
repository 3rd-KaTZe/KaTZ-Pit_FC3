	// Panel Detection

function panel_detection_update(KaTZPit_data){

	// Gestion des voyants ----------------------------------------------------------------------
	// Radar, EOS, ECM failure
	if (KaTZPit_data["AL_Radar"] ==1) {$("#VD_Radar").fadeIn()} else {$("#VD_Radar").fadeOut()}
	if (KaTZPit_data["AL_EOS"] ==1) {$("#VD_EOS").fadeIn()} else {$("#VD_EOS").fadeOut()}
	if (KaTZPit_data["AL_ECM"] ==1) {$("#VD_ECM").fadeIn()} else {$("#VD_ECM").fadeOut()}	

}

	
