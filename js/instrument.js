// --------------------------------------------------------------------
// Fonction d'Animation des instruments
// --------------------------------------------------------------------

// Instrument de vol du F-15 ********************************************************************
// AoA du F15 ---------------------------------------
function instrument_AoA_F15(angle){

	var a_origine = -100
	var a_gain = -2.72  //-7.5 par rapport à valeur exporté ?? valeur exporté est zarbi ??
	
	$("#AIG_AoA").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*angle)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*angle)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*angle)+'deg)',
	})
}

function instrument_Mach_F15(speed){

	var s_origine = 0
	var s_gain = 0.49
	var speedi = speed 
	
	if (speed>100) {s_gain = 0.5}
	if (speed>300) {s_gain = 0.502}
	if (speed>400) {s_gain = 0.31 ; s_origine = 200 ; speedi = speed - 400}
	if (speed>500) {s_gain = 0.30 ; s_origine = 231 ; speedi = speed - 500}
	if (speed>600) {s_gain = 0.30 ; s_origine = 261 ; speedi = speed - 600}
	if (speed>700) {s_gain = 0.16 ;	s_origine = 290 ; speedi = speed - 700}
	if (speed>800) {s_gain = 0.15 ; s_origine = 306 ; speedi = speed - 800}
	if (speed>900) {s_gain = 0.17 ; s_origine = 321 ; speedi = speed -900}
	
	
	$("#AIG_Mach").css({
		'-moz-transform':'rotate('+(s_origine+s_gain*speedi)+'deg)',
		'-webkit-transform':'rotate('+(s_origine+s_gain*speedi)+'deg)',
		'-ms-transform':'rotate('+(s_origine+s_gain*speedi)+'deg)',
	})
}

function instrument_GMetre_F15(ge){

	var a_origine = -120
	var a_gain = 25
	
	$("#AIG_GM").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*ge)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*ge)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*ge)+'deg)',
	})
}

function instrument_AltiBaro_F15(alti){

	var a_origine = 0
	var a_gain = 0.36
	
	$("#AIG_AltiBaro").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
	})
}

// Instrument de vol du SU-25 ********************************************************************
// Aiguilles du G-mètre avec (valeur,min,max) appareils russes --------------------------
function instrument_G_25(val,min,max){
	var a_origine = 150
	var a_gain = -13
	
	$("#AA_G").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
	})

	$("#AA_Gmin").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
	})

	$("#AA_Gmax").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
	})
}

function instrument_G_29(val,min,max){
	var a_origine = 145
	var a_gain = -12
	
	$("#AA_G").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
	})

	$("#AA_Gmin").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
	})

	$("#AA_Gmax").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
	})
}



// ADI appareils russes  ---------------------------
function instrument_ADI(bank,yaw,pitchin){
	var b_origine = 0
	var b_gain = 1

	// Taux de roulis sur l'ADI
	$("#AA_Bank").css({
		'-moz-transform':'rotate('+(b_origine+b_gain*bank)+'deg)',
		'-webkit-transform':'rotate('+(b_origine+b_gain*bank)+'deg)',
		'-ms-transform':'rotate('+(b_origine+b_gain*bank)+'deg)',
	})

	// Taux de roulis sur l'ILS
	$("#IA_Bank").css({
		'-moz-transform':'rotate('+(b_origine+b_gain*bank)+'deg)',
		'-webkit-transform':'rotate('+(b_origine+b_gain*bank)+'deg)',
		'-ms-transform':'rotate('+(b_origine+b_gain*bank)+'deg)',
	})
	
	// Translation Yaw indicateur
	// 34px pour 10 °/mn
	var y_origine = 0
	var y_gain = 3.4
	
	$("#AA_Yaw").css({
	// fonction de base >> '-moz-transform':'translate(100px,0px)',
	'-moz-transform':'translate('+(y_origine + y_gain * yaw)+'px,0px)',
	'-webkit-transform':'translate('+(y_origine + y_gain * yaw)+'px,0px)',
	'-ms-transform':'translate('+(y_origine + y_gain * yaw)+'px,0px)',
	})
	
	
	// Boule de l'ADI
	var pitch = pitchin 
	var valabs = Math.abs(pitchin)
	var signe = pitchin / valabs
	if (valabs > 50) { pitch = 50 * signe }
	
	var pitch_strech = (45 + pitch) / 90
	var pitch_origin = 0
	var pitch_gain = 1.5
	
	
		
	

	// expansion compression de la zone Top
	// Top Bleu Clair, on fixe l'origine du "scale down" en haut
	$("#ADI_Pitch_T").css({
	'-moz-transform-origin':'top left',
	'-webkit-transform-origin':'top left',
	'-ms-transform-origin':'top left',
	})

	// Scale vertical
	$("#ADI_Pitch_T").css({
	'-moz-transform':'scaleY('+pitch_strech+')',
	'-webkit-transform':'scaleY('+pitch_strech+')',
	'-ms-transform':'scaleY('+pitch_strech+')',
	})
	
	// Translation vers le bas , de la barre d'horizon
	
	$("#ADI_Pitch_C").css({
	'-moz-transform':'translate(0px,'+(pitch_origin + pitch_gain * pitch)+'px)',
	'-webkit-transform':'translate(0px,'+(pitch_origin + pitch_gain * pitch)+'px)',
	'-ms-transform':'translate(0px,'+(pitch_origin + pitch_gain * pitch)+'px)',
	})
	
}

