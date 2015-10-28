// --------------------------------------------------------------------------------
// Panel Radio pour l'interface Universal Radio (Raiur)
// --------------------------------------------------------------------------------




// Les données switch sont stockées dans la variable URadio_SW:55550101

// 8- Selecteur On -Off  (0/1)
// 7- Criptage (0/1)
// 6- Selecteur UHF-VHF  (0/1)
// 5- Selecteur FM-AM   (0/1)
// 4- n° du Chan U (dizaine)
// 3- n° du Chan U (unit)
// 2- n° du Chan V (dizaine)
// 1- n° du Chan V (unit)

// et dans la variable URadio_SW1:555 (données spécifiques pour le F15)

// 3- VHF in UHF (0 = No, 1 = Yes)
// 2- Mode UHF
// 1- Mode VHF

// Les données de fréquence et volume sont stockées dans URadioU : 500500500, URadioV : 500500500 (fréquences actives)
// Les données de fréquence et volume sont stockées dans URadioUC : 500500500, URadioVC : 500500500 (fréquences canaux)
// Les données de fréquence et volume sont stockées dans URadioUM : 500500500, URadioVM : 500500500 (fréquences manuelles)
// lecture avec dataread_slip_3
// 0- Volume
// 1- Fréquence Decimal (Mode Manuel)
// 2- Fréquence Unitaire (Mode Manuel)

// "panel_radio_ru_update" affiche les rotacteurs, et lance la mise à jour "on" ou "off"
// "panel_radio_ru_on", affiche l'affichage 7 segments et les diodes
// "panel_radio_ru_off", éteind les dodes et les affichage 7 segments
// "Radio_ru_Selecteurs", positionne les selecteurs
// "Radio_Switch", Commande des selecteurs à bascule
// "Radio_Vol", Commande des changements de volume
// "Radio_Chan", Commande des changements de canaux
// "Radio_UR_Commande", envoi des messages à UR



function panel_radio_us_update(KaTZPit_data){

	// Mise à jour de l'affichage
	// Selecteur R1/0/R2 -----------------------------------------------
	var Display = dataread_posit(KaTZPit_data["URadio_SW1"],3)
		
	if (Display ==1) {	$("#R_DisFreq").attr('src','images/raiur_15/Switch_AF_up.png')	} 
	else if (Display ==2)  {$("#R_DisFreq").attr('src','images/raiur_15/Switch_AF_dn.png')} 
	else {$("#R_DisFreq").attr('src','images/raiur_15/Switch_AF_mid.png')} 
	
	// Selecteur AM FM (1=AM)-----------------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],5) ==1) {$("#R_AMFM").attr('src','images/raiur_15/Switch_AF_up.png')} else {$("#R_AMFM").attr('src','images/raiur_15/Switch_AF_dn.png')}

	// Rotacteur ON OFF -----------------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],8) ==1) {panel_radio_us_on(KaTZPit_data)} 	else {	panel_radio_us_off() }
	
	console.log("frequences UHF : ",KaTZPit_data["URadioU"] , ":" , KaTZPit_data["URadioUC"] , ";", KaTZPit_data["URadioUM"])
	console.log("frequences VHF : ",KaTZPit_data["URadioV"] , ":" , KaTZPit_data["URadioVC"], ";", KaTZPit_data["URadioVM"])
	

}

function panel_radio_us_off() {
	
	// Extinction des diodes
	$("#RU_V_Led").fadeOut()
	$("#RV_V_Led").fadeOut()
	$("#RU_J_Led").fadeOut()
	$("#RV_J_Led").fadeOut()
	
	
	
	// Extinction des 7Seg VHF
	$("#R_ChanVDigit10").fadeOut()
	$("#R_ChanVDigit1").fadeOut()
	
	$("#R_FreqVDigit100").fadeOut()
	$("#R_FreqVDigit10").fadeOut()
	$("#R_FreqVDigit1").fadeOut()
	$("#R_FreqVDigit-Point").fadeOut()
	$("#R_FreqVDigit-1").fadeOut()
	$("#R_FreqVDigit-10").fadeOut()
	
	
	
	
	// Récupération des valeurs de chan et de volume
	// Pour Rotation des selecteurs (On peut tourner les rotacteurs même panel éteint)
	Radio_us_Selecteurs(KaTZPit_data)
	Radio_us_FreqRotacteurs(KaTZPit_data)
	
	// Affichage des 7Seg sur selecteur a palette
	Radio_us_Afficheurs(KaTZPit_data)
	
	


}

function panel_radio_us_on(KaTZPit_data){

	// Allumage de la bonne diode UHF, VHF
	if (dataread_posit(KaTZPit_data["URadio_SW"],6) ==1){
	$("#RU_V_Led").fadeIn()
	$("#RV_V_Led").fadeOut()
	} 
	else {
	$("#RU_V_Led").fadeOut()
	$("#RV_V_Led").fadeIn()
	}
	
			
	// Allumage des 7Seg VHF
	$("#R_ChanVDigit10").fadeIn()
	$("#R_ChanVDigit1").fadeIn()
	$("#R_FreqVDigit100").fadeIn()
	$("#R_FreqVDigit10").fadeIn()
	$("#R_FreqVDigit1").fadeIn()
	$("#R_FreqVDigit-Point").fadeIn()
	$("#R_FreqVDigit-1").fadeIn()
	$("#R_FreqVDigit-10").fadeIn()
	
	// Affichage des 7Seg
	Radio_us_Afficheurs(KaTZPit_data)
	
	
	// Rotation des selecteurs
	Radio_us_Selecteurs(KaTZPit_data)
	Radio_us_FreqRotacteurs(KaTZPit_data)
		
}

