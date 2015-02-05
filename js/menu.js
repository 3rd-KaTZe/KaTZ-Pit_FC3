// --------------------------------------------------------------------
// Connection Panel et Toggle Panel
// --------------------------------------------------------------------

function menu_connection(KaTZPit_data){
	
	// Affichage de l'Ip et du Port
	document.getElementById('IP_Host').innerHTML = serverws.ip
	document.getElementById('IP_Port').innerHTML = serverws.port
}

function menu_connection_led(flag){

	if (flag == 0) {$("#Led_Connect").attr("src","images/emergency/z_Led-Rouge.gif")}
	if (flag == 1) {$("#Led_Connect").attr("src","images/emergency/z_Led-Orange.gif")}
	if (flag == 2) {$("#Led_Connect").attr("src","images/emergency/z_Led-Verte.gif")}
	
}


function menu_Toggle(panel){
	
	// Toggle de la valeur du panel à changer 0>1 et 1>0
	Panel_On[panel] = (Panel_On[panel]+1) % 2
	console.log(panel," = ",Panel_On[panel])
	
	// Affichage des différents panneaux en fonction de leur valeur dans la liste "Panel_On"	
	
	if (Plane_data["ID"] == 15){
		if (Panel_On["ILS_15"] == 0) {
		document.getElementById("Panel_ILS_15").style.display = "none"
		Panel_On["Weapon"] =1
		}
		else {
		Panel_On["Weapon"] =0
		document.getElementById("Panel_ILS_15").style.display = "block"}
	}	
	
	// Panel Weapon en toggle avec ILS
	if (Panel_On["Weapon"] == 0) {
	document.getElementById("Panel_Weapon").style.display = "none"}
	else {
	document.getElementById("Panel_Weapon").style.display = "block"}
	
	// Panel Radio-TS
	if (Panel_On["Radio_360"] == 0) {document.getElementById("Panel_Radio").style.display = "none"}
	else {document.getElementById("Panel_Radio").style.display = "block"}
	
	// FrequencyList
	if (Panel_On["FreqList"] == 0) {document.getElementById("Frequency_List").style.display = "none"}
	else {document.getElementById("Frequency_List").style.display = "block"}

	

	
}	