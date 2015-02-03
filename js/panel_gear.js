// Panel element

function panel_gear_update(KaTZPit_data){

		
	// Voyants de trains
	if (dataread_posit(KaTZPit_data["Train"],1) == 0) {$("#VG_Train_L").fadeOut()} else {$("#VG_Train_L").fadeIn()}
	if (dataread_posit(KaTZPit_data["Train"],1) == 0) {$("#VG_Train_C").fadeOut()} else {$("#VG_Train_C").fadeIn()}
	if (dataread_posit(KaTZPit_data["Train"],1) == 0) {$("#VG_Train_R").fadeOut()} else {$("#VG_Train_R").fadeIn()}
	
	// Levier de train
	if (dataread_posit(KaTZPit_data["Train"],2) == 1) {
		$("#VG_Lever").attr("src","images/gear/gear-lever_dn.png")} 
		
	else {$("#VG_Lever").attr("src","images/gear/gear-lever_up.png")}
				
	

}

	