function Radio_us_Afficheurs(KaTZPit_data){

	var ChanUD = (dataread_posit(KaTZPit_data["URadio_SW"],4)+5)
	var ChanUU = (dataread_posit(KaTZPit_data["URadio_SW"],3)+5)
	var ChanVD = (dataread_posit(KaTZPit_data["URadio_SW"],2)+5)
	var ChanVU = (dataread_posit(KaTZPit_data["URadio_SW"],1)+5)



switch (ChanUD){
	case 0:$("#R_ChanUDigit10").attr('src','images/raiur_15/Digit_SV_0.png'); break;
	case 1:$("#R_ChanUDigit10").attr('src','images/raiur_15/Digit_SV_1.png'); break;
	case 2:$("#R_ChanUDigit10").attr('src','images/raiur_15/Digit_SV_2.png'); break;
	}
	
	switch (ChanUU){
	case 0:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_0.png'); break;
	case 1:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_1.png'); break;
	case 2:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_2.png'); break;
	case 3:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_3.png'); break;
	case 4:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_4.png'); break;
	case 5:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_5.png'); break;
	case 6:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_6.png'); break;
	case 7:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_7.png'); break;
	case 8:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_8.png'); break;
	case 9:$("#R_ChanUDigit1").attr('src','images/raiur_15/Digit_SV_9.png'); break;
	}
	
	switch (ChanVD){
	case 0:$("#R_ChanVDigit10").attr('src','images/raiur_15/Digit_0.png'); break;
	case 1:$("#R_ChanVDigit10").attr('src','images/raiur_15/Digit_1.png'); break;
	case 2:$("#R_ChanVDigit10").attr('src','images/raiur_15/Digit_2.png'); break;
	}
	
	switch (ChanVU){
	case 0:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_0.png'); break;
	case 1:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_1.png'); break;
	case 2:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_2.png'); break;
	case 3:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_3.png'); break;
	case 4:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_4.png'); break;
	case 5:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_5.png'); break;
	case 6:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_6.png'); break;
	case 7:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_7.png'); break;
	case 8:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_8.png'); break;
	case 9:$("#R_ChanVDigit1").attr('src','images/raiur_15/Digit_9.png'); break;
	}
	
	
	
	// Valeurs des Fréquences
	// Decomposition en chiffre à afficher (5 par frequence)
	
	// Radio UHF
	var FreqU = (dataread_split_3P(KaTZPit_data["URadioUM"])[2])
	var FreqU10 = Math.floor(FreqU / 10)%10
	var FreqU100 = Math.floor(FreqU / 100)
	var FreqU1 = FreqU % 10
	var FreqUD =(dataread_split_3P(KaTZPit_data["URadioUM"])[1])
	var FreqUD100 = Math.floor(FreqUD / 100)
	var FreqUD1 = FreqUD % 100
	
	switch (FreqU100){
	case 2:$("#R_FreqUDigit100").attr('src','images/raiur_15/Digit_SV_2.png'); break;
	case 3:$("#R_FreqUDigit100").attr('src','images/raiur_15/Digit_SV_3.png'); break;
	}
	
	switch (FreqU10){
	case 0:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_0.png'); break;
	case 1:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_1.png'); break;
	case 2:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_2.png'); break;
	case 3:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_3.png'); break;
	case 4:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_4.png'); break;
	case 5:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_5.png'); break;
	case 6:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_6.png'); break;
	case 7:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_7.png'); break;
	case 8:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_8.png'); break;
	case 9:$("#R_FreqUDigit10").attr('src','images/raiur_15/Digit_SV_9.png'); break;
	}
	
	switch (FreqU1){
	case 0:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_0.png'); break;
	case 1:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_1.png'); break;
	case 2:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_2.png'); break;
	case 3:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_3.png'); break;
	case 4:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_4.png'); break;
	case 5:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_5.png'); break;
	case 6:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_6.png'); break;
	case 7:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_7.png'); break;
	case 8:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_8.png'); break;
	case 9:$("#R_FreqUDigit1").attr('src','images/raiur_15/Digit_SV_9.png'); break;
	}
	
	switch (FreqUD100){
	case 0:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_0.png'); break;
	case 1:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_1.png'); break;
	case 2:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_2.png'); break;
	case 3:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_3.png'); break;
	case 4:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_4.png'); break;
	case 5:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_5.png'); break;
	case 6:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_6.png'); break;
	case 7:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_7.png'); break;
	case 8:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_8.png'); break;
	case 9:$("#R_FreqUDigit-1").attr('src','images/raiur_15/Digit_SV_9.png'); break;
	}
	
	switch (FreqUD1){
	case 0:$("#R_FreqUDigit-10").attr('src','images/raiur_15/Digit_SV_00.png'); break;
	case 25:$("#R_FreqUDigit-10").attr('src','images/raiur_15/Digit_SV_25.png'); break;
	case 50:$("#R_FreqUDigit-10").attr('src','images/raiur_15/Digit_SV_50.png'); break;
	case 75:$("#R_FreqUDigit-10").attr('src','images/raiur_15/Digit_SV_75.png'); break;
	}
	
	
	// Radio VHF ou UHF2
	// En fonction de la position du selecteur R1/0/R2
	// Selecteur R1/0/R2 -----------------------------------------------
	var Display = dataread_posit(KaTZPit_data["URadio_SW1"],3)
	
	if (Display == 1){
		var FreqV = (dataread_split_3P(KaTZPit_data["URadioUC"])[2])
		var FreqVD =(dataread_split_3P(KaTZPit_data["URadioUC"])[1])
	}
	else if (Display == 2){
		var FreqV = (dataread_split_3P(KaTZPit_data["URadioVC"])[2])
		var FreqVD =(dataread_split_3P(KaTZPit_data["URadioVC"])[1])
	}
	else {
		var FreqV = (dataread_split_3P(KaTZPit_data["URadioVM"])[2])
		var FreqVD =(dataread_split_3P(KaTZPit_data["URadioVM"])[1])
	}
	
	var FreqV10 = Math.floor(FreqV / 10)%10
	var FreqV100 = Math.floor(FreqV / 100)
	var FreqV1 = FreqV % 10
	var FreqVD100 = Math.floor(FreqVD / 100)
	var FreqVD1 = FreqVD % 100
	
	switch (FreqV100){
	case 1:$("#R_FreqVDigit100").attr('src','images/raiur_15/Digit_1.png'); break;
	case 2:$("#R_FreqVDigit100").attr('src','images/raiur_15/Digit_2.png'); break;
	case 3:$("#R_FreqVDigit100").attr('src','images/raiur_15/Digit_3.png'); break;
	}
	
	switch (FreqV10){
	case 0:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_0.png'); break;
	case 1:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_1.png'); break;
	case 2:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_2.png'); break;
	case 3:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_3.png'); break;
	case 4:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_4.png'); break;
	case 5:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_5.png'); break;
	case 6:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_6.png'); break;
	case 7:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_7.png'); break;
	case 8:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_8.png'); break;
	case 9:$("#R_FreqVDigit10").attr('src','images/raiur_15/Digit_9.png'); break;
	}
	
	switch (FreqV1){
	case 0:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_0.png'); break;
	case 1:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_1.png'); break;
	case 2:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_2.png'); break;
	case 3:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_3.png'); break;
	case 4:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_4.png'); break;
	case 5:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_5.png'); break;
	case 6:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_6.png'); break;
	case 7:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_7.png'); break;
	case 8:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_8.png'); break;
	case 9:$("#R_FreqVDigit1").attr('src','images/raiur_15/Digit_9.png'); break;
	}
	
	switch (FreqVD100){
	case 0:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_0.png'); break;
	case 1:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_1.png'); break;
	case 2:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_2.png'); break;
	case 3:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_3.png'); break;
	case 4:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_4.png'); break;
	case 5:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_5.png'); break;
	case 6:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_6.png'); break;
	case 7:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_7.png'); break;
	case 8:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_8.png'); break;
	case 9:$("#R_FreqVDigit-1").attr('src','images/raiur_15/Digit_9.png'); break;
	}
	
	switch (FreqVD1){
	case 0:$("#R_FreqVDigit-10").attr('src','images/raiur_15/Digit_00.png'); break;
	case 25:$("#R_FreqVDigit-10").attr('src','images/raiur_15/Digit_25.png'); break;
	case 50:$("#R_FreqVDigit-10").attr('src','images/raiur_15/Digit_50.png'); break;
	case 75:$("#R_FreqVDigit-10").attr('src','images/raiur_15/Digit_75.png'); break;
	}

}

