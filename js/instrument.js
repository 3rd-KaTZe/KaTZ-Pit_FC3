// --------------------------------------------------------------------
// Fonction d'Animation des instruments
// --------------------------------------------------------------------

// F15 ---------------------------------------

	
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
	var m_gain = 1.2


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


	