// Aiguille de l'indicateur d'AoA  appareils russes  ---------------------------------
function instrument_AoA(aoa){
	var a_origine = 218
	var a_gain = 3.4
	
	$("#AA_AoA").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*aoa)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*aoa)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*aoa)+'deg)',
	})
}

function instrument_Vario_F15(vario){

	var v_origine = -90
	var v_gain = 0.05
	var varioi = vario
	
	var valabs = Math.abs(vario)
				
	if (valabs > 1000) {v_gain = 0.035 ;
	v_origine = -90 + 50 * vario / valabs ;
	varioi = (valabs - 1000) * vario / valabs
	}

	if (valabs > 2000) {v_gain = 0.022 ;
	v_origine = -90 + 85 * vario / valabs ;
	varioi = (valabs - 2000) * vario / valabs
	}
	
	if (valabs > 6000) {v_gain = 0 ;
	v_origine = -90 + 175 * vario / valabs
	}
				
	$("#AIG_Vario").css({
		'-moz-transform':'rotate('+(v_origine+v_gain*varioi)+'deg)',
		'-webkit-transform':'rotate('+(v_origine+v_gain*varioi)+'deg)',
		'-ms-transform':'rotate('+(v_origine+v_gain*varioi)+'deg)',
	})
}


function instrument_AltiBaro_SU25(alti){

	var a_origine = 0
	var a_gain = 0.36
	
	$("#AIG_AltiBaro").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
	})
}

function instrument_IAS_SU25(ias,tas){
	var i_origine = 0
	var i_gain = 0.11
	var i_ias = ias 

	if (ias>100) {i_gain = 0.37 ; i_origine = 11 ; i_ias = ias - 100}
	if (ias>200) {i_gain = 0.47 ; i_origine = 48 ; i_ias = ias - 200}
	if (ias>400) {i_gain = 0.28 ; i_origine = 142 ; i_ias = ias - 400}
	if (ias>900) {i_gain = 0.32 ; i_origine = 282 ; i_ias = ias - 900}
	

	$("#AIG_IAS25").css({
		'-moz-transform':'rotate('+(i_origine+i_gain*i_ias)+'deg)',
		'-webkit-transform':'rotate('+(i_origine+i_gain*i_ias)+'deg)',
		'-ms-transform':'rotate('+(i_origine+i_gain*i_ias)+'deg)',
	})


	var t_origine = -188
	var t_gain = -0.47
	
	$("#AIG_Mach25").css({
		'-moz-transform':'rotate('+(t_origine+t_gain*tas)+'deg)',
		'-webkit-transform':'rotate('+(t_origine+t_gain*tas)+'deg)',
		'-ms-transform':'rotate('+(t_origine+t_gain*tas)+'deg)',
	})
}

// Instrument de vol du Mig-29 ********************************************************************

function instrument_IAS_M29(ias){
	var i_origine = 0
	var i_gain = 0.36


	$("#AIG_IAS29").css({
		'-moz-transform':'rotate('+(i_origine+i_gain*ias)+'deg)',
		'-webkit-transform':'rotate('+(i_origine+i_gain*ias)+'deg)',
		'-ms-transform':'rotate('+(i_origine+i_gain*ias)+'deg)',
	})

}