function Radio_us_Selecteurs(KaTZPit_data){

	// Position des selecteurs rotatifs
	var main = dataread_posit(KaTZPit_data["URadio_SW"],8)
	var modeV = dataread_posit(KaTZPit_data["URadio_SW1"],1)
	var modeU = dataread_posit(KaTZPit_data["URadio_SW1"],2)
	var cript = dataread_posit(KaTZPit_data["URadio_SW"],7)
	var volV = (dataread_split_3P(KaTZPit_data["URadioV"])[0])
	var volU = (dataread_split_3P(KaTZPit_data["URadioU"])[0])
	
	var ChanUD = (dataread_posit(KaTZPit_data["URadio_SW"],4)+5)
	var ChanUU = (dataread_posit(KaTZPit_data["URadio_SW"],3)+5)
	var ChanVD = (dataread_posit(KaTZPit_data["URadio_SW"],2)+5)
	var ChanVU = (dataread_posit(KaTZPit_data["URadio_SW"],1)+5)
	var chanV = ChanVD * 10 + ChanVU
	var chanU = ChanUD * 10 + ChanUU
	
	
	// Selecteur Off/Main/Both
	var o_origine = -45
	var o_gain = 45
	
	$("#R_onoff").css({
		'-moz-transform':'rotate('+(o_origine+o_gain*main)+'deg)',
		'-webkit-transform':'rotate('+(o_origine+o_gain*main)+'deg)',
		'-ms-transform':'rotate('+(o_origine+o_gain*main)+'deg)',
	})
	
	// Selecteur Criptage
	$("#R_crad").css({
		'-moz-transform':'rotate('+(o_origine+o_gain*cript)+'deg)',
		'-webkit-transform':'rotate('+(o_origine+o_gain*cript)+'deg)',
		'-ms-transform':'rotate('+(o_origine+o_gain*cript)+'deg)',
	})
	
	
	
	
	// Selecteur Mode Uhf, Vhf
	var m_origine = -60
	var m_gain = 60
	
	$("#R_ModeUhf").css({
		'-moz-transform':'rotate('+(m_origine+m_gain*modeU)+'deg)',
		'-webkit-transform':'rotate('+(m_origine+m_gain*modeU)+'deg)',
		'-ms-transform':'rotate('+(m_origine+m_gain*modeU)+'deg)',
	})
	
	$("#R_ModeVhf").css({
		'-moz-transform':'rotate('+(m_origine+m_gain*modeV)+'deg)',
		'-webkit-transform':'rotate('+(m_origine+m_gain*modeV)+'deg)',
		'-ms-transform':'rotate('+(m_origine+m_gain*modeV)+'deg)',
	})

	// Rotacteurs de Volume
	var v_origine = -135
	var v_gain = 2.7
	
	$("#R_VolUhf").css({
		'-moz-transform':'rotate('+(v_origine+v_gain*volU)+'deg)',
		'-webkit-transform':'rotate('+(v_origine+v_gain*volU)+'deg)',
		'-ms-transform':'rotate('+(v_origine+v_gain*volU)+'deg)',
	})
	
	$("#R_VolVhf").css({
		'-moz-transform':'rotate('+(v_origine+v_gain*volV)+'deg)',
		'-webkit-transform':'rotate('+(v_origine+v_gain*volV)+'deg)',
		'-ms-transform':'rotate('+(v_origine+v_gain*volV)+'deg)',
	})
	
	
	// Rotacteurs de Chan UHF VHF
	var c_origine = 10
	var c_gain = 18.0
	
	$("#R_ChanUhf").css({
		'-moz-transform':'rotate('+(c_origine+c_gain*chanU)+'deg)',
		'-webkit-transform':'rotate('+(c_origine+c_gain*chanU)+'deg)',
		'-ms-transform':'rotate('+(c_origine+c_gain*chanU)+'deg)',
	})
	
	$("#R_ChanVhf").css({
		'-moz-transform':'rotate('+(c_origine+c_gain*chanV)+'deg)',
		'-webkit-transform':'rotate('+(c_origine+c_gain*chanV)+'deg)',
		'-ms-transform':'rotate('+(c_origine+c_gain*chanV)+'deg)',
	})


}

