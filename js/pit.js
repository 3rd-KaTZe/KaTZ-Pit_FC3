// serverws.ip = "IP MACHINE DCS"; // défaut localhost
// serverws.port = "PORT";	// défaut 9000
// serverws.auto_connect = true;
// serverws.delay = 5000;

var mydata;
var obj;
var mytimer;
var paneldata = new Array();
var KaTZPit_data = {};
var Plane_data = {};
var FL_data = {};
var RWY_data = {};
var Weapon_data={};
var Order_List = new Array();
var CmdDelay;



window.onload = function(){
	// Chargement et indication de l'IP et Port
	// Sur le panel Emergency
	console.log ("pits.js >> windows.onload")

	// Affichage des données IP dans le panel
	menu_connection() ;

	// Initialisation des Panels affichés (pit_init.js >> panel_on_init)
	Panel_On = panel_On_init();
	menu_Toggle("Init")
}


function pit_main(){

	// Iteration Principale, fréquence fixée dans mytimer
	
	// Verification de DCS_Focus
	DCS_Focus_check(KaTZPit_data)
		
	panel_emergency_update(KaTZPit_data) ;
	panel_moteur_update(KaTZPit_data) ;
	panel_fuel_update(KaTZPit_data) ;
	panel_navigation_update(KaTZPit_data) ;
	panel_gear_update(KaTZPit_data) ;
	// panel_detection_update(KaTZPit_data)
	panel_target_update(KaTZPit_data) ;
	
	if (Plane_data["ID"] == 15) {
	panel_instrument_flight_F15(KaTZPit_data) ;
	panel_instrument_engine_F15(KaTZPit_data) ;
	
	
	} else if (Plane_data["ID"] == 25) {
	panel_instrument_flight_SU25(KaTZPit_data) ;
	panel_instrument_engine_SU25(KaTZPit_data) ;
	panel_pilototo_update(KaTZPit_data) ;
	panel_attitude_update(KaTZPit_data) ;
	
	
	} else if (Plane_data["ID"] == 29) {
	panel_instrument_flight_Mig29(KaTZPit_data) ;
	panel_instrument_engine_Mig29(KaTZPit_data) ;
	panel_pilototo_update(KaTZPit_data) ;
	panel_attitude_update(KaTZPit_data) ;
	
		
	} else if (Plane_data["ID"] == 33) {
	panel_instrument_flight_SU33(KaTZPit_data) ;
	panel_instrument_engine_SU33(KaTZPit_data) ;
	panel_pilototo_update(KaTZPit_data) ;
	
			
	} else if (Plane_data["ID"] == 27) {
	panel_instrument_flight_SU27(KaTZPit_data) ;
	panel_instrument_engine_SU27(KaTZPit_data) ;
	panel_pilototo_update(KaTZPit_data) ;
	
			
	} 
		
	else {
	panel_pilototo_update(KaTZPit_data) ;
	panel_attitude_update(KaTZPit_data) ;
	}
	// panel_debug_update(KaTZPit_data)
	
	// SYSTEM PANEL ------------------------------------------------------
	
	// Lancement des subroutines en fonction des panneaux affichés dans le KaKZ_Pit
		
	if (Panel_On["ILS"]==1 || Panel_On["ILS_15"]==1){ panel_ils_update(KaTZPit_data)}
	
	if (Panel_On["Weapon"]==1){ panel_weapon_update(KaTZPit_data)}
	
	
		
	CmdSend()
	
}

function Pit_Start(plane){

	// Demarrage du Panel par appui sur le bouton Start
	console.log("Demarrage Panel")

	// Initialisation des données KaTZ-Pit
	KaTZPit_data = paneldata_init();
	RWY_data = RWY_init();
	FL_data = fl_mode_init();
	Weapon_data = weapon_name_type() ;
	
	Radio1 = radio1data_init()
	Radio2 = radio2data_init()


	if (plane == 15) { Plane_data = F15_init() ; KaTZPit_data["Radiotype"]=1	};
	if (plane == 29) { Plane_data = Mig29_init() ; KaTZPit_data["Radiotype"]=1	};
	if (plane == 25) { Plane_data = SU25_init() ; KaTZPit_data["Radiotype"]=1	};
	if (plane == 27) { Plane_data = SU27_init() ; KaTZPit_data["Radiotype"]=1	};
	if (plane == 33) { Plane_data = SU33_init() ; KaTZPit_data["Radiotype"]=1	};
	if (plane == 215) {	Plane_data = F15_init() ; KaTZPit_data["Radiotype"]=2	};
	if (plane == 225) {	Plane_data = SU25_init() ; KaTZPit_data["Radiotype"]=2	};
	if (plane == 227) {	Plane_data = SU27_init() ; KaTZPit_data["Radiotype"]=2	};
	if (plane == 229) {	Plane_data = Mig29_init() ; KaTZPit_data["Radiotype"]=2	};	
	if (plane == 233) {	Plane_data = SU33_init() ; KaTZPit_data["Radiotype"]=2	};


	// Initialisation de la Radio
	//panel_radio_init(KaTZPit_data)

	menu_Toggle("Init")

	// Affichage Initial
	pit_main()
	
	
	// Lancement de la procédure de connection
	serverws_connect()

}






