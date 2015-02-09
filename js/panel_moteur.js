// --------------------------------------------------------------------
// Panel Moteur RPM
// --------------------------------------------------------------------

function panel_moteur_update(KaTZPit_data){
	
	
	// Affichage des RPM sur les tachometres
	EngRpm = dataread_split_2(KaTZPit_data["Eng_rpm"])
	
	document.getElementById('RPM_L').innerHTML = (EngRpm[1]/10).toFixed(0)
	document.getElementById('RPM_R').innerHTML = (EngRpm[0]/10).toFixed(0)
	
	// Animation des jauges-----------------------------------------------------------------------
	// Rotation Aiguilles Moteur (origine et gain dans les fonctions)
	// Fonction RPM Russes # RPM US (F15)
	if (Plane_data["ID"] == 15) {
			Rotate_US_RPM((EngRpm[1]/10), (EngRpm[0]/10))
			}
	else {
			Rotate_RU_RPM((EngRpm[1]/10), (EngRpm[0]/10))
			}
			
			
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

function Rotate_RU_RPM(l,r){
	var a_origine = 45
	var l_gain = 3.1
	var r_gain = 3.1

	if (l>20) {l_gain = 3.2}
	if (l>40) {l_gain = 3.3}
	if (l>70) {l_gain = 3.22}
	if (l>80) {l_gain = 3.19}
	if (l>90) {l_gain = 3.15}
	if (l>100) {l_gain = 3.13}

	if (r>20) {r_gain = 3.2}
	if (r>40) {r_gain = 3.3}
	if (r>70) {r_gain = 3.22}
	if (r>80) {r_gain = 3.19}
	if (r>90) {r_gain = 3.15}
	if (r>100) {r_gain = 3.13}		

	$("#AM_RPM_L").css({
		'-moz-transform':'rotate('+(a_origine+l_gain*l)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+l_gain*l)+'deg)',
		'-ms-transform':'rotate('+(a_origine+l_gain*l)+'deg)',
	})

	$("#AM_RPM_R").css({
		'-moz-transform':'rotate('+(a_origine+r_gain*r)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+r_gain*r)+'deg)',
		'-ms-transform':'rotate('+(a_origine+r_gain*r)+'deg)',
	})
}

// Rotation des aiguilles moteurs (left, right), avions US
function Rotate_US_RPM(l,r){
	var a_origine = 56
	var l_gain = 2.2
	var r_gain = 2.2
	if (l>30) {l_gain = 2.25}
	if (l>60) {l_gain = 2.27}

	if (r>30) {r_gain = 2.25}
	if (r>60) {r_gain = 2.27}

	$("#AM_RPM_L").css({
		'-moz-transform':'rotate('+(a_origine+l_gain*l)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+l_gain*l)+'deg)',
		'-ms-transform':'rotate('+(a_origine+l_gain*l)+'deg)',
	})

	$("#AM_RPM_R").css({
		'-moz-transform':'rotate('+(a_origine+r_gain*r)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+r_gain*r)+'deg)',
		'-ms-transform':'rotate('+(a_origine+r_gain*r)+'deg)',
	})
}


	
