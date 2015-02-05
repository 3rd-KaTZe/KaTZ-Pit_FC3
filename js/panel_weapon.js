// --------------------------------------------------------------------------------
// Panel Weapon
// --------------------------------------------------------------------------------


function panel_weapon_update(KaTZPit_data){

	// Si le pylone selectionné change , on scan le weapon panel
	// et reset du flag KaTZPit_data["WPS_S_old"]
	if (KaTZPit_data["WPS_select"] != KaTZPit_data["WPS_S_old"]) {
		weapon_panel_scan()
		KaTZPit_data["WPS_S_old"] = KaTZPit_data["WPS_select"]
	}
	
	// Si le mode de vol change , on scan le weapon panel
	// et reset du flag KaTZPit_data["FL_main_old"]
	if (KaTZPit_data["FL_main"] != KaTZPit_data["FL_main_old"]) {
		weapon_panel_scan()
		KaTZPit_data["FL_main_old"] = KaTZPit_data["FL_main"]
	}
	
	//Si l'Ammo_checksum change on met à jour le panel weapon (pour soulager le programme)
	//Si l'Ammo_checksum change on lance le chrono de tir
	if (KaTZPit_data["WP_check"] > 0){
			weapon_panel_scan()
			KaTZPit_data["Shoot_time"] = KaTZPit_data["TimeMis"]
			
	}
	// Le flag KaTZPit_data["WP_check"] est remis à zero dans la subroutine weapon_panel_update()
	
	// Calcul de la durée depuis le dernier tir
	var i_shoot = KaTZPit_data["TimeMis"] - KaTZPit_data["Shoot_time"]
	// Plafonnée à 99 secondes
	
	document.getElementById('Shoot_time').innerHTML = Math.min(i_shoot, 99)
	//document.getElementById('Shoot_time').innerHTML = KaTZPit_data["WPS_select"]
	
	
}



