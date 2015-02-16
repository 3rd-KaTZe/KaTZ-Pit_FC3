// --------------------------------------------------------------------
// Panel Moteur RPM
// --------------------------------------------------------------------

function panel_moteur_update(KaTZPit_data){
	
	
	// Affichage des RPM sur les tachometres
	EngRpm = dataread_split_2(KaTZPit_data["Eng_rpm"])
	
	document.getElementById('RPM_L').innerHTML = (EngRpm[1]/10).toFixed(0)
	document.getElementById('RPM_R').innerHTML = (EngRpm[0]/10).toFixed(0)
	
	// Animation des jauges dans panel_instrument  ----------------------------------------------------------------
			
	// Gestion des voyants ----------------------------------------------------------------------		
	// Voyants du Panel Moteur
	// Extinction des Voyants Start-UP
	if (EngRpm[1] > 400 && KaTZPit_data["VM_Start_L"] ==1) {KaTZPit_data["VM_Start_L"]= 0}
	if (EngRpm[0] > 400 && KaTZPit_data["VM_Start_R"] ==1) {KaTZPit_data["VM_Start_R"]= 0}
	
	if (KaTZPit_data["VM_Start_L"] == 1) {$("#VM_Start_L").fadeIn()} else {$("#VM_Start_L").fadeOut()}
	if (KaTZPit_data["VM_Start_R"] == 1) {$("#VM_Start_R").fadeIn()} else {$("#VM_Start_R").fadeOut()}

	// Alarme Panne Moteur
	if (dataread_posit(KaTZPit_data["Alarm_Data"],2) == 1) {$("#VM_Fire_L").fadeIn()} else {$("#VM_Fire_L").fadeOut()}
	if (dataread_posit(KaTZPit_data["Alarm_Data"],1) == 1) {$("#VM_Fire_R").fadeIn()} else {$("#VM_Fire_R").fadeOut()}

	// Voyant Bingo Fuel , valeur dans le fichier Plane_init.js, fonction Plane_data
	if (KaTZPit_data["Fuel_1"] > Plane_data["Bingo"]) {$("#VM_Fuel_L").fadeOut()} else {$("#VM_Fuel_L").fadeIn()}
	if (KaTZPit_data["Fuel_1"] > Plane_data["Bingo"]) {$("#VM_Fuel_R").fadeOut()} else {$("#VM_Fuel_R").fadeIn()}
	
	// Voyant Post Combustion
	if (EngRpm[1] > 1000) {$("#VM_PC_L").fadeIn()} else {$("#VM_PC_L").fadeOut()}
	if (EngRpm[0] > 1000) {$("#VM_PC_R").fadeIn()} else {$("#VM_PC_R").fadeOut()}
}

// Rotation des aiguilles moteurs (left, right), avions Russes
// Le gain est ajusté pour faire correspondre 
// le placement de l'aiguille avec la valeur exacte



// Rotation des aiguilles moteurs (left, right), avions US



	
