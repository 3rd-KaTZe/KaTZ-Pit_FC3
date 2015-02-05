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

	menu_connection(KaTZPit_data)

	// Initialisation des Panels affichés
	Panel_On = panel_On_init();
	menu_Toggle("Init")

}


function pit_main(){

	// Iteration Principale, fréquence fixée dans mytimer
		
	panel_emergency_update(KaTZPit_data)
	panel_moteur_update(KaTZPit_data)
	panel_fuel_update(KaTZPit_data)
	panel_navigation_update(KaTZPit_data)
	panel_gear_update(KaTZPit_data)
	panel_detection_update(KaTZPit_data)
	panel_target_update(KaTZPit_data)
	
	if (Plane_data["ID"] == 15) {
	panel_instrument_flight_F15(KaTZPit_data)
	panel_instrument_engine_F15(KaTZPit_data)}
	// panel_debug_update(KaTZPit_data)
	
	// SYSTEM PANEL ------------------------------------------------------
	
	// Lancement des subroutines en fonction des panneaux affichés dans le KaKZ_Pit
		
	if (Panel_On["ILS"]==1){
	panel_ils_update(KaTZPit_data)}
	
	if (Panel_On["Weapon"]==1){
	panel_weapon_update(KaTZPit_data)}
	
	if (Panel_On["Radio_360"]==1){panel_radio_update(KaTZPit_data)}
		
	CmdSend()
	
}

function Pit_Start(plane){

	// Demarrage du Panel par appui sur le bouton Start
	console.log("Demarrage Panel")

	// Initialisation des données KaTZ-Pit
	KaTZPit_data = paneldata_init();
	RWY_data = RWY_init();
	FL_data = fl_mode_init();
	Weapon_data = weapon_name_type()


	if (plane == 15) {
		Plane_data = F15_init()
		KaTZPit_data["Radiotype"]=1	};
	if (plane == 29) {
		Plane_data = Mig29_init()
		KaTZPit_data["Radiotype"]=1	};
	if (plane == 25) {
		Plane_data = SU25_init()
		KaTZPit_data["Radiotype"]=1	};
	if (plane == 27) {
		Plane_data = SU27_init()
		KaTZPit_data["Radiotype"]=1	};
	if (plane == 33) {
		Plane_data = SU33_init()
		KaTZPit_data["Radiotype"]=1	};
	if (plane == 215) {
		Plane_data = F15_init()
		KaTZPit_data["Radiotype"]=2	};
	if (plane == 225) {
		Plane_data = SU25_init()
		KaTZPit_data["Radiotype"]=2	};
	if (plane == 227) {
		Plane_data = SU27_init()
		KaTZPit_data["Radiotype"]=2	};
	if (plane == 229) {
		Plane_data = Mig29_init()
		KaTZPit_data["Radiotype"]=2	};	
	if (plane == 233) {
		Plane_data = SU33_init()
		KaTZPit_data["Radiotype"]=2	};


	// Initialisation de la Radio
	panel_radio_init(KaTZPit_data)

	// Affichage Initial
	pit_main()
	//paneldata_update(KaTZPit_data)

	// Lancement de la procédure de connection
	serverws_connect()

}


// Envoi de Commande vers Sioc>DCS, Argument Num voir Liste des Commandes DCS 
// Commande type FC2-FC3

function CmdSioc(Val) {
	
	// Commande de Controle de DCS (channel 1 + Valeur)
	var commande_DCS = "1="+Val
	//var ordre = JSON.stringify(commande_DCS)
	//var ordre = commande_DCS
	serverws_send(commande_DCS)
	console.log("Envoi de la commande ..", commande_DCS);
}

function CmdSiocSpe(Num, Val) {

	// Commande de Controle de Sioc (chennel Num + Valeur)
	var commande_DCS = Num +"="+ Val
	serverws_send(commande_DCS)
	console.log("Envoi de la commande ..", commande_DCS);

}
//timer_capot = setTimeout(function(){mafonction(argument)},duree_survol)




