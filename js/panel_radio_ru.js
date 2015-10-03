// --------------------------------------------------------------------------------
// Panel Radio pour l'interface Universal Radio (Raiur)
// --------------------------------------------------------------------------------


// Les données switch sont stockées dans la variable URadio_SW:5555555
// 8- Selecteur On -Off  (0/1)
// 7- Non Utilisé sur Russe
// 6- Selecteur UHF-VHF  (0/1)
// 5- Selecteur FM-AM   (0/1)
// 4- n° du Chan U (dizaine)
// 3- n° du Chan U (unit)
// 2- n° du Chan V (dizaine)
// 1- n° du Chan V (unit)

// Les données de fréquence et volume sont stockées dans URadioV : 500500500, URadioU : 500500500
// lecture avec dataread_slip_3
// 0- Volume
// 1- Fréquence Decimal
// 2- Fréquence Unitaire

// "panel_radio_ru_update" affiche les rotacteurs, et lance la mise à jour "on" ou "off"
// "panel_radio_ru_on", affiche l'affichage 7 segments et les diodes
// "panel_radio_ru_off", éteind les dodes et les affichage 7 segments
// "Radio_ru_Selecteurs", positionne les selecteurs
// "Radio_Switch", Commande des selecteurs à bascule
// "Radio_Vol", Commande des changements de volume
// "Radio_Chan", Commande des changements de canaux
// "Radio_UR_Commande", envoi des messages à UR



function panel_radio_ru_update(KaTZPit_data){

	// Mise à jour de l'affichage
	// Selecteur UHF VHF -----------------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],6) ==1) {$("#R_uhfvhf").attr('src','images/raiur_33/Switch_H_R.png')} else {$("#R_uhfvhf").attr('src','images/raiur_33/Switch_H_L.png')}
	
	// Selecteur AM FM (1=AM)-----------------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],5) ==1) {$("#R_AMFM").attr('src','images/raiur_33/Switch_V_U.png')} else {$("#R_AMFM").attr('src','images/raiur_33/Switch_V_D.png')}

	// Selecteur ON OFF -----------------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],8) ==1) {
		$("#R_onoff").attr('src','images/raiur_33/Switch_Vj_U.png')
		panel_radio_ru_on(KaTZPit_data)
	} 
	else {
		$("#R_onoff").attr('src','images/raiur_33/Switch_Vj_D.png')
		panel_radio_ru_off() 
	}
	
	// Test log des valeurs de chan/vol
	console.log("FreQ, Unit")
	console.log(dataread_split_3(KaTZPit_data["URadioU"])[2])
	console.log("FreQ, Dec")
	console.log(dataread_split_3(KaTZPit_data["URadioU"])[1])
	console.log("FreQ, Vol")
	console.log(dataread_split_3(KaTZPit_data["URadioU"])[0])
	
	

}

function panel_radio_ru_off() {
	
	// Extinction des diodes
	$("#R_U_Led").attr('src','images/raiur_33/Led-Jaune_Off.png')
	$("#R_V_Led").attr('src','images/raiur_33/Led-Jaune_Off.png')
	
	// Extinction des 7Seg
	$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_off.png')
	$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_off.png')
	$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_off.png')
	$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_off.png')

	// Récupération des valeurs de chan et de volume
	// Ajout de +5 à la fonciton datareadswitch (codage 5=0)
	var ChanUD = (dataread_posit(KaTZPit_data["URadio_SW"],4)+5)
	var ChanUU = (dataread_posit(KaTZPit_data["URadio_SW"],3)+5)
	var ChanVD = (dataread_posit(KaTZPit_data["URadio_SW"],2)+5)
	var ChanVU = (dataread_posit(KaTZPit_data["URadio_SW"],1)+5)
	var volV = (dataread_split_3(KaTZPit_data["URadioV"])[0])
	var volU = (dataread_split_3(KaTZPit_data["URadioU"])[0])
	var chanV = ChanVD * 10 + ChanVU
	var chanU = ChanUD * 10 + ChanUU
	
	// Rotation des selecteurs (On peut tourner les rotacteurs même panel éteint)
	Radio_ru_Selecteurs(chanV,chanU,volV,volU)


}

