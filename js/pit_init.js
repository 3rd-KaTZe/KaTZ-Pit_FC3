
// Les données affichées par le KaTZ-Pit sont stockées dans une liste KaTZPit_data
// Les valeurs de cette liste sont mise à jour avec les données provenant du KaTZ-Link
// Cette fonction permet d'initialiser les valeurs au démarrage ou reboot

function panel_On_init(){

	console.log("Initialisation des panels affichés")

var Panel_On = { Init:0, Breakers:0, Electric_DC:0, Electric_AC:0, APU:0, Oil:1, Start:0, Rotor:1, Analog_1:0, Analog_2:0, 
	ARK_9:0, ARK_UD:0, Doppler:0, Radio_360:1, Fuel:1, Vierge:0, Navigation:1, Target:1, Weapon:1, UV26:0, ILS:1, ILS_15:0,
	CheckList:0, FreqList:0,
	Pilototo:1,Datalink:0, Abris:0}

return (Panel_On);

}

function paneldata_init(){
	
	console.log("Initialisation des données du KaTZ-Pit")

	var KaTZPit_data = {Error:0, Ping:0, Ping_old:0, Ordre1:0, Ordre2:0, DCS_Focus:0, Plane_Id:50, Test_val:0,
		Clock:0, TimeMis:0, TimeFly:0, TimeFly_Start:0, Shoot_time:99, Chrono:0, Chrono_Start:0,
		IAS:0, TAS:8888, QNH:0, QFE:0, AltiRad_DX:50005000, AltiRad_FI:555, Mach:0, Vario:0, Vari_unit:1, QNH_Base:7600,
		AoA:0, Acc_G:0, Acc_Gmax:0, Acc_Gmin:0, Bille:0,
		Pitch:0, Bank:00, Yaw:0, ADI_FI:50005000, 
		Way:90, Route:360, Cap:0, WP_dist:0, WP_num:88, Bullseye:0, EUP:50005000,
		Eng_rpm:50005000, Eng_temp:50005000, Eng_conso:50005000, Power_L:0, Power_R:0, Power_X:0, COff:0,
		RPM_Rot:0, Pitch_Rot:1, Eng_Oil_deg:50005000, GB_Oil_deg:50005000, Eng_Oil_pre:50005000, GB_Oil_pre:50005000,
		APU_Data:50005000, APU_Voyants:5555, APU_Typ:0,
		Start_V:55, Start_Sel:0, Start_Typ:0,
		Fuel_1:0, Fuel_2:0, Conso:0, Fuel_V:555, Fuel_P:555, Fuel_PE:5555,
		E_DC_V:55555, E_AC_V:5555,	E_DC_SW:55555555, E_AC_SW:55555, 
		AP_KA1:5555, AP_KA2:555, TGT_KA:55555,
		Cockpit:0, Train:555555, WheelBrk:0, BrakePress:0,
		ARKUD:55500555,	ARK9_SW:55555, ARK9_F: 51506290, ARK9_Data:50005000, ARK9_T_Main:150, ARK9_T_Stby:150,
		Doppler_d1:50005000, Doppler_d2:50005000, Doppler_f:555,
		D15_drift:50005000, D15_drift_V:55, Sling_2D:50005000, Sling_3D:50005000, 
		DLinkL1:0, DLinkL2:0, DLinkL3:0, Tgt_Btn:5555, Wpn_Ka:55555555, Wpn_Lamp:55, Wpn_Flag:55555,Wpn_Ammo:50005000,Wpn_SW_1:555555,
		UV26_Data:50005000, UV26_Flag:5555, Abris1:50005000, Abris2:50005000, Abris3:50005000,
		Collectif:0,
		LowAlt:0,
		FL_mode:0, FL_main:0, FL_main_old:0,
		TAS_Opt:"---", Playtime:"---", 
		Flaps_Pos:55, AF_Pos:55, Gear_Pos:66,
		ILS_lat:0, ILS_up:0, Rwy_x:0, 
		WPS_select:0, WPS_S_old:0, Tank:0, Canon_Ammo:888, WP_check:1,	
		WPS1_Q:0,WPS2_Q:0,WPS3_Q:0,WPS4_Q:0,WPS5_Q:0,WPS6_Q:0,WPS7_Q:0,WPS8_Q:0,WPS9_Q:0,WPS10_Q:0,WPS11_Q:0,WPS12_Q:0,WPS13_Q:0, 
		WPS1_T:0,WPS2_T:0,WPS3_T:0,WPS4_T:0,WPS5_T:0,WPS6_T:0,WPS7_T:0,WPS8_T:0,WPS9_T:0,WPS10_T:0,WPS11_T:0,WPS12_T:0,WPS13_T:0,
		Shoot_time:888, Master_Warn:0, Alarm_Data:555555555,
		TGT1_deg:360, TGT1_km:888, TGT2_deg:360, TGT2_km:888, TGT3_deg:360, TGT3_km:888, TGT_keyin:"", TGT_select:1,
		T1_km:0, T1_deg:0, T2_km:0, T2_deg:0, T3_km:0, T3_deg:0, WPR1:1, WPR2:1, WPR3:1,
		Freq_main:310, Freq_sub:100, Radiotype:1,
		Chan_1_main:310, Chan_2_main:320, Chan_3_main:330, Chan_4_main:340, Chan_1_dec:100, Chan_2_dec:200, Chan_3_dec:300, Chan_4_dec:400, TS_Chan:000,
		Active_main:310, Active_sub:100, Active_chan:1,	VT_M1:0, VT_M2:0, VT_M3:0,
		}
	
	console.log("KaTZPit_data Initialisé")

	return (KaTZPit_data);

}