function weapon_panel_scan(){

	// Procédure de scan du Panel-Weapon appelée depuis panel_weapon_update.js
	// La correspondance n°, pylone est faite dans le KaTZ-Pit.html
	// La valeur WPSx_Q donne la quantité d'ammo sur le pylone
	// Le container (pour les roquettes ou frag.) vaut 1000
	// donc utilisation de (%1000) modulo1000 pour la Q d'ammo
	// test = 1000 pour la présence d'un container vide

	// Allumage / Extinction des voyants
	// Par défaut les voyants sont éteints (init de [WPSx_S] à zero)
	
	// On test s'il y a encore une arme
	// Si oui, on affiche :
	// soit le voyant de selection (si mode combat)
	// soit le voyant full (vert)
	// soit la présence d'un reservoir
	
	
	
	
	if (KaTZPit_data["WPS1_Q"] == 0) {$("#VW_Pos1").fadeOut()} 
	else {
		$("#VW_Pos1").fadeIn()
		if (KaTZPit_data["WPS_select"] == 1 && KaTZPit_data["FL_main"]>1){$("#VW_Pos1").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos1").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS1_T"]< 2000000){$("#VW_Pos1").attr("src","images/weapon/W_TankOn.gif")}	
	}
		
	if (KaTZPit_data["WPS2_Q"] == 0) {$("#VW_Pos2").fadeOut()} 
	else {
		$("#VW_Pos2").fadeIn()
		if (KaTZPit_data["WPS_select"] == 2 && KaTZPit_data["FL_main"]>1){$("#VW_Pos2").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos2").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS2_T"]< 2000000){$("#VW_Pos2").attr("src","images/weapon/W_TankOn.gif")}
	}	
		
	if (KaTZPit_data["WPS3_Q"] == 0) {$("#VW_Pos3").fadeOut()} 
	else {
		$("#VW_Pos3").fadeIn()
		if (KaTZPit_data["WPS_select"] == 3 && KaTZPit_data["FL_main"]>1){$("#VW_Pos3").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos3").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS3_T"]< 2000000){$("#VW_Pos3").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS3_Q"] == 1000) {$("#VW_Pos3").attr("src","images/weapon/W_Vide.gif")}
	}
		
	if (KaTZPit_data["WPS4_Q"] == 0) {$("#VW_Pos4").fadeOut()} 
	else {
		$("#VW_Pos4").fadeIn()
		if (KaTZPit_data["WPS_select"] == 4 && KaTZPit_data["FL_main"]>1){$("#VW_Pos4").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos4").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS4_T"]< 2000000){$("#VW_Pos4").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS4_Q"] == 1000) {$("#VW_Pos4").attr("src","images/weapon/W_Vide.gif")}
	}

		
	if (KaTZPit_data["WPS5_Q"] == 0) {$("#VW_Pos5").fadeOut()} 
	else {
		$("#VW_Pos5").fadeIn()
		if (KaTZPit_data["WPS_select"] == 5 && KaTZPit_data["FL_main"]>1){$("#VW_Pos5").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos5").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS5_T"]< 2000000){$("#VW_Pos5").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS5_Q"] == 1000) {$("#VW_Pos5").attr("src","images/weapon/W_Vide.gif")}
	}

	
	if (KaTZPit_data["WPS6_Q"] == 0) {$("#VW_Pos6").fadeOut()} 
	else {
		$("#VW_Pos6").fadeIn()
		if (KaTZPit_data["WPS_select"] == 6 && KaTZPit_data["FL_main"]>1){$("#VW_Pos6").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos6").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS6_T"]< 2000000){$("#VW_Pos6").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS6_Q"] == 1000) {$("#VW_Pos6").attr("src","images/weapon/W_Vide.gif")}
	}
		
	if (KaTZPit_data["WPS7_Q"] == 0) {$("#VW_Pos7").fadeOut()} 
	else {
		$("#VW_Pos7").fadeIn()
		if (KaTZPit_data["WPS_select"] == 7 && KaTZPit_data["FL_main"]>1){$("#VW_Pos7").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos7").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS7_T"]< 2000000){$("#VW_Pos7").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS7_Q"] == 1000) {$("#VW_Pos7").attr("src","images/weapon/W_Vide.gif")}
	}	

	if (KaTZPit_data["WPS8_Q"] == 0) {$("#VW_Pos8").fadeOut()} 
	else {
		$("#VW_Pos8").fadeIn()
		if (KaTZPit_data["WPS_select"] == 8 && KaTZPit_data["FL_main"]>1){$("#VW_Pos8").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos8").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS8_T"]< 2000000){$("#VW_Pos8").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS8_Q"] == 1000) {$("#VW_Pos8").attr("src","images/weapon/W_Vide.gif")}
	}	

	if (KaTZPit_data["WPS9_Q"] == 0) {$("#VW_Pos9").fadeOut()} 
	else {
		$("#VW_Pos9").fadeIn()
		if (KaTZPit_data["WPS_select"] == 9 && KaTZPit_data["FL_main"]>1){$("#VW_Pos9").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos9").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS9_T"]< 2000000){$("#VW_Pos9").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS9_Q"] == 1000) {$("#VW_Pos9").attr("src","images/weapon/W_Vide.gif")}
	}	

	
	if (KaTZPit_data["WPS10_Q"] == 0) {$("#VW_Pos10").fadeOut()} 
	else {
		$("#VW_Pos10").fadeIn()
		if (KaTZPit_data["WPS_select"] == 10 && KaTZPit_data["FL_main"]>1){$("#VW_Pos10").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos10").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS10_T"]< 2000000){$("#VW_Pos10").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS10_Q"] == 1000) {$("#VW_Pos10").attr("src","images/weapon/W_Vide.gif")}
	}

	if (KaTZPit_data["WPS11_Q"] == 0) {$("#VW_Pos11").fadeOut()} 
	else {
		$("#VW_Pos11").fadeIn()
		if (KaTZPit_data["WPS_select"] == 11 && KaTZPit_data["FL_main"]>1){$("#VW_Pos11").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos11").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS11_T"]< 2000000){$("#VW_Pos11").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS11_Q"] == 1000) {$("#VW_Pos11").attr("src","images/weapon/W_Vide.gif")}
	}
	
	if (KaTZPit_data["WPS12_Q"] == 0) {$("#VW_Pos12").fadeOut()} 
	else {
		$("#VW_Pos12").fadeIn()
		if (KaTZPit_data["WPS_select"] == 12 && KaTZPit_data["FL_main"]>1){$("#VW_Pos12").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos12").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS12_T"]< 2000000){$("#VW_Pos12").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS12_Q"] == 1000) {$("#VW_Pos12").attr("src","images/weapon/W_Vide.gif")}
	}

	if (KaTZPit_data["WPS13_Q"] == 0) {$("#VW_Pos13").fadeOut()} 
	else {
		$("#VW_Pos13").fadeIn()
		if (KaTZPit_data["WPS_select"] == 13 && KaTZPit_data["FL_main"]>1){$("#VW_Pos13").attr("src","images/weapon/W_Select.gif")} 
		else {$("#VW_Pos13").attr("src","images/weapon/W_Full.gif")}
		if (KaTZPit_data["WPS13_T"]< 2000000){$("#VW_Pos13").attr("src","images/weapon/W_TankOn.gif")}
		if (KaTZPit_data["WPS13_Q"] == 1000) {$("#VW_Pos13").attr("src","images/weapon/W_Vide.gif")}
	}




	
		
	// Texte de quantité / type
	// On enlève la valeur 1000 pour le container éventuel
	document.getElementById('Typ_Pos1').innerHTML = Weapon_data[KaTZPit_data["WPS1_T"]]
	document.getElementById('Typ_Pos2').innerHTML = Weapon_data[KaTZPit_data["WPS2_T"]]
	document.getElementById('Qty_Pos3').innerHTML = (KaTZPit_data["WPS3_Q"] % 1000)
	document.getElementById('Typ_Pos3').innerHTML = Weapon_data[KaTZPit_data["WPS3_T"]]
	document.getElementById('Qty_Pos4').innerHTML = (KaTZPit_data["WPS4_Q"] % 1000)
	document.getElementById('Typ_Pos4').innerHTML = Weapon_data[KaTZPit_data["WPS4_T"]]
	document.getElementById('Qty_Pos5').innerHTML = (KaTZPit_data["WPS5_Q"] % 1000)
	document.getElementById('Typ_Pos5').innerHTML = Weapon_data[KaTZPit_data["WPS5_T"]]
	document.getElementById('Qty_Pos6').innerHTML = (KaTZPit_data["WPS6_Q"] % 1000)
	document.getElementById('Typ_Pos6').innerHTML = Weapon_data[KaTZPit_data["WPS6_T"]]
	document.getElementById('Qty_Pos7').innerHTML = (KaTZPit_data["WPS7_Q"] % 1000)
	document.getElementById('Typ_Pos7').innerHTML = Weapon_data[KaTZPit_data["WPS7_T"]]
	document.getElementById('Qty_Pos8').innerHTML = (KaTZPit_data["WPS8_Q"] % 1000)
	document.getElementById('Typ_Pos8').innerHTML = Weapon_data[KaTZPit_data["WPS8_T"]]
	document.getElementById('Qty_Pos9').innerHTML = (KaTZPit_data["WPS9_Q"] % 1000)
	document.getElementById('Typ_Pos9').innerHTML = Weapon_data[KaTZPit_data["WPS9_T"]]
	document.getElementById('Qty_Pos10').innerHTML = (KaTZPit_data["WPS10_Q"] % 1000)
	document.getElementById('Typ_Pos10').innerHTML = Weapon_data[KaTZPit_data["WPS10_T"]]
	document.getElementById('Qty_Pos11').innerHTML = (KaTZPit_data["WPS11_Q"] % 1000)
	document.getElementById('Typ_Pos11').innerHTML = Weapon_data[KaTZPit_data["WPS11_T"]]
	document.getElementById('Qty_Pos12').innerHTML = (KaTZPit_data["WPS12_Q"] % 1000)
	document.getElementById('Typ_Pos12').innerHTML = Weapon_data[KaTZPit_data["WPS12_T"]]
	document.getElementById('Qty_Pos13').innerHTML = (KaTZPit_data["WPS13_Q"] % 1000)
	document.getElementById('Typ_Pos13').innerHTML = Weapon_data[KaTZPit_data["WPS13_T"]]

	// Canon Ammo
	document.getElementById('Canon_Ammo').innerHTML = KaTZPit_data["Canon_Ammo"]
	
	// Remise a zéro du flag check-sum 
	KaTZPit_data["WP_check"] = 0
}

	