function instrument_AltiBaro_M29(alti){
	var a_origine = 0
	var a_gain = 0.36
	
	var b_gain = 12


	$("#AIG_AB_29").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
	})
	
	$("#AIG_AB1000_29").css({
		'-moz-transform':'rotate('+(a_origine+b_gain*alti/1000)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+b_gain*alti/1000)+'deg)',
		'-ms-transform':'rotate('+(a_origine+b_gain*alti/1000)+'deg)',
	})

}

function instrument_Mach_M29(mach){
	var m_origine = 0
	var m_gain = 0.12


	$("#AIG_Mach_29").css({
		'-moz-transform':'rotate('+(m_origine+m_gain*mach)+'deg)',
		'-webkit-transform':'rotate('+(m_origine+m_gain*mach)+'deg)',
		'-ms-transform':'rotate('+(m_origine+m_gain*mach)+'deg)',
	})

}


function instrument_Vario_M29(vari,yaw,bille){
	var v_origine = -90
	var v_gain = 3
	
	var vario = vari 
	var valabs = Math.abs(vari)
	
	if (valabs > 20) {v_gain = 0.7 ;
	v_origine = -90 + 50 * vari / valabs ;
	vario = (valabs - 20) * vari / valabs
	}
	
	if (valabs > 50) {v_gain = 0.66 ;
	v_origine = -90 + 71 * vari / valabs ;
	vario = (valabs - 50) * vari / valabs
	}
	
	if (valabs > 100) {v_gain = 0.152 ;
	v_origine = -90 + 104 * vari / valabs ;
	vario = (valabs - 100) * vari / valabs
	}

	
	$("#AIG_Vario_29").css({
		'-moz-transform':'rotate('+(v_origine+v_gain*vario)+'deg)',
		'-webkit-transform':'rotate('+(v_origine+v_gain*vario)+'deg)',
		'-ms-transform':'rotate('+(v_origine+v_gain*vario)+'deg)',
	})
	
	var y_origine = 0
	var y_gain = 0
	
	$("#AIG_Yaw_29").css({
		'-moz-transform':'rotate('+(y_origine+y_gain*yaw)+'deg)',
		'-webkit-transform':'rotate('+(y_origine+y_gain*yaw)+'deg)',
		'-ms-transform':'rotate('+(y_origine+y_gain*yaw)+'deg)',
	})
	
	// Translation Bille
	var b_origine = 0
	var b_gain = 0.35


	// valat : positif = Translation vers la droite
	$("#AIG_Bille_29").css({
	'-moz-transform':'translate('+(b_origine + b_gain * bille)+'px,0px)',
	'-webkit-transform':'translate('+(b_origine + b_gain * bille)+'px,0px)',
	'-ms-transform':'translate('+(b_origine + b_gain * bille)+'px,0px)',
	})

}

function instrument_AltiRad_Mig29(altirad){
	var i_origine = 0
	var i_gain = 1.5
	
	var i_alti = altirad 

	if (altirad>60) {i_gain = 1.7 ; i_origine = 90 ; i_alti = altirad - 60}
	if (altirad>100) {i_gain = 0.18 ; i_origine = 158 ; i_alti = altirad - 100}
	if (altirad>900) {i_gain = 0.14 ; i_origine = 298 ; i_alti = altirad - 900}
	

	$("#AIG_AR29").css({
		'-moz-transform':'rotate('+(i_origine+i_gain*i_alti)+'deg)',
		'-webkit-transform':'rotate('+(i_origine+i_gain*i_alti)+'deg)',
		'-ms-transform':'rotate('+(i_origine+i_gain*i_alti)+'deg)',
	})

}

// Instrument de vol du SU-33 ********************************************************************

function instrument_GAoA_SU33(val,min,max,AoA){
	var a_origine = 127
	var a_gain = -10
	
	$("#AA_G").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*val)+'deg)',
	})

	$("#AA_Gmin").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*min)+'deg)',
	})

	$("#AA_Gmax").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*max)+'deg)',
	})
	
	var ao_origine = 218
	var ao_gain = 3.4
	
	$("#AA_AoA").css({
		'-moz-transform':'rotate('+(ao_origine+ao_gain*AoA)+'deg)',
		'-webkit-transform':'rotate('+(ao_origine+ao_gain*AoA)+'deg)',
		'-ms-transform':'rotate('+(ao_origine+ao_gain*AoA)+'deg)',
	})
}