function RWY_init(){
	
	console.log("Initialisation des positions X de piste")
	
	var RWY_data = {
	0:"-----",
	1889207:"04 ANAPA", 1215149:"04 ANAPA",
	730174:"22 KRYMSK", 35910:"22 KRYMSK",
	1262619:"27 KASNO CTR", 1215569:"27 KASNO CTR",
	456659:"05 KRASNO PASH", 157079:"05 KRASNO PASH",
	5429721:"04 NOVORO", 4760892:"04 NOVORO",
	6418658:"04 GELENDZHIK",5729214:"04 GELENDZHIK",
	1245388:"22 MAYKOP",1944822:"22 MAYKOP",
	17292878:"06 SOCHI", 16870428:"06 SOCHI",
	21246093:"33 GUDAUTA",20458910:"33 GUDAUTA",
	22860140:"30 SUKHUMI", 22458768:"30 SUKHUMI",
	28030503:"09 SENAKI" , 28104253:"09 SENAKI",
	28984993:"08 KUTAISI", 28736931:"08 KUTAISI",
	32411390:"07 KOBULETI", 32103571:"07 KOBULETI",
	34535868:"13 BATUMI", 35059587:"13 BATUMI",
	32109396:"31 TBILISI", 32663475:"31 TBILISI",
	30572334:"13 SOGANLUG", 31177784:"13 SOGANLUG",
	30622662:"14 VAZIANI", 31264425:"14 VAZIANI",
	5895173:"30 MINERAL", 5510549:"30 MINERAL",
	8578544:"08 MOZDOK", 8465182:"08 MOZDOK",
	11473410:"24 NAL'CHIK", 11983089:"24 NAL'CHIK",
	14749182:"10 BESLAN",14804128:"10 BESLAN",

	}
	
	return (RWY_data);

}

function fl_mode_init(){

	console.log("Initialisation des données de mode de vol")
	
	var FLmod_data = {
		0:"---",
		11:"ENR", 12:"RET", 13:"LAND", 
		21:"GUN", 22:"RWS", 23:"TWS", 24:"STT", 
		33:"V_Scan", 34:"Bore", 35:"Helmet", 
		61:"Flood", 
		71:"UnGui", 72:"PinP", 73:"ETS", 
		99:"OFF",
	}
	
	return (FLmod_data);

}

function weapon_name_init(){

	console.log("Initialisation des noms d'armement")
	
	var Weapon_name = {
		0:"---",
		1034317:"Tank",
		4040710:"R60",4040718:"R73",4040715:"R27T",4040716:"R27ET",
		4040719:"R77",
		4040713:"R27R",4040714:"R27ER",
		4155082:"Ver",4155083:"Blu",4155084:"Bla",4155085:"Jau",4155086:"Ora",4155066:"Rou",
		4073455:"B8-OFP",4073332:"B8-KOM",4073330:"B8-TSM",4073334:"S24",
		4050906:"FAB-250",4050907:"FAB-500",4053703:"BetAB500",4053704:"BetAB500Sh",
		4050966:"KGMU-96",4050965:"KGMU",
		4053818:"RBK-250",4053820:"RBK-500",4053890:"RBK-500U",
	}
	return (Weapon_name);
}


function weapon_name_type(){

	console.log("Initialisation des types d'armement")
	
	var Weapon_type = {
		0:"---",
		1034310:"Tnk", 1034317:"Tnk", 1034354:"TnK",1034361:"TnK",
		4040710:"X2",4040718:"X2",4040715:"X2",4040716:"X2",
		4040719:"X3", 4040721:"7M",4040722:"9M", 4040724:"120B",
		4040713:"X1",4040714:"X1", 
		4040806:"120C", 4040835:"9P",
		4040845:"K25L",4040846:"Kh58",4040849:"K29L",4040858:"Vkr",4040875:"K29T",
		4040933:"S25L",
		4050906:"FB2",4050907:"FB5",4050965:"???",
		4053703:"Bet",4053704:"Bet",
		4050966:"KGU",4050965:"KGU",
		4053612:"KAB",
		4053818:"RBK",4053820:"RBK",4053890:"RBK",4054963:"SAB",
		4060734:"Gun",
		4073333:"B13",4073335:"S25",4073455:"B8",4073332:"B8",4073330:"B8",4073334:"S24",
		4154419:"LLTV",4154594:"MPS",4154465:"ETS",4154673:"ECM",4154529:"ECM",
		4155082:"Fum",4155083:"Fum",4155084:"Fum",4155085:"Fum",4155086:"Fum",4155066:"Fum",
	}
	return (Weapon_type);
}

function abris_menu_init(){

	console.log("Initialisation des données de menu de l'abris")
	
	var abris_menu = {
	0:"OFF",1:"ACTIV",2:"ADD",3:"ADD LIN",4:"ADD PNT",5:"ARC",6:"AUTO",7:"CALC",8:"CANCEL",9:"CLEAR",
	10:"CTRL",11:"DELETE",12:"DRAW",13:"EDIT",14:"ENTER",15:"ERBL",16:"FPL",17:"GNSS",18:"HSI",19:"INFO",
	20:"LOAD",21:"MAP",22:"MARKER",23:"MENU",24:"MOVE",25:"NAME",26:"NAV",27:"NE",28:"REST",29:"OPTION",
	30:"PLAN",31:"PLAN",32:"SAVE",33:"SCALE -",34:"SCALE +",35:"SEARCH",36:"SELECT",37:"SETUP",38:"SUSP",39:"SYST",
	40:"TEST",41:"TGT VS",42:"TO",43:"TYPE",44:"USER",45:"VNAV",46:"VNAV TO",47:"WPT",48:""}
	
	
	return (abris_menu);

}




	