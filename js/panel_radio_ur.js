// --------------------------------------------------------------------------------
// Panel Radio pour l'interface Universal Radio (Raiur)
// --------------------------------------------------------------------------------


// Les données switch sont stockées dans la variable URadio_SW:5555555
// 7- Selecteur On -Off  (0/1)
// 6- Selecteur UHF-VHF  (0/1)
// 5- Selecteur FM-AM   (0/1)
// 4- n° du Chan U (dizaine)
// 3- n° du Chan U (unit)
// 2- n° du Chan V (dizaine)
// 1- n° du Chan V (unit)

// Les données de fréquence et volume sont stockées dans URadio1 : 500500500, URadio2 : 500500500
// lecture avec dataread_slip_3
// 0- Volume
// 1- Fréquence Decimal
// 2- Fréquence Unitaire


function panel_radio_ur_update(KaTZPit_data){

	// Selecteur ON OFF -----------------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],7) ==1) {
	// Bascule du selecteur
	$("#R_onoff").attr('src','images/raiur_33/Switch_Vj_U.png')
	// Commande on
	panel_radio_ur_on(KaTZPit_data)
	} 
	
	else { 
	// Bascule du selecteur
	$("#R_onoff").attr('src','images/raiur_33/Switch_Vj_D.png')
	// Commande off
	panel_radio_ur_off(KaTZPit_data)
	}
		
	
	// Selecteur UHF VHF -----------------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],6) ==1) {$("#R_uhfvhf").attr('src','images/raiur_33/Switch_H_R.png')} else {$("#R_uhfvhf").attr('src','images/raiur_33/Switch_H_L.png')}
	
	// Selecteur AM FM (1=AM)-----------------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],5) ==1) {$("#R_AMFM").attr('src','images/raiur_33/Switch_V_U.png')} else {$("#R_AMFM").attr('src','images/raiur_33/Switch_V_D.png')}

}

function panel_radio_ur_off() {
	
	// Extinction des diodes
	$("#R_U_Led").attr('src','images/raiur_33/Led-Jaune_Off.png')
	$("#R_V_Led").attr('src','images/raiur_33/Led-Jaune_Off.png')
	
	// Extinction des 7Seg
	$("#R_ChanUDigit10").attr('src','images/raiur_33/7-Seg_off.png')
	$("#R_ChanUDigit1").attr('src','images/raiur_33/7-Seg_off.png')
	$("#R_ChanVDigit10").attr('src','images/raiur_33/7-Seg_off.png')
	$("#R_ChanVDigit1").attr('src','images/raiur_33/7-Seg_off.png')
	

}

function panel_radio_ur_on(KaTZPit_data){


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
	var volV = (dataread_split_3(KaTZPit_data["URadio1"])[0])
	var volU = (dataread_split_3(KaTZPit_data["URadio2"])[0])
	var chanV = ChanVD * 10 + ChanVU
	var chanU = ChanUD * 10 + ChanUU
	
	
	// Rotation des selecteurs
	Radio_Selecteurs(chanV,chanU,volV,volU)
		
}

function Radio_Selecteurs(chanV,chanU,volV,volU){

<<<<<<< HEAD
		

//console.log(chan1,chan2,vol1,vol2)
=======
>>>>>>> origin/develop

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

// Commande des switch de la radio
// On modifie les variables : KaTZPit_data["URadio_SW"]
// digit = chiffre à changer
// value = valeur à insérer
//console.log (KaTZPit_data["URadio_SW"])


KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],value,digit);
// Envoi d'un message de mise à jour à UR, via la fonction de changement de canaux
Radio_Channel(0,0)

//console.log (KaTZPit_data["URadio_SW"])


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


else{
	chanV = chanV + sens;
	if (chanV > 20) {chanV = 1};
	if (chanV < 1) {chanV = 20};
	ChanVD = Math.floor(chanV/10);
	ChanVU = chanV % 10;
	KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanVD,2);
	KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],ChanVU,1);
	}

// Constitution des Numéros de Canaux, suivant le format des deux tables canaux <> fréquences
<<<<<<< HEAD
	var Channel1 = "CHANNEL" + Chan1D + Chan1U	
	var Channel2 = "CHANNEL" + Chan2D + Chan2U	

// Fréquence des Canaux (unitaire/décimale)
	var Freq1 = freq_format(Radio1[Channel1])
	var Freq2 = freq_format(Radio2[Channel2])
=======
	var ChannelV = "CHANNEL" + ChanVD + ChanVU	
	var ChannelU = "CHANNEL" + ChanUD + ChanUU	

// Fréquence des Canaux (unitaire/décimale)
	var FreqV = freq_format(Radio1[ChannelV])
	var FreqU = freq_format(Radio2[ChannelU])
>>>>>>> origin/develop

	var Modulation1 = "F"
	if (dataread_posit(KaTZPit_data["URadio_SW"],5) ==1) {Modulation1 = "A"} else {Modulation1 = "F"}

<<<<<<< HEAD
	var message_2UR =  "SET_RADIO: "+Freq1+Modulation1+" "+Freq2+"F 000.000A 000.000 0"
	console.log (message_2UR)
	CmdSiocSpe(4,message_2UR)

		// message test UR
		//var message_2UR =  "SET_RADIO: 122.200F 134.400F 112.750A 000.000 0"
	
	var Active = "___"
	
	// Selecteur ON OFF - sur OFF pas de Comm Active-------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],7) ==0) {Active = "___"}
	// Sur ON , Chan Active en fonction du bouton UHF/VHF
	else {
		if (dataread_posit(KaTZPit_data["URadio_SW"],6) ==0){Active = "X__"}
		else {Active = "_X_"}
	}
	
	var message_3UR =  "SET_ACTIV: "+ Active
	console.log (message_3UR)
=======
// Message de changement de canaux	
	var message_2UR =  "SET_RADIO: "+FreqV+"A "+FreqU+Modulation1+" 000.000A 000.000 0"
	// message test UR
	//var message_2UR =  "SET_RADIO: 122.200F 134.400F 112.750A 000.000 0"
	
// Message de changement d'active X		
// Chan Active en fonction du bouton UHF/VHF
	var Active = "___"
	if (dataread_posit(KaTZPit_data["URadio_SW"],6) ==1){Active = "X__"}
		else {Active = "_X_"}
	var message_3UR =  "SET_ACTIV: "+ Active	
		
		
	// Selecteur ON OFF - sur OFF pas de Comm Active-------------------------------------
	if (dataread_posit(KaTZPit_data["URadio_SW"],7) ==0) {
	message_3UR = "SET_ACTIV: ___"
	message_2UR = "SET_RADIO: 000.000A 000.000A 000.000A 000.000 0"
	}
	
	console.log (message_2UR)
	console.log (message_3UR)
	
	CmdSiocSpe(4,message_2UR)
>>>>>>> origin/develop
	CmdSiocSpe(4,message_3UR)
	
}


function Radio_Volume(vol,sens){

// Commande des rotacteurs de volume
// On modifie les variables : KaTZPit_data["URadio1"] et KaTZPit_data["URadio2"]
// sens = incrément ou decrément (1 ou -1)

// Récupération des valeurs de volume
	var volV = (dataread_split_3(KaTZPit_data["URadio1"])[0])
	var volU = (dataread_split_3(KaTZPit_data["URadio2"])[0])
	
	if (vol == 0){
		// Volume UHF, incrément/decrément de 10
		volU = volU + 10 * sens
		if (volU > 100) {volU = 100};
		if (volU < 0) {volU = 0};
		KaTZPit_data["URadio2"] = (Math.floor((KaTZPit_data["URadio2"])/1000)) * 1000 + 500 + volU
		
			
		
	}
	else
	{
		// Volume VHF, incrément/decrément de 10
		volV = volV + 10 * sens
		if (volV > 100) {volV = 100};
		if (volV < 0) {volV = 0};
		KaTZPit_data["URadio1"] = (Math.floor((KaTZPit_data["URadio1"])/1000)) * 1000 + 500 + volV
	}
	
<<<<<<< HEAD
	//console.log ("vol1",vol1)
	//console.log ("vol2",vol2)
	
	// Message pour UR
	var message_UR =  "SET_VOLUM: "+vol1+" "+vol2+" 0"
=======
	//console.log ("volVHF",volV)
	//console.log ("volUHF",volU)
	
	// Message pour UR
	var message_UR =  "SET_VOLUM: "+volV+" "+volU+" 0"
>>>>>>> origin/develop
	console.log (message_UR)
	CmdSiocSpe(4,message_UR)
	
	// message test UR
	//var message_UR =  "SET_VOLUM: 55 65 75"
	//CmdSiocSpe(4,message_UR)
	
}