function instrument_IAS_SU33(ias,mach){
	var i_origine = 0
	var i_gain = 0.1
	var i_ias = ias 

	if (ias>100) {i_gain = 0.33 ; i_origine = 10 ; i_ias = ias - 100}
	if (ias>500) {i_gain = 0.27 ; i_origine = 143 ; i_ias = ias - 500}
	if (ias>600) {i_gain = 0.2 ; i_origine = 170 ; i_ias = ias - 600}
	if (ias>1000) {i_gain = 0.15 ; i_origine = 250 ; i_ias = ias - 1000}
	if (ias>1300) {i_gain = 0.12 ; i_origine = 295 ; i_ias = ias - 1300}
		
	var rot_ias = i_origine + i_gain * i_ias
	

	$("#AIG_IAS33").css({
		'-moz-transform':'rotate('+(i_origine+i_gain*i_ias)+'deg)',
		'-webkit-transform':'rotate('+(i_origine+i_gain*i_ias)+'deg)',
		'-ms-transform':'rotate('+(i_origine+i_gain*i_ias)+'deg)',
	})

	// Pour compenser la correction Mach vs Altitude
	// On fait tourner la couronne des mach de -20° pour 10000m
	// Soit un Mach qui passe de 1222km/hr à 1092km/hr
	
	var m_origine = 0
	var m_gain = 0
	var m_mach = mach
	
	if (mach > 50) {m_gain = 2.4 ; m_origine = 0 ; m_mach = mach - 50}
	if (mach > 70) {m_gain = 2.2 ; m_origine = 48 ; m_mach = mach - 70}
	if (mach > 100) {m_gain = 1.7 ; m_origine = 113 ; m_mach = mach - 100}
	if (mach > 130) {m_gain = 1.5 ; m_origine = 163 ; m_mach = mach - 130}
	if (mach > 140) {m_gain = 1.2 ; m_origine = 178 ; m_mach = mach - 140}
	if (mach > 150) {m_gain = .74 ; m_origine = 190 ; m_mach = mach - 150}
	if (mach > 200) {m_gain = .54 ; m_origine = 127 ; m_mach = mach - 200}
	if (mach > 250) {m_gain = .52 ; m_origine = 154 ; m_mach = mach - 250}
	
	var rot_mach = m_origine + m_gain * m_mach
	var rot_mach_disk = rot_ias - rot_mach - 140

	$("#AIG_Mach33").css({
		'-moz-transform':'rotate('+(rot_mach_disk)+'deg)',
		'-webkit-transform':'rotate('+(rot_mach_disk)+'deg)',
		'-ms-transform':'rotate('+(rot_mach_disk)+'deg)',
	})
	
	$("#Acache_Mach33").css({
		'-moz-transform':'rotate('+(rot_ias/6)+'deg)',
		'-webkit-transform':'rotate('+(rot_ias/6)+'deg)',
		'-ms-transform':'rotate('+(rot_ias/6)+'deg)',
	})

}



function instrument_AltiRad_SU33(altirad){
	var i_origine = 0
	var i_gain = 1.1
	
	var i_alti = altirad 

	if (altirad>150) {i_gain = 0.54 ; i_origine = 165 ; i_alti = altirad - 150}
	if (altirad>200) {i_gain = 0.4 ; i_origine = 192 ; i_alti = altirad - 200}
	if (altirad>250) {i_gain = 0.32 ; i_origine = 212 ; i_alti = altirad - 250}
	if (altirad>300) {i_gain = 0.22 ; i_origine = 228 ; i_alti = altirad - 300}
	if (altirad>400) {i_gain = 0.15 ; i_origine = 250 ; i_alti = altirad - 400}
	if (altirad>500) {i_gain = 0.1 ; i_origine = 265 ; i_alti = altirad - 500}
	if (altirad>600) {i_gain = 0.07 ; i_origine = 275 ; i_alti = altirad - 600}
	if (altirad>900) {i_gain = 0.04 ; i_origine = 296 ; i_alti = altirad - 900}
	if (altirad>1000) {i_gain = 0.03 ; i_origine = 300 ; i_alti = altirad - 1000}
	

	$("#AIG_AR33").css({
		'-moz-transform':'rotate('+(i_origine+i_gain*i_alti)+'deg)',
		'-webkit-transform':'rotate('+(i_origine+i_gain*i_alti)+'deg)',
		'-ms-transform':'rotate('+(i_origine+i_gain*i_alti)+'deg)',
	})

}