function Radio_us_FreqRotacteurs(KaTZPit_data){

	// Ajustement du départ de chaque bouton avec l'ajout de 2 à 5
	var btn1 = dataread_posit(KaTZPit_data["URadio_Rot"],6)+5
	var btn2 = dataread_posit(KaTZPit_data["URadio_Rot"],5)+2
	var btn3 = dataread_posit(KaTZPit_data["URadio_Rot"],4)+2
	var btn4 = dataread_posit(KaTZPit_data["URadio_Rot"],3)+5
	var btn5 = dataread_posit(KaTZPit_data["URadio_Rot"],2)+2
	var btn6 = dataread_posit(KaTZPit_data["URadio_Rot"],1)+2
	

	// Selecteur Uhf/Vhf
	var r_origine = 10
	var r_gain = 18
	
	$("#R_FreqUhf100").css({
		'-moz-transform':'rotate('+(r_origine+r_gain*btn1)+'deg)',
		'-webkit-transform':'rotate('+(r_origine+r_gain*btn1)+'deg)',
		'-ms-transform':'rotate('+(r_origine+r_gain*btn1)+'deg)',
	})
	
	$("#R_FreqUhf1").css({
		'-moz-transform':'rotate('+(r_origine+r_gain*btn2)+'deg)',
		'-webkit-transform':'rotate('+(r_origine+r_gain*btn2)+'deg)',
		'-ms-transform':'rotate('+(r_origine+r_gain*btn2)+'deg)',
	})
	
	$("#R_FreqUhf-1").css({
		'-moz-transform':'rotate('+(r_origine+r_gain*btn3)+'deg)',
		'-webkit-transform':'rotate('+(r_origine+r_gain*btn3)+'deg)',
		'-ms-transform':'rotate('+(r_origine+r_gain*btn3)+'deg)',
	})
	
	$("#R_FreqVhf100").css({
		'-moz-transform':'rotate('+(r_origine+r_gain*btn4)+'deg)',
		'-webkit-transform':'rotate('+(r_origine+r_gain*btn4)+'deg)',
		'-ms-transform':'rotate('+(r_origine+r_gain*btn4)+'deg)',
	})
	
	$("#R_FreqVhf1").css({
		'-moz-transform':'rotate('+(r_origine+r_gain*btn5)+'deg)',
		'-webkit-transform':'rotate('+(r_origine+r_gain*btn5)+'deg)',
		'-ms-transform':'rotate('+(r_origine+r_gain*btn5)+'deg)',
	})
	
	$("#R_FreqVhf-1").css({
		'-moz-transform':'rotate('+(r_origine+r_gain*btn6)+'deg)',
		'-webkit-transform':'rotate('+(r_origine+r_gain*btn6)+'deg)',
		'-ms-transform':'rotate('+(r_origine+r_gain*btn6)+'deg)',
	})




}

function Radio_Switch(digit,value){


	//console.log(digit,value)
	// Commande des switches de la radio
	// On vérifie si le switch a bougé
	var old_value = dataread_posit(KaTZPit_data["URadio_SW"],digit)
	// console.log(digit,value)
	
	// Si changement, mise à jour
	if (old_value != value){
		// On modifie les variables : KaTZPit_data["URadio_SW"]
		// digit = chiffre à changer
		// value = valeur à insérer
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],value+5,digit);

		// Mise à jour de l'affichage
		panel_radio_us_update(KaTZPit_data)
		
		// Si le switch AM/FM a été activé, on envoie à UR la commande de chan
		if (digit == 5) {Radio_US_Commande("C");}

		// Si le switch UHF/VHF a été activé, on envoie à UR la commande de X active
		if (digit == 6) {Radio_US_Commande("X")}
		
		// Switch d'encriptage, on envoie à UR la commande de chan
		if (digit == 7) {Radio_US_Commande("C");}
		
		// Si le switch On/Off a été activé, on envoie à UR l'intégralité des positions, ou tout à zero
		// Chargement des fréquences active via Radio Mode (0 incrément)
		// Envoi à UR de l'intégralité des positions
		if (digit == 8) {if (value == 1){
			
			//Syntonisation des Canaux
			Radio_Channel(0,0)
			Radio_Channel(1,0)
			
			Radio_Mode(1,0)
			Radio_Mode(2,0)
			
			Radio_Channel(0,0)
			Radio_Channel(1,0)
					
			Radio_US_Commande("C");Radio_US_Commande("X");Radio_US_Commande("V")} else {Radio_US_Commande("OFF")}}

	}

}

