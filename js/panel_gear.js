// Panel element

function panel_gear_update(KaTZPit_data){

	// Voyants Flaps
	if (KaTZPit_data["Flaps_Pos"] ==5) {$("#VG_Flaps_L").fadeOut()} else {$("#VG_Flaps_L").fadeIn()}
	if (KaTZPit_data["Flaps_Pos"] ==5) {$("#VG_Flaps_R").fadeOut()} else {$("#VG_Flaps_R").fadeIn()}
	// Si flaps position atterro alors voyant orange
	if (KaTZPit_data["Flaps_Pos"] ==7) {$("#VG_Flaps_L").attr("src","images/z_Led-Orange.gif")}
		else {$("#VG_Flaps_L").attr("src","images/z_Led-Verte.gif")}

	if (KaTZPit_data["Flaps_Pos"] ==7) {$("#VG_Flaps_R").attr("src","images/z_Led-Orange.gif")}
		else {$("#VG_Flaps_R").attr("src","images/z_Led-Verte.gif")}
	
	// Voyants de trains
	if (KaTZPit_data["Train"] ==5) {$("#VG_Train_L").fadeOut()} else {$("#VG_Train_L").fadeIn()}
	if (KaTZPit_data["Train"] ==5) {$("#VG_Train_C").fadeOut()} else {$("#VG_Train_C").fadeIn()}
	if (KaTZPit_data["Train"] ==5) {$("#VG_Train_R").fadeOut()} else {$("#VG_Train_R").fadeIn()}
	
	// Voyants AF
	if (KaTZPit_data["AF_Pos"] ==5) {$("#VG_AF").fadeOut()} else {$("#VG_AF").fadeIn()}
	if (KaTZPit_data["AF_Pos"] ==5) {$("#VG_AF2").fadeOut()} else {$("#VG_AF2").fadeIn()}

	

}

	
