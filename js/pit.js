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



window.onload = function(){

// Chargement et indication de l'IP et Port
// Sur le panel Emergency
panel_emergency_update(KaTZPit_data)
//temp for tests;
//mytimer = setInterval(main, 200);

}


function main(){

	// Iteration Principale, fréquence fixée dans mytimer
		
	panel_emergency_update(KaTZPit_data)
	panel_attitude_update(KaTZPit_data)
	panel_moteur_update(KaTZPit_data)
	panel_fuel_update(KaTZPit_data)
	panel_pilototo_update(KaTZPit_data)
	panel_navigation_update(KaTZPit_data)
	panel_weapon_update(KaTZPit_data)
	panel_gear_update(KaTZPit_data)
	panel_ils_update(KaTZPit_data)
	panel_radio_update(KaTZPit_data)
	panel_detection_update(KaTZPit_data)
	panel_target_update(KaTZPit_data)
	// panel_debug_update(KaTZPit_data)
	
	// window.blur()
	
	
	
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
	main()
	//paneldata_update(KaTZPit_data)

	// Lancement de la procédure de connection
	serverws_connect()

}


function serverws_Open(){

	console.log("connection serveur démarrée")
	
	//Passage du voyant de connection de orange >> vert
	$("#Led_Connect").attr("src","images/z_Led-Verte.gif")

	// Initialisation du KaTZPit à zero
	console.log("KATZ-Pit Initialisé")
	//console.log(KaTZPit_data)

	// Lancement de la boucle de rafraichissement du KaTZ-Pit
	mytimer = setInterval(main, 200);
	
}

function serverws_Message(event){

	received_msg = event.data

	// stockage du message sous forme d'objet
	var new_data = JSON.parse(received_msg)
	//console.log("message received",new_data);
	
	var dataref;
	
	// Transfert des données recues dans le tableau KaTZ-Pit_Data
	for (dataref in new_data){
		KaTZPit_data[dataref]=new_data[dataref]
		}
		
	// Si reception d'un Ping, on répond sur le canal 8
	if (KaTZPit_data["Ping"] != KaTZPit_data["Ping_old"]){
		CmdSiocSpe(7, KaTZPit_data["Ping"])
		KaTZPit_data["Ping_old"] = KaTZPit_data["Ping"]
	}
		
}

function serverws_Close(){
	console.log("Deconnection du Serveur");
	$("#Led_Connect").attr("src","images/z_Led-Rouge_2020.gif")
	
	clearInterval(mytimer);
}

function serverws_Error(error){
	console.log("Erreur serveur : ");
	$("#Led_Connect").attr("src","images/z_Led-Rouge_2020.gif")
}

// Envoi de Commande vers Sioc>DCS, Argument Num voir Liste des Commandes DCS 

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

function CmdSiocSpe2(Num, Val) {
	
	var timer_delai
	var timer_capot = 20
	// Envoi de la commande d'ouverture du capot
	CmdSiocSpe(Num, Val)
	
	// Envoi du basculement de l'interrupteur
	timer_delai = setTimeout(function(){CmdSiocSpe(Num, Val)},timer_capot)
	
	
}