function Radio_Switch1(digit,value){

	// On vérifie si le switch a bougé
	var old_value = dataread_posit(KaTZPit_data["URadio_SW1"],digit)
		
	// Si changement, mise à jour
	if (old_value != value){
		// On modifie les variables : KaTZPit_data["URadio_SW1"]
		// digit = chiffre à changer
		// value = valeur à insérer
		KaTZPit_data["URadio_SW1"] = datachange_posit(KaTZPit_data["URadio_SW1"],value+5,digit);
		
		// Si le switch VHF/UHF2 a été activé, on envoie à UR la commande de chan
		// Le switch VHF/UHF2 va conditionner l'affichage de fréquence sur la bande VHF
		if (digit == 3) {
			//Mise à jour de la fréquence manuelle
			// Faire tourner la subroutine Freq avec valeur de changement zero
			//Radio_FreqV(1,0)
		}
		
		Radio_US_Commande("C");
		
		
		// Mise à jour de l'affichage
		panel_radio_us_update(KaTZPit_data)
		
	}

}

function Radio_Mode(digit,sens){

	// Commande des rotacteurs de mode VHF, et UHF
	// On modifie les variables dans KaTZPit_data["URadio_SW1"] 1 pour VHF , et 2 pour UHF
	// sens = incrément ou decrément (1 ou -1)

	// Récupération des valeurs de mode
	var modV = dataread_posit(KaTZPit_data["URadio_SW1"],1)
	var modU = dataread_posit(KaTZPit_data["URadio_SW1"],2)
	
	if (digit == 2){
		
		modU = modU + sens
		// si modU > 2 ou < 0 , on ne fait rien, le bouton était déjà au maxi, ou mini

		if (modU == 0){
			// Mode Manuel
			// Mise à jour de la variable des switches
			KaTZPit_data["URadio_SW1"] = datachange_posit(KaTZPit_data["URadio_SW1"],5,2);
			// Stockage de la valeur freq manuelle, dans la frequence active
			KaTZPit_data["URadioU"] = KaTZPit_data["URadioUM"]
			// Envoi à UR de la valeur
			Radio_US_Commande("C")
		}
		
		if (modU == 1){
			// Mode Channel
			// Mise à jour de la variable des switches
			KaTZPit_data["URadio_SW1"] = datachange_posit(KaTZPit_data["URadio_SW1"],6,2);
			// Stockage de la valeur freq auto, dans la frequence active
			KaTZPit_data["URadioU"] = KaTZPit_data["URadioUC"]
						
			// Envoi à UR de la valeur
			Radio_US_Commande("C")
		}
		
		if (modU == 2){
			// Mode Guard
			// Mise à jour de la variable des switches
			KaTZPit_data["URadio_SW1"] = datachange_posit(KaTZPit_data["URadio_SW1"],7,2);
			// Stockage de la valeur freq guard, dans la frequence active
			var FreqU = 243000
			var volU = (dataread_split_3P(KaTZPit_data["URadioU"])[0])
			KaTZPit_data["URadioU"] = FreqU * 1000 + volU
			
			// Passage de la radio en "AM"
			//KaTZPit_data["URadio_SW1"] = datachange_posit(KaTZPit_data["URadio_SW"],5,1);
			
				
			// Envoi à UR de la valeur
			Radio_US_Commande("C")
		}
			
	}

	else {
		
		modV = modV + sens

		if (modV == 0){
			// Mode Manuel
			// Mise à jour de la variable des switches
			KaTZPit_data["URadio_SW1"] = datachange_posit(KaTZPit_data["URadio_SW1"],5,1);
			// Stockage de la valeur freq manuelle, dans la frequence active
			KaTZPit_data["URadioV"] = KaTZPit_data["URadioVM"]
			// Envoi à UR de la valeur
			Radio_US_Commande("C")
		}
		
		if (modV == 1){
			// Mode Channel
			// Mise à jour de la variable des switches
			KaTZPit_data["URadio_SW1"] = datachange_posit(KaTZPit_data["URadio_SW1"],6,1);
			// Stockage de la valeur freq canal, dans la frequence active
			KaTZPit_data["URadioV"] = KaTZPit_data["URadioVC"]
			
			// Envoi à UR de la valeur
			Radio_US_Commande("C")
		}
		
		if (modV == 2){
			// Mode Guard
			// Mise à jour de la variable des switches
			KaTZPit_data["URadio_SW1"] = datachange_posit(KaTZPit_data["URadio_SW1"],7,1);
			// Stockage de la valeur freq guard, dans la frequence active
			var FreqV = 121500
			var volV = (dataread_split_3P(KaTZPit_data["URadioV"])[0])
			KaTZPit_data["URadioV"] = FreqV * 1000 + volV
			
			// Passage de la radio en "AM"
			//KaTZPit_data["URadio_SW1"] = datachange_posit(KaTZPit_data["URadio_SW"],5,1);
			
			
				
			// Envoi à UR de la valeur
			Radio_US_Commande("C")
		}
	}
	
	// Mise à jour de l'affichage
	panel_radio_us_update(KaTZPit_data)

}