function instrument_AltiBaro_SU33(alti){
	var a_origine = 0
	var a_gain = 0.36
	
	var b_gain = 36


	$("#AIG_AB_33").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
	})
	
	$("#AIG_AB1000_33").css({
		'-moz-transform':'rotate('+(a_origine+b_gain*alti/1000)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+b_gain*alti/1000)+'deg)',
		'-ms-transform':'rotate('+(a_origine+b_gain*alti/1000)+'deg)',
	})

}


function instrument_Vario_SU33(vari){
	var v_origine = -90
	var v_gain = 4.5
	
	var vario = vari 
	var valabs = Math.abs(vari)
	var signe = vari / valabs
	
	if (valabs > 10) {v_gain = 3.4 ;
	v_origine = -90 + 44 * signe ;
	vario = (valabs - 10) * signe
	}
	
	if (valabs > 20) {v_gain = 2.3 ;
	v_origine = -90 + 78 * signe ;
	vario = (valabs - 20) * signe
	}
	
	if (valabs > 60) {v_gain = 0 ;
	v_origine = -90 + 170 * signe
	}
	
	
	
	$("#AIG_Vario_33").css({
		'-moz-transform':'rotate('+(v_origine+v_gain*vario)+'deg)',
		'-webkit-transform':'rotate('+(v_origine+v_gain*vario)+'deg)',
		'-ms-transform':'rotate('+(v_origine+v_gain*vario)+'deg)',
	})

}

// Instrument de vol du SU-27 ********************************************************************

function instrument_AltiBaro_SU27(alti){
	var a_origine = 0
	var a_gain = 0.36
	
	var b_gain = 18


	$("#AIG_AB_29").css({
		'-moz-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
		'-ms-transform':'rotate('+(a_origine+a_gain*alti)+'deg)',
	})
	
	$("#AIG_AB1000_29").css({
		'-moz-transform':'rotate('+(a_origine+b_gain*alti/1000)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+b_gain*alti/1000)+'deg)',
		'-ms-transform':'rotate('+(a_origine+b_gain*alti/1000)+'deg)',
	})

}


// Instrument Moteur du F-15 ********************************************************************
function instrument_EngRPM_F15(l,r){
	var a_origine = 60
	var l_gain = .22
	var r_gain = .22
	

	$("#AM_RPM_L").css({
		'-moz-transform':'rotate('+(a_origine+l_gain*l)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+l_gain*l)+'deg)',
		'-ms-transform':'rotate('+(a_origine+l_gain*l)+'deg)',
	})

	$("#AM_RPM_R").css({
		'-moz-transform':'rotate('+(a_origine+r_gain*r)+'deg)',
		'-webkit-transform':'rotate('+(a_origine+r_gain*r)+'deg)',
		'-ms-transform':'rotate('+(a_origine+r_gain*r)+'deg)',
	})
}

function instrument_EngTemp_F15(left,right){
	var t_origine = 20
	var t_gain = 0.2
	
	$("#AM_TEMP_L").css({
		'-moz-transform':'rotate('+(t_origine+t_gain*left)+'deg)',
		'-webkit-transform':'rotate('+(t_origine+t_gain*left)+'deg)',
		'-ms-transform':'rotate('+(t_origine+t_gain*left)+'deg)',
	})
	
	$("#AM_TEMP_R").css({
		'-moz-transform':'rotate('+(t_origine+t_gain*right)+'deg)',
		'-webkit-transform':'rotate('+(t_origine+t_gain*right)+'deg)',
		'-ms-transform':'rotate('+(t_origine+t_gain*right)+'deg)',
	})
}

