// Panel AutoPilote

function panel_pilototo_update(KaTZPit_data){
	// Voyant Autopilote
	//Mode 1 = Follow Route
	//Mode 2 = Baro Hold
	//Mode 3 = Radio Hold
	//Mode 4 = Baro-Roll Hold
	//Mode 5 = Horizon Hold
	//Mode 6 = Pitch Bank Hold
	//Mode 9 = Off

	if (KaTZPit_data["AP_mode"] ==1) {$("#VP_Route").fadeIn()} else {$("#VP_Route").fadeOut()}	
	if (KaTZPit_data["AP_mode"] ==2) {$("#VP_QNH").fadeIn()} else {$("#VP_QNH").fadeOut()}
	if (KaTZPit_data["AP_mode"] ==2) {$("#VP_Autoalti").fadeIn()} else {$("#VP_Autoalti").fadeOut()}	
	if (KaTZPit_data["AP_mode"] ==3) {$("#VP_QFE").fadeIn()} else {$("#VP_QFE").fadeOut()}	
	if (KaTZPit_data["AP_mode"] ==4) {$("#VP_Turn").fadeIn()} else {$("#VP_Turn").fadeOut()}	
	if (KaTZPit_data["AP_mode"] ==5) {$("#VP_Flat").fadeIn()} else {$("#VP_Flat").fadeOut()}	
	if (KaTZPit_data["AP_mode"] ==6) {$("#VP_Pitch").fadeIn()} else {$("#VP_Pitch").fadeOut()}	
	if (KaTZPit_data["AP_mode"] ==9) {$("#VP_Autopilote").fadeOut()} else {$("#VP_Autopilote").fadeIn()}	

	if (dataread_posit(KaTZPit_data["Alarm_Data"],3) == 1) {$("#VP_Hydro").fadeIn()} else {$("#VP_Hydro").fadeOut()}


	// Voyant "Low Speed" / "Low Alt" / "Alarme AP"
	if (KaTZPit_data["IAS"] < Plane_data["IAS_low"]) {$("#VP_LowSpeed").fadeIn()} else {$("#VP_LowSpeed").fadeOut()}
	if (KaTZPit_data["QFE"] < Plane_data["QFE_low"]) {$("#VP_LowAlti").fadeIn()} else {$("#VP_LowAlti").fadeOut()}		
	if (dataread_posit(KaTZPit_data["Alarm_Data"],3) ==1) {$("#VP_FailAP").fadeIn()} else {$("#VP_FailAP").fadeOut()}		

	
}

	