function panel_radio_ru_on(KaTZPit_data){


	// Allumage de la bonne diode UHF, VHF
	if (dataread_posit(KaTZPit_data["URadio_SW"],6) ==1){
	$("#R_U_Led").attr('src','images/raiur_33/Led-Jaune_Off.png')
	$("#R_V_Led").attr('src','images/raiur_33/Led-Jaune_On.png')
	} 
	else {
	$("#R_U_Led").attr('src','images/raiur_33/Led-Jaune_On.png')
	$("#R_V_Led").attr('src','images/raiur_33/Led-Jaune_Off.png')
	}
	
	// Affichage des 7Seg
	// Ajout de +5 à la fonciton datareadswitch (codage 5=0)
	var ChanUD = (dataread_posit(KaTZPit_data["URadio_SW"],4)+5)
	var ChanUU = (dataread_posit(KaTZPit_data["URadio_SW"],3)+5)
	var ChanVD = (dataread_posit(KaTZPit_data["URadio_SW"],2)+5)
	var ChanVU = (dataread_posit(KaTZPit_data["URadio_SW"],1)+5)
	
	
	switch (ChanUD){
	case 0:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_0.png'); break;
	case 1:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_1.png'); break;
	case 2:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_2.png'); break;
	case 3:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_3.png'); break;
	case 4:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_4.png'); break;
	case 5:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_5.png'); break;
	case 6:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_6.png'); break;
	case 7:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_7.png'); break;
	case 8:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_8.png'); break;
	case 9:$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_9.png'); break;
	}
	
	switch (ChanUU){
	case 0:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_0.png'); break;
	case 1:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_1.png'); break;
	case 2:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_2.png'); break;
	case 3:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_3.png'); break;
	case 4:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_4.png'); break;
	case 5:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_5.png'); break;
	case 6:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_6.png'); break;
	case 7:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_7.png'); break;
	case 8:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_8.png'); break;
	case 9:$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_9.png'); break;
	}
	
	switch (ChanVD){
	case 0:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_0.png'); break;
	case 1:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_1.png'); break;
	case 2:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_2.png'); break;
	case 3:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_3.png'); break;
	case 4:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_4.png'); break;
	case 5:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_5.png'); break;
	case 6:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_6.png'); break;
	case 7:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_7.png'); break;
	case 8:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_8.png'); break;
	case 9:$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_9.png'); break;
	}
	
	switch (ChanVU){
	case 0:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_0.png'); break;
	case 1:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_1.png'); break;
	case 2:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_2.png'); break;
	case 3:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_3.png'); break;
	case 4:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_4.png'); break;
	case 5:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_5.png'); break;
	case 6:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_6.png'); break;
	case 7:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_7.png'); break;
	case 8:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_8.png'); break;
	case 9:$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_9.png'); break;
	}
	
	// Récupération des valeurs de chan
	var volV = (dataread_split_3(KaTZPit_data["URadioV"])[0])
	var volU = (dataread_split_3(KaTZPit_data["URadioU"])[0])
	var chanV = ChanVD * 10 + ChanVU
	var chanU = ChanUD * 10 + ChanUU
	
	// Rotation des selecteurs
	Radio_ru_Selecteurs(chanV,chanU,volV,volU)
		
}

function Radio_ru_Selecteurs(chanV,chanU,volV,volU){


	var v_origine = -135
	var v_gain = 0.90
	
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
	
	var c_origine = 180
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

function Radio_Switch(digit,value){

	// Commande des switches de la radio
	// On vérifie si le switch a bougé
	var old_value = dataread_posit(KaTZPit_data["URadio_SW"],digit)
	
	// Si changement, mise à jour
	if (old_value != value){
		// On modifie les variables : KaTZPit_data["URadio_SW"]
		// digit = chiffre à changer
		// value = valeur à insérer
		//console.log ("Switch Change"])
		//console.log (KaTZPit_data["URadio_SW"])
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],value+5,digit);

		// Mise à jour de l'affichage, qui envoie une commande UR
		panel_radio_ru_update(KaTZPit_data)

		// Si le switch On/Off a été activé, on envoie à UR l'intégralité des positions, ou tout à zero
		if (digit == 8) {
			if (value == 1){Radio_UR_Commande("C");Radio_UR_Commande("X");Radio_UR_Commande("V")}else {Radio_UR_Commande("OFF")}
		}

		// Si le switch AM/FM a été activé, on envoie à UR la commande de chan
		if (digit == 5) {
			Radio_UR_Commande("C");
		}

		// Si le switch UHF/VHF a été activé, on envoie à UR la commande de X active
		if (digit == 6) {
			Radio_UR_Commande("X")
		}

	}

}