function Radio_Channel(radio,sens){

	// Commande des canaux radio
	// On modifie les variables : KaTZPit_data["URadio_SW"]
	// radio = 1 (UHF) , 2 (VHF)
	// sens = -1 , +1 incrément ou decrément


	var ChanUD = (dataread_posit(KaTZPit_data["URadio_SW"],4)+5)
	var ChanUU = (dataread_posit(KaTZPit_data["URadio_SW"],3)+5)
	var ChanVD = (dataread_posit(KaTZPit_data["URadio_SW"],2)+5)
	var ChanVU = (dataread_posit(KaTZPit_data["URadio_SW"],1)+5)
	var chanV = ChanVD * 10 + ChanVU
	var chanU = ChanUD * 10 + ChanUU

	if (radio == 1){
		chanU = chanU + sens;
		if (chanU > 20) {chanU = 1};
		if (chanU < 1) {chanU = 20};
		ChanUD = Math.floor(chanU/10);
		ChanUU = chanU % 10;
		// Mise à jour dans la variable de valeur de canal
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanUD,4);
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanUU,3);
		
		// Mise à jour de la fréquence canal
		var ChannelU = "CHANNEL" + ChanUD + ChanUU	
		var FreqU = Radio2[ChannelU]
		var volU = (dataread_split_3P(KaTZPit_data["URadioU"])[0])
		// Stockage de la valeur freq canal, dans la frequence active
		KaTZPit_data["URadioUC"] = FreqU * 1000 + volU
		
		// Message UR si on est en mode Channel
		if (dataread_posit(KaTZPit_data["URadio_SW1"],2)==1){
			// Chargement de la fréquence canal en dans la fréquence active
			KaTZPit_data["URadioU"] = KaTZPit_data["URadioUC"]
			Radio_US_Commande("C")
		}
		
	}


	else {
		chanV = chanV + sens;
		if (chanV > 20) {chanV = 1};
		if (chanV < 1) {chanV = 20};
		ChanVD = Math.floor(chanV/10);
		ChanVU = chanV % 10;
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanVD,2);
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanVU,1);
		
		// Constitution des Numéros de Canaux, suivant le format des deux tables canaux <> fréquences
		var ChannelV = "CHANNEL" + ChanVD + ChanVU	
		// Fréquence des Canaux (unitaire/décimale)
		var FreqV = Radio1[ChannelV]
		var volV = (dataread_split_3P(KaTZPit_data["URadioV"])[0])
			
		// Stockage de la valeur freq canal, dans la frequence canal
		KaTZPit_data["URadioVC"] = FreqV * 1000 + volV
		
		
		// Si on est en mode Channel
		if (dataread_posit(KaTZPit_data["URadio_SW1"],1)==1){
			// Chargement de la fréquence canal en dans la fréquence active
			KaTZPit_data["URadioV"] = KaTZPit_data["URadioVC"]
			Radio_US_Commande("C")
		}
	}

	// Mise à jour de l'affichage
	panel_radio_us_update(KaTZPit_data)
	
			
}

function Radio_Volume(vol,sens){

// Commande des rotacteurs de volume
// On modifie les variables : KaTZPit_data["URadioV"] et KaTZPit_data["URadioU"]
// sens = incrément ou decrément (1 ou -1)

// Récupération des valeurs de volume
	var volV = (dataread_split_3P(KaTZPit_data["URadioV"])[0])
	var volU = (dataread_split_3P(KaTZPit_data["URadioU"])[0])
	
	if (vol == 0){
		// Volume UHF, incrément/decrément de 10
		volU = volU + 10 * sens
		// si volU > 100 ou < 0 , on ne fait rien, le bouton était déjà au maxi, ou mini
		if (volU <=100 && volU >=0) {
			// Ecriture de la valeur dans le code fffdddvvv
			KaTZPit_data["URadioU"] = (Math.floor((KaTZPit_data["URadioU"])/1000)) * 1000 + volU
			// Ecriture de la valeur également dans la variable Fréquence Manuel
			KaTZPit_data["URadioUM"] = (Math.floor((KaTZPit_data["URadioUM"])/1000)) * 1000 + volU
			// Ecriture de la valeur également dans la variable Fréquence Canal
			KaTZPit_data["URadioUC"] = (Math.floor((KaTZPit_data["URadioUC"])/1000)) * 1000 + volU
			
			Radio_US_Commande("V")
		}
	}

	else {
		// Volume VHF, incrément/decrément de 10
		volV = volV + 10 * sens

		if (volV <=100 && volV >=0) {
			KaTZPit_data["URadioV"] = (Math.floor((KaTZPit_data["URadioV"])/1000)) * 1000 + volV
			KaTZPit_data["URadioVM"] = (Math.floor((KaTZPit_data["URadioVM"])/1000)) * 1000 + volV
			KaTZPit_data["URadioVC"] = (Math.floor((KaTZPit_data["URadioVC"])/1000)) * 1000 + volV
			Radio_US_Commande("V")
		}
	}
	
	// Mise à jour de l'affichage
	panel_radio_us_update(KaTZPit_data)
}

