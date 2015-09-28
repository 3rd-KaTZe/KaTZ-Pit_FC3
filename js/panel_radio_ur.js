// --------------------------------------------------------------------------------
// Panel Radio pour l'interface Universal Radio (Raiur)
// --------------------------------------------------------------------------------


// Les données switch sont stockées dans la variable URadio_SW:5555555
// 7- Selecteur On -Off  (0/1)
// 6- Selecteur UHF-VHF  (0/1)
// 5- Selecteur FM-AM   (0/1)
// 4- n° du Chan 1 (dizaine)
// 3- n° du Chan 1 (unit)
// 2- n° du Chan 2 (dizaine)
// 1- n° du Chan 2 (unit)

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
	var Chan1D = (dataread_posit(KaTZPit_data["URadio_SW"],4)+5)
	var Chan1U = (dataread_posit(KaTZPit_data["URadio_SW"],3)+5)
	var Chan2D = (dataread_posit(KaTZPit_data["URadio_SW"],2)+5)
	var Chan2U = (dataread_posit(KaTZPit_data["URadio_SW"],1)+5)
	
	
	switch (Chan1D){
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
	
	switch (Chan1U){
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
	
	switch (Chan2D){
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
	
	switch (Chan2U){
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
	var vol1 = (dataread_split_3(KaTZPit_data["URadio1"])[0])
	var vol2 = (dataread_split_3(KaTZPit_data["URadio2"])[0])
	var chan1 = Chan1D * 10 + Chan1U
	var chan2 = Chan2D * 10 + Chan2U
	
	
	// Rotation des selecteurs
	Radio_Selecteurs(chan1,chan2,vol1,vol2)
		
}

function Radio_Selecteurs(chan1,chan2,vol1,vol2){

		

//console.log(chan1,chan2,vol1,vol2)

	var v_origine = -135
	var v_gain = 0.90
	
	$("#R_VolUhf").css({
		'-moz-transform':'rotate('+(v_origine+v_gain*vol1)+'deg)',
		'-webkit-transform':'rotate('+(v_origine+v_gain*vol1)+'deg)',
		'-ms-transform':'rotate('+(v_origine+v_gain*vol1)+'deg)',
	})
	
	$("#R_VolVhf").css({
		'-moz-transform':'rotate('+(v_origine+v_gain*vol2)+'deg)',
		'-webkit-transform':'rotate('+(v_origine+v_gain*vol2)+'deg)',
		'-ms-transform':'rotate('+(v_origine+v_gain*vol2)+'deg)',
	})
	
	var c_origine = 180
	var c_gain = 18.0
	
	$("#R_ChanUhf").css({
		'-moz-transform':'rotate('+(c_origine+c_gain*chan1)+'deg)',
		'-webkit-transform':'rotate('+(c_origine+c_gain*chan1)+'deg)',
		'-ms-transform':'rotate('+(c_origine+c_gain*chan1)+'deg)',
	})
	
	$("#R_ChanVhf").css({
		'-moz-transform':'rotate('+(c_origine+c_gain*chan2)+'deg)',
		'-webkit-transform':'rotate('+(c_origine+c_gain*chan2)+'deg)',
		'-ms-transform':'rotate('+(c_origine+c_gain*chan2)+'deg)',
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


	var Chan1D = (dataread_posit(KaTZPit_data["URadio_SW"],4)+5)
	var Chan1U = (dataread_posit(KaTZPit_data["URadio_SW"],3)+5)
	var Chan2D = (dataread_posit(KaTZPit_data["URadio_SW"],2)+5)
	var Chan2U = (dataread_posit(KaTZPit_data["URadio_SW"],1)+5)
	var chan1 = Chan1D * 10 + Chan1U
	var chan2 = Chan2D * 10 + Chan2U

if (chan == 0){
	chan1 = chan1 + sens;
	if (chan1 > 20) {chan1 = 20};
	if (chan1 < 1) {chan1 = 1};
	Chan1D = Math.floor(chan1/10);
	Chan1U = chan1 % 10;
	KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],Chan1D,4);
	KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],Chan1U,3);
	}


else{
	chan2 = chan2 + sens;
	if (chan2 > 20) {chan2 = 20};
	if (chan2 < 1) {chan2 = 1};
	Chan2D = Math.floor(chan2/10);
	Chan2U = chan2 % 10;
	KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],Chan2D,2);
	KaTZPit_data["URadio_SW"] = datachange_posit(KaTZPit_data["URadio_SW"],Chan2U,1);
	}

// Constitution des Numéros de Canaux, suivant le format des deux tables canaux <> fréquences
	var Channel1 = "CHANNEL" + Chan1D + Chan1U	
	var Channel2 = "CHANNEL" + Chan2D + Chan2U	

// Fréquence des Canaux (unitaire/décimale)
	var Freq1 = freq_format(Radio1[Channel1])
	var Freq2 = freq_format(Radio2[Channel2])

	var Modulation1 = "F"
	if (dataread_posit(KaTZPit_data["URadio_SW"],5) ==1) {Modulation1 = "A"} else {Modulation1 = "F"}

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
	CmdSiocSpe(4,message_3UR)
	
}


function Radio_Volume(vol,sens){

// Commande des rotacteurs de volume
// On modifie les variables : KaTZPit_data["URadio1"] et KaTZPit_data["URadio2"]
// sens = incrément ou decrément (1 ou -1)

// Récupération des valeurs de volume
	var vol1 = (dataread_split_3(KaTZPit_data["URadio1"])[0])
	var vol2 = (dataread_split_3(KaTZPit_data["URadio2"])[0])
	
	if (vol == 0){
		// Volume UHF, incrément/decrément de 10
		vol1 = vol1 + 10 * sens
		if (vol1 > 100) {vol1 = 100};
		if (vol1 < 0) {vol1 = 0};
		KaTZPit_data["URadio1"] = (Math.floor((KaTZPit_data["URadio1"])/1000)) * 1000 + 500 + vol1
		
			
		
	}
	else
	{
		// Volume VHF, incrément/decrément de 10
		vol2 = vol2 + 10 * sens
		if (vol2 > 100) {vol2 = 100};
		if (vol2 < 0) {vol2 = 0};
		KaTZPit_data["URadio2"] = (Math.floor((KaTZPit_data["URadio2"])/1000)) * 1000 + 500 + vol2
	}
	
	//console.log ("vol1",vol1)
	//console.log ("vol2",vol2)
	
	// Message pour UR
	var message_UR =  "SET_VOLUM: "+vol1+" "+vol2+" 0"
	console.log (message_UR)
	CmdSiocSpe(4,message_UR)
	
	// message test UR
	//var message_UR =  "SET_VOLUM: 55 65 75"
	//CmdSiocSpe(4,message_UR)
	
}