function instrument_EngFF_F15(left,right){
	var t_origine = 60
	var t_gain = 0.24
	
	$("#AM_FF_L").css({
		'-moz-transform':'rotate('+(t_origine+t_gain*left)+'deg)',
		'-webkit-transform':'rotate('+(t_origine+t_gain*left)+'deg)',
		'-ms-transform':'rotate('+(t_origine+t_gain*left)+'deg)',
	})
	
	$("#AM_FF_R").css({
		'-moz-transform':'rotate('+(t_origine+t_gain*right)+'deg)',
		'-webkit-transform':'rotate('+(t_origine+t_gain*right)+'deg)',
		'-ms-transform':'rotate('+(t_origine+t_gain*right)+'deg)',
	})
}

// Instrument Moteur du SU-33 ********************************************************************

function instrument_EngRPM_RU(left,right){
	var l_origine = 50
	var r_origine = 50
	var l_gain = 0.32
	var r_gain = 0.32

	
	var l = left 
	if (left>500) {l_gain = 0.305 ; l_origine = 210 ; l = left - 500}
	if (left>700) {l_gain = 0.3 ; l_origine = 270 ; l = left - 700}

	var r = right 
	if (right>500) {r_gain = 0.305 ; r_origine = 210 ; r = right - 500}
	if (right>700) {r_gain = 0.3 ; r_origine = 270 ; r = right - 700}


	$("#AM_RPM_L").css({
		'-moz-transform':'rotate('+(l_origine+l_gain*l)+'deg)',
		'-webkit-transform':'rotate('+(l_origine+l_gain*l)+'deg)',
		'-ms-transform':'rotate('+(l_origine+l_gain*l)+'deg)',
	})

	$("#AM_RPM_R").css({
		'-moz-transform':'rotate('+(r_origine+r_gain*r)+'deg)',
		'-webkit-transform':'rotate('+(r_origine+r_gain*r)+'deg)',
		'-ms-transform':'rotate('+(r_origine+r_gain*r)+'deg)',
	})
}


function instrument_EngTemp_SU33(left,right){
	var t_origine = -135
	var t_gain = 0.225
	
	var m_origine = 180
	var m_gain = 3.6
	var leftm = left % 100
	var rightm = right % 100
	
	$("#AM_TEM_L").css({
		'-moz-transform':'rotate('+(t_origine+t_gain*left)+'deg)',
		'-webkit-transform':'rotate('+(t_origine+t_gain*left)+'deg)',
		'-ms-transform':'rotate('+(t_origine+t_gain*left)+'deg)',
	})
	
	$("#AM_TEM_R").css({
		'-moz-transform':'rotate('+(t_origine+t_gain*right)+'deg)',
		'-webkit-transform':'rotate('+(t_origine+t_gain*right)+'deg)',
		'-ms-transform':'rotate('+(t_origine+t_gain*right)+'deg)',
	})
	
	$("#AM_TEM_mL").css({
		'-moz-transform':'rotate('+(m_origine+m_gain*leftm)+'deg)',
		'-webkit-transform':'rotate('+(m_origine+m_gain*leftm)+'deg)',
		'-ms-transform':'rotate('+(m_origine+m_gain*leftm)+'deg)',
	})
	
	$("#AM_TEM_mR").css({
		'-moz-transform':'rotate('+(m_origine+m_gain*rightm)+'deg)',
		'-webkit-transform':'rotate('+(m_origine+m_gain*rightm)+'deg)',
		'-ms-transform':'rotate('+(m_origine+m_gain*rightm)+'deg)',
	})
}

// Instrument Moteur du SU-25 ********************************************************************
function instrument_EngTemp_SU25(left,right){
	var t_origine = -162
	var t_gain = 0.25
	
	var i_left = Math.max (left,200)
	var i_right = Math.max (right,200)
	
	
	$("#AM_TEM_L").css({
		'-moz-transform':'rotate('+(t_origine+t_gain*i_left)+'deg)',
		'-webkit-transform':'rotate('+(t_origine+t_gain*i_left)+'deg)',
		'-ms-transform':'rotate('+(t_origine+t_gain*i_left)+'deg)',
	})
	
	$("#AM_TEM_R").css({
		'-moz-transform':'rotate('+(t_origine+t_gain*i_right)+'deg)',
		'-webkit-transform':'rotate('+(t_origine+t_gain*i_right)+'deg)',
		'-ms-transform':'rotate('+(t_origine+t_gain*i_right)+'deg)',
	})

}


	
