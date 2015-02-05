// Panel element

function panel_gear_update(KaTZPit_data){

		
	// Voyants de trains
	if (dataread_posit(KaTZPit_data["Train"],1) == 0) {$("#VG_Train_L").fadeOut()} else {$("#VG_Train_L").fadeIn()}
	if (dataread_posit(KaTZPit_data["Train"],1) == 0) {$("#VG_Train_C").fadeOut()} else {$("#VG_Train_C").fadeIn()}
	if (dataread_posit(KaTZPit_data["Train"],1) == 0) {$("#VG_Train_R").fadeOut()} else {$("#VG_Train_R").fadeIn()}
	
	if (Plane_data["ID"] == 15){
		// Levier de train
		if (dataread_posit(KaTZPit_data["Train"],2) == 1) {$("#VG_Lever").attr("src","images/gear/gear-lever_dn.png")} 
		else {$("#VG_Lever").attr("src","images/gear/gear-lever_up.png")}
	}
	else
	{
		// Voyants d'AF
		if (dataread_posit(KaTZPit_data["AF_Pos"],1) == 0) {
			$("#VG_AF").fadeOut()
			if (Plane_data["ID"] == 25){$("#VG_AF2").fadeOut()}
		} 
		else {
		$("#VG_AF").fadeIn()
		if (Plane_data["ID"] == 25){$("#VG_AF2").fadeIn()}
		}
		
		// Voyants de Flaps
		if (dataread_posit(KaTZPit_data["Flaps_Pos"],1) == 0) {
			$("#VG_Flaps_L").fadeOut()
			$("#VG_Flaps_R").fadeOut()
		} 
		else {
		$("#VG_Flaps_L").fadeIn()
		$("#VG_Flaps_R").fadeIn()
		}
		
	}

		
		
				
	

}

	