function Radio_Channel(chan,sens){

	// Commande des canaux radio
	// On modifie les variables : KaTZPit_data["URadio_SW"]
	// chan = 0 (UHF) , 1 (VHF)
	// sens = -1 , +1 incrément ou decrément


	var ChanUD = (dataread_posit(KaTZPit_data["URadio_SW"],4)+5)
	var ChanUU = (dataread_posit(KaTZPit_data["URadio_SW"],3)+5)
	var ChanVD = (dataread_posit(KaTZPit_data["URadio_SW"],2)+5)
	var ChanVU = (dataread_posit(KaTZPit_data["URadio_SW"],1)+5)
	var chanV = ChanVD * 10 + ChanVU
	var chanU = ChanUD * 10 + ChanUU

	if (chan == 0){
		chanU = chanU + sens;
		if (chanU > 20) {chanU = 1};
		if (chanU < 1) {chanU = 20};
		ChanUD = Math.floor(chanU/10);
		ChanUU = chanU % 10;
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanUD,4);
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanUU,3);
	}


	else {
		chanV = chanV + sens;
		if (chanV > 20) {chanV = 1};
		if (chanV < 1) {chanV = 20};
		ChanVD = Math.floor(chanV/10);
		ChanVU = chanV % 10;
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanVD,2);
		KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanVU,1);
	}

	// Mise à jour de l'affichage
	Radio_UR_Commande("C")
	panel_radio_ru_update(KaTZPit_data)

		
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

		if (volU <=100 && volU >=0) {
			KaTZPit_data["URadioU"] = (Math.floor((KaTZPit_data["URadioU"])/1000)) * 1000 + volU
			Radio_UR_Commande("V")
		}

		// si volU > 100 ou < 0 , on ne fait rien, le bouton était déjà au maxi, ou mini
		//if (volU > 100) {volU = 100};
		//if (volU < 0) {volU = 0};
				
	}
	else {
		// Volume VHF, incrément/decrément de 10
		volV = volV + 10 * sens

		if (volV <=100 && volV >=0) {
			KaTZPit_data["URadioV"] = (Math.floor((KaTZPit_data["URadioV"])/1000)) * 1000 + volV
			Radio_UR_Commande("V")
		}
	}
	
	// Mise à jour de l'affichage
	panel_radio_ru_update(KaTZPit_data)
}



function Radio_UR_Commande(type){

	if (type=="V"){

		// Message de changement de volume
		// Récupération des valeurs de volume
		var volV = (dataread_split_3(KaTZPit_data["URadioV"])[0])
		var volU = (dataread_split_3(KaTZPit_data["URadioU"])[0])

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
		if (dataread_posit(KaTZPit_data["URadio_SW"],6) ==1){Active = "X__"}
			else {Active = "_X_"}
		var message_UR =  "SET_ACTIV: "+ Active	

		// Message uniquement si radio On
		if (dataread_posit(KaTZPit_data["URadio_SW"],8) ==1){
			console.log (message_UR)
			CmdSiocSpe(4,message_UR)
		}

	}

	if (type=="C"){

		// Message de changement de canal
		// Recupération des données Chan
		var ChanUD = (dataread_posit(KaTZPit_data["URadio_SW"],4)+5)
		var ChanUU = (dataread_posit(KaTZPit_data["URadio_SW"],3)+5)
		var ChanVD = (dataread_posit(KaTZPit_data["URadio_SW"],2)+5)
		var ChanVU = (dataread_posit(KaTZPit_data["URadio_SW"],1)+5)
		
		// Constitution des Numéros de Canaux, suivant le format des deux tables canaux <> fréquences
		var ChannelV = "CHANNEL" + ChanVD + ChanVU	
		var ChannelU = "CHANNEL" + ChanUD + ChanUU	

		// Fréquence des Canaux (unitaire/décimale)
		var FreqV = freq_format(Radio1[ChannelV])
		var FreqU = freq_format(Radio2[ChannelU])

		var Modulation1 = "F"
		if (dataread_posit(KaTZPit_data["URadio_SW"],5) ==1) {Modulation1 = "A"} else {Modulation1 = "F"}

		// Creation du message UR -------------------------------------------		
		var message_UR =  "SET_RADIO: "+FreqV+"A "+FreqU+Modulation1+" 000.000A 000.000 0"
		
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