function Radio_FreqU(digit,sens){
	
	// Les fréquences manuelles sont stockées dans les variables URadioVM et URadioUM
	// sous forme fffdddvvv, on transférera cet affichage dans les variables
	// URadioV et URadioU, lors de la syntonisation.
	// fff = fréquence unitaire
	// ddd = fréquence décimale
	// vvv = volume de réception
	// Valeur positive 0-999 (fonction "dataread_split_3P")
	
	
	var volU = (dataread_split_3P(KaTZPit_data["URadioUM"])[0])
	
	var FreqU = (dataread_split_3P(KaTZPit_data["URadioUM"])[2])
	var FreqU10 = Math.floor(FreqU / 10)
	var FreqU1 = FreqU % 10
	var FreqUD =(dataread_split_3P(KaTZPit_data["URadioUM"])[1])
	
	// Gestion de la fréquence manuelle UHF --------------------------------------------------
	
	if (digit == 1){
		// Frequence Dizaine UHF, incrément/decrément de 10
		FreqU10 = FreqU10 + sens
		
		// encadrement de la fréquence UHF (225 , 400)
		// si FreqU10 > 40 ou < 22 , on cycle le rotacteur, on était déjà au maxi, ou mini
		if (FreqU10 >39) {FreqU10=22}
		if (FreqU10 <22) {FreqU10=39}
		FreqU = FreqU10 * 10 + FreqU1
		
		// Calcul de la position du rotacteur de frequence
		var btn = dataread_posit(KaTZPit_data["URadio_Rot"],6)+5
		btn = (10 + btn + sens)%10
		KaTZPit_data["URadio_Rot"]= datachange_posit(KaTZPit_data["URadio_Rot"],btn,6)
		
		
	
	}
	
	if (digit == 2){
		// Frequence Unitaire UHF, incrément/decrément de 1
		FreqU1 = FreqU1 + sens
		
		// Bornage 0 à 9 , cyclage du rotactor
		if (FreqU1 > 9) {FreqU1 = 0};
		if (FreqU1 < 0) {FreqU1 = 9};		
		
		FreqU = FreqU10 * 10 + FreqU1
		
		// Calcul de la position du rotacteur de frequence
		var btn = dataread_posit(KaTZPit_data["URadio_Rot"],5)+5
		btn = (10 + btn + sens)%10
		KaTZPit_data["URadio_Rot"]= datachange_posit(KaTZPit_data["URadio_Rot"],btn,5)
	
	
	}
	
	if (digit == 3){
		// Frequence Decimale UHF, incrément/decrément de 050MHz
		FreqUD = FreqUD + sens * 25
		
		// Bornage 0 à 9 , cyclage du rotactor
		if (FreqUD > 950) {FreqUD = 0};
		if (FreqUD < 0) {FreqUD = 975};		
		
		// Calcul de la position du rotacteur de frequence
		var btn = dataread_posit(KaTZPit_data["URadio_Rot"],4)+5
		btn = (10 + btn + sens)%10
		KaTZPit_data["URadio_Rot"]= datachange_posit(KaTZPit_data["URadio_Rot"],btn,4)
		
	}
	
	// Bornage des fréquences 225-400 en UHF
	var Freq = FreqU10 * 10000 + FreqU1 * 1000 + FreqUD
	if (Freq < 225000){Freq = 225000}
	if (Freq > 399975){Freq = 399975}
	
	KaTZPit_data["URadioUM"]= (Freq)*1000 + volU
	//console.log(KaTZPit_data["URadioUM"])
	
	// Syntonisation Automatique UHF
	// Décision Tacno, Raiden de lancer la syntonisaiton à chaque changement
	// Et non sur appui du bouton Tone
	Radio_Tone(1)
		
		// Mise à jour de l'affichage
	panel_radio_us_update(KaTZPit_data)
		
}
	
	
function Radio_FreqV(digit,sens){

	// Gestion de la fréquence manuelle VHF ---------------------------------------------

	var volV = (dataread_split_3P(KaTZPit_data["URadioVM"])[0])	
	
		
	// Gestion VHF
	var FreqV = (dataread_split_3P(KaTZPit_data["URadioVM"])[2])
	var FreqV10 = Math.floor(FreqV / 10)
	var FreqV1 = FreqV % 10
	var FreqVD =(dataread_split_3P(KaTZPit_data["URadioVM"])[1])
		
	if (digit == 1){
		// Frequence Dizaine VHF, incrément/decrément de 10
		FreqV10 = FreqV10 + sens
			
		// encadrement de la fréquence UHF (225 , 400)
		// si FreqU10 > 15 ou < 11 , on cycle le rotacteur, on était déjà au maxi, ou mini
		if (FreqV10 >39) {FreqV10=11}
		if (FreqV10 <11) {FreqV10=39}
		FreqV = FreqV10 * 10 + FreqV1
			
		// Calcul de la position du rotacteur de frequence
		var btn = dataread_posit(KaTZPit_data["URadio_Rot"],3)+5
		btn = (10 + btn + sens)%10
		KaTZPit_data["URadio_Rot"]= datachange_posit(KaTZPit_data["URadio_Rot"],btn,3)
	
	}
		
	if (digit == 2){
		// Frequence Unitaire VHF, incrément/decrément de 1
		FreqV1 = FreqV1 + sens
		
		// Bornage 0 à 9 , cyclage du rotactor
		if (FreqV1 > 9) {FreqV1 = 0};
		if (FreqV1 < 0) {FreqV1 = 9};		
		
		FreqV = FreqV10 * 10 + FreqV1
		
		// Calcul de la position du rotacteur de frequence
		var btn = dataread_posit(KaTZPit_data["URadio_Rot"],2)+5
		btn = (10 + btn + sens)%10
		KaTZPit_data["URadio_Rot"]= datachange_posit(KaTZPit_data["URadio_Rot"],btn,2)

	}
		
	if (digit == 3){
		// Frequence Decimale VHF, incrément/decrément de 025MHz
		FreqVD = FreqVD + sens * 25
		
		// Bornage 0 à 9 , cyclage du rotactor
		if (FreqVD > 975) {FreqVD = 0};
		if (FreqVD < 0) {FreqVD = 975};		
		
		// Calcul de la position du rotacteur de frequence
		var btn = dataread_posit(KaTZPit_data["URadio_Rot"],1)+5
		btn = (10 + btn + sens)%10
		KaTZPit_data["URadio_Rot"]= datachange_posit(KaTZPit_data["URadio_Rot"],btn,1)
				
	}
		
	// Bornage des fréquences 118-399 en VHF 
	var Freq = FreqV10 * 10000 + FreqV1 * 1000 + FreqVD
	if (Freq < 118000){Freq = 118000}
	if (Freq > 399975){Freq = 399975}
		
	//  Enregistrement de la nouvelle fréquence manuelle
	KaTZPit_data["URadioVM"]= (Freq)*1000 + volV
				
	// Syntonisation Automatique VHF
	// Décision Tacno, Raiden de lancer la syntonisaiton à chaque changement
	// Et non sur appui du bouton Tone
	Radio_Tone(0)
		
		
	// Mise à jour de l'affichage
	panel_radio_us_update(KaTZPit_data)
		
}


function Radio_Tone(band){
// Syntonisation des fréquences manuelles
// Ecriture de la valeur manuelle temporaire dans la valeur de fréquence manual

if (band ==0){
	
	// Si on est en mode manuel, on envoi le changement à UR
	var ModeV = dataread_posit(KaTZPit_data["URadio_SW1"],1)
	if (ModeV==0){
		//console.log("Syntonisation VHF")
		KaTZPit_data["URadioV"] = KaTZPit_data["URadioVM"]
		Radio_US_Commande("C")}
	
	}

if (band ==1){
		
	// Si on est en mode manuel, on envoi le changement à UR
	var ModeU = dataread_posit(KaTZPit_data["URadio_SW1"],2)
	if (ModeU==0){
		//console.log("Syntonisation UHF")
		KaTZPit_data["URadioU"] = KaTZPit_data["URadioUM"]
		Radio_US_Commande("C")}
	
	}
	

	
}




function Radio_US_Commande(type){

	if (type=="V"){

		// Message de changement de volume
		// Récupération des valeurs de volume
		var volV = (dataread_split_3P(KaTZPit_data["URadioV"])[0])
		var volU = (dataread_split_3P(KaTZPit_data["URadioU"])[0])

		// Creation du message UR -------------------------------------------	
		//console.log ("volVHF",volV)
		//console.log ("volUHF",volU)
		// Message pour UR
		var message_UR =  "SET_VOLUM: "+volV+" "+volU+" 0"

		// Message uniquement si radio On
		if (dataread_posit(KaTZPit_data["URadio_SW"],8) ==1){
			console.log (message_UR)
			CmdSiocSpe(4,message_UR)
			}
	
	}


	if (type=="X"){
		// Message de changement d'active X		
		// Chan Active en fonction du bouton UHF/VHF
		var Active = "___"
		if (dataread_posit(KaTZPit_data["URadio_SW"],6) ==0){Active = "X__"}
			else {Active = "_X_"}
		var message_UR =  "SET_ACTIV: "+ Active	

		// Message uniquement si radio On
		if (dataread_posit(KaTZPit_data["URadio_SW"],8) ==1){
			console.log (message_UR)
			CmdSiocSpe(4,message_UR)
		}

	}

	if (type=="C"){
	
		
		// Récupération de la fréquence active dans URadioU
		var FreqUn = (dataread_split_3P(KaTZPit_data["URadioU"])[2]) * 1000 + (dataread_split_3P(KaTZPit_data["URadioU"])[1])
		// Mise en forme string avec les zero
		var FreqU = freq_format(FreqUn)
		
				
		var Modulation = "F"
		if (dataread_posit(KaTZPit_data["URadio_SW"],5) ==1) {Modulation = "A"} else {Modulation = "F"}
		// Frequence de guarde toujours AM
		if (dataread_posit(KaTZPit_data["URadio_SW1"],1)==2) {Modulation = "A"}
		
		
		// Récupération de la fréquence active dans URadioV
		var FreqVn = (dataread_split_3P(KaTZPit_data["URadioV"])[2]) * 1000 + (dataread_split_3P(KaTZPit_data["URadioV"])[1])
		// Mise en forme string avec les zero
		var FreqV = freq_format(FreqVn)
		
		var Cript = dataread_posit(KaTZPit_data["URadio_SW"],7)
		
		if (Cript == 1){
			var FreqCript = FreqV
			var CodeCript = KaTZPit_data["URCode"] 
		}
		else {
			var FreqCript = "000.000"
			var CodeCript = "0"
		}
				
		

		// Creation du message UR -------------------------------------------		
		var message_UR =  "SET_RADIO: "+FreqV+Modulation+" "+FreqU+"A"+" 000.000A "+FreqCript+" "+ CodeCript
		
		// Message uniquement si radio On
		if (dataread_posit(KaTZPit_data["URadio_SW"],8) ==1){
			console.log (message_UR)
			CmdSiocSpe(4,message_UR)
		}
	}




	if (type=="OFF"){

		console.log("Off")
		message_UR_1 = "SET_ACTIV: ___"
		message_UR_2 = "SET_RADIO: 000.000A 000.000A 000.000A 000.000 0"

		console.log (message_UR_1)
		CmdSiocSpe(4,message_UR_1)
		console.log (message_UR_2)
		CmdSiocSpe(4,message_UR_2)

			

	}		

	// message test UR
	//var message_UR =  "SET_VOLUM: 55 65 75"
	//CmdSiocSpe(4,message_UR)
	// message test UR
	//var message_2UR =  "SET_RADIO: 122.200F 134.400F 112.750A 000.000 0"
	//CmdSiocSpe(4,message_2UR)

}


function panel_radio_ru_update(KaTZPit_data){}






