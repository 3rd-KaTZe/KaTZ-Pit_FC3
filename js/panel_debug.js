function panel_debug_update(KaTZPit_data){

	
	document.getElementById('Debug_1').innerHTML = KaTZPit_data["Error"]
	document.getElementById('Debug_2').innerHTML = KaTZPit_data["Ping_old"]
	document.getElementById('Debug_3').innerHTML = KaTZPit_data["Ping"]
	document.getElementById('Debug_4').innerHTML = KaTZPit_data["ILS_up"]
	document.getElementById('Debug_5').innerHTML = KaTZPit_data["ILS_lat"]
	document.getElementById('Debug_6').innerHTML = KaTZPit_data["Rwy_x"]
	
	
	
	
	

}

	
