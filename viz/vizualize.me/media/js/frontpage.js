var signup_errors = signup_errors || {};
var login_errors = login_errors || {};
var forgot_errors = forgot_errors || {};
var reset_errors = reset_errors || {};
var phrase = {
	'username': "Username",
	'password': "Password",
	'email': "Email Address",
	'defaultUsername': "your_username",
	'signupText': "We'll grab some information from your LinkedIn account to generate your Inforgraphic. Your data will be saved, but we don't post anything back to your LinkedIn."
};

function setDefaultText(element, defaultText) {
	var result = false;
	var el = (typeof element === "string") ? $(element) : element;
	if (el.val() === "") {
		el.val(defaultText);
		result = true;
	}
	
	el.focus(function () {
		if ($(this).val() === defaultText) {
			$(this).val("");
		}
	});
	el.blur(function () {
		if ($(this).val() === "") {
			$(this).val(defaultText);
		}
	});
	
	return result;
}

function showLogin(isInstant) {
	if (!isInstant) {
		$('#modal-glass').fadeIn();
		$('#modal-box').fadeIn();
	} else {
		$('#modal-glass').fadeIn();
		$('#modal-box').fadeIn();
	}
	$('#login-form').show();
	$('#signup-form').hide();
	$("#signup_username").parent().qtip('hide');
	$("#signup_email").parent().qtip('hide');
	$("#signup_password").parent().qtip('hide');
}

function hideLogin() {
	$('#modal-glass, #modal-box').hide();
	$('#login-form').show();
	$("#login_email, #login_password").parent().qtip('hide');
	$("#login_email, #login_password").qtip('hide');
	$("#forgot_email").parent().qtip('hide');
	$("#forgot_email").qtip('hide');
	$("#reset_password, #reset_confirm_password").parent().qtip('hide');
	$("#reset_password, #reset_confirm_password").qtip('hide');
	$('#forgot-password, #reset-password, #requested-forgot-password, #completed-reset-password').hide();
	$('#signup_username').qtip('hide');
	$('#signup_email').qtip('hide');
	$("#signup_password").qtip('hide');
}

function showResetPasswordForm() {
	showLogin();
	$('#login-form').hide();
	//$('#modal-shadow').css('height', '230px');
	$('#reset-password').show();
}

function showForgotPasswordForm() {
	showLogin();
	$('#login-form').hide();
	//$('#modal-shadow').css('height', '230px');
	$('#forgot-password').show();
}

function showSignUpForm() {
	showLogin();
	$('#login-form').hide();
	$('#signup-form').show();
}

function bindErrorTips() {
	var key;
	var has_errors = false;
	for (key in signup_errors) {
		if (signup_errors.hasOwnProperty(key)) {
			if (key === 'password') {
				drawTip($("#signup_" + key).parent(), "<span class='tip-small'>" + signup_errors[key] + "</span>", "center left", "center right", false, 'focusin', 'ui-pink', true, true);
				has_errors = true;
			} else if (key === 'form') {
				$.jnotify(signup_errors[key], "warning");
				//validateSignup($('#signup_form').get()[0]);
				has_errors = true;
			} else {
				drawTip($("#signup_" + key).parent(), "<span class='tip-small'>" + signup_errors[key] + "</span>", "center right", "center left", false, 'focusin', 'ui-pink', true, true);
				has_errors = true;
			}
		}
	}
	if (has_errors === true) {
		$('#signup_password').val('');
	}
	
	
	has_errors = false;
	for (key in login_errors) {
		if (login_errors.hasOwnProperty(key)) {
			if (key === 'form') {
				showLogin(true);
				$.jnotify(login_errors[key], "warning");
				//validateLogin($('#login_form').get()[0]);
				has_errors = true;
			} else {
				showLogin(true);
		        $("#login_" + key).focus();
				drawTip($("#login_" + key).parent(), "<span class='tip-small'>" + login_errors[key] + "</span>", "center left", "center right", false, 'focusin', 'ui-pink', true, true);
				has_errors = true;
			}
		}
	}
	if (has_errors === true) {
		$('#login_password').val('');
	}
	
	for (key in forgot_errors) {
		if (forgot_errors.hasOwnProperty(key)) {
			if (key === 'form') {
				showForgotPasswordForm();
				$.jnotify(forgot_errors[key], "warning");
				//validateLogin($('#login_form').get()[0]);
				has_errors = true;
			} else {
				showForgotPasswordForm();
		        $("#forgot_" + key).focus();
				drawTip($("#forgot_" + key).parent(), "<span class='tip-small'>" + forgot_errors[key] + "</span>", "center left", "center right", false, 'focusin', 'ui-pink', true, true);
				has_errors = true;
			}
		}
	}
	
	for (key in reset_errors) {
		if (reset_errors.hasOwnProperty(key)) {
			if (key === 'form') {
				showResetPasswordForm();
				$.jnotify(reset_errors[key], "warning");
				//validateLogin($('#login_form').get()[0]);
				has_errors = true;
			} else {
				showResetPasswordForm();
		        $("#reset_" + key).focus();
				drawTip($("#reset_" + key).parent(), "<span class='tip-small'>" + reset_errors[key] + "</span>", "center left", "center right", false, 'focusin', 'ui-pink', true, true);
				has_errors = true;
			}
		}
	}

}

function validateSignup(form) {
	var is_valid = true;
	if (form.username.value === phrase.username) {
		drawTip($(form.username), "<span id='signup_username_tip' class='tip-small'>Please enter a username.</span>", "center right", "center left", false, 'focusin', 'ui-pink', true, true);
		is_valid = false;
	}
	if (form.password.value === phrase.password) {
		drawTip($(form.password), "<span class='tip-small'>Please enter a password.</span>", "center left", "center right", false, 'focusin', 'ui-pink', true, true);
		is_valid = false;
	}
	if (form.email.value === phrase.email) {
		drawTip($(form.email), "<span class='tip-small'>Please enter an email.</span>", "center right", "center left", false, 'focusin', 'ui-pink', true, true);
		is_valid = false;
	}
	if (is_valid) {
		if (!Viz.cache.get("signup")) {
			Viz.cache.put("signup", true, 5);	// 5 second expiry
			form.submit();
		}
	}

	return is_valid;
}

function validateEmail(form) {
	var is_valid = true;
	if (form.email.value === phrase.email) {
		drawTip($(form.email), "<span class='tip-small'>Please enter a vaild email.</span>", "center left", "center right", false, 'focusin', 'ui-pink', true, true);
		is_valid = false;
	} 
	if (is_valid) {
		form.submit();
	}
	return is_valid;
}

function validatePass(form) {
	var is_valid = true;
	if (form.password.value === phrase.password) {
		drawTip($(form.password), "<span class='tip-small'>Please enter a password.</span>", "center left", "center right", false, 'focusin', 'ui-pink', true, true);
		is_valid = false;
	}
	if (is_valid) {
		form.submit();
	}
	return is_valid;
}

function validateLogin(form) {
	var is_valid = true;
	is_valid = validateEmail(form);
	is_valid &= validatePass(form);
	
	if (is_valid) {
		form.submit();
	}
	return is_valid;
}

function setUsernameLogic() {
	var element = $('#signup_username');
	var url = function (value) {
		return '/ajax/username?username=' + escape(value);
	};
	var success = function (resp, value) {
		var style = (resp && resp.code === 200) ? "color:Green" : "color:Red";
		var available = (resp && resp.code === 200) ? "available." : "not available.";
		drawTip("#signup_username", "<span class='tip-small'>http://vizualize.me/<span class='italics'>" + value + "</span> is <span style='" + style + "'>" + available + "</span></span>", "center right", "center left", 'focusin', false, 'ui-dark', true, false);
	};
	attachKeyUpAjax(element, url, success);
}

function setEmailLogic() {
	var element = $('#signup_email');
	var url = function (value) {
		return '/ajax/email?email=' + escape(value);
	};
	var success = function (resp, value) {
		var style = (resp && resp.code === 200) ? "color:Green" : "color:Red";
		var used = (resp && resp.code === 200) ? "free to use." : "taken or invalid.";
		drawTip("#signup_email", "<span class='tip-small'><span class='italics'>" + value + "</span> is <span style='" + style + "'>" + used + "</span></span>", "center right", "center left", 'focusin', false, 'ui-dark', true, false);
	};
	attachKeyUpAjax(element, url, success);
}

function showVideo() { 
	var vidyardcontainer =  document.createElement("div"); 
	vidyardcontainer.id = 'vidyard_SpaQchp4VEsrRzQy1Zb_3w'; 
	var vidyardcontainer_s = document.getElementById('vidyard_embed_code_SpaQchp4VEsrRzQy1Zb_3w'); 
	vidyardcontainer_s.parentNode.insertBefore(vidyardcontainer, vidyardcontainer_s); 
	var vidyard = document.createElement('script'); vidyard.type = 'text/javascript'; 
	vidyard.async = false; 
	vidyard.src = ('https:' === document.location.protocol ? 'https://secure.' : 'http://embed.') + 'vidyard.com/embed/SpaQchp4VEsrRzQy1Zb_3w/iframe/?'; 
	var vidyard_s = document.getElementsByTagName('script')[0]; 
	vidyard_s.parentNode.insertBefore(vidyard, vidyard_s); 
}

function getURLParameter(name) {
    return decodeURI(
        (new RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.search) || [null,null])[1]
    );
}

$(document).ready(function () {
    //Opens all external links in new window
    $('a[href*=http]').each(function () {
        if (this.href.indexOf(location.hostname) === -1) {
            $(this).click(function () {window.open(this.href); return false; });
        }
    });
	
	$('#forgot-password, #reset-password').hide();
	
	$('#forgot-link').click(function () {
		$('#login-form').hide();
		$('#modal-shadow').css('height', '230px');
		$('#forgot-password').show();
	});
	
	// bind mouseover effects
	$('.thumbs').mouseenter(function (e) {
		$(this).find('p').fadeIn(200);
    });
	
	$('.thumbs').mouseleave(function (e) {
		$(this).find('p').fadeOut(200);
    });
    
	$('#existing_login, #existing_login2').click(function (e) {
		showLogin();
	});
	
	$('#modal-box, #modal-close').click(function (e) {
		hideLogin();
	});
	$('#modal-box').children().click(function (e) {
		e.stopPropagation();
	});
	
	setDefaultText('#signup_username', phrase.username);
	setDefaultText('#signup_password', phrase.password);
	setDefaultText('#signup_email', phrase.email);
	setDefaultText('#login_email', phrase.email);
	setDefaultText('#login_password', phrase.password);
  
	//drawTip("#signup_username", "<span class='tip-small'>http://vizualize.me/<span class='italics'>" + phrase.defaultUsername + "</span></span>", "top center", "bottom center", 'focusin', 'focusout keydown', 'ui-dark');
	drawTip("#signup_linkedin", "<span class='tip-small'>" + phrase.signupText + "</span>", "center left", "center right", 'mouseenter', 'mouseleave', 'ui-dark');
	
	bindErrorTips();
	
	setUsernameLogic();
	setEmailLogic();

	if (getURLParameter('reason') !== 'null') {
		$.jnotify("LinkedIn error : " + getURLParameter('reason'), "warning");
	}

	if ($.getUrlVar() === "access_token_error") {
		$.jnotify("LinkedIn access token error. Please try again.", "warning");
	}
	
    if ($.getUrlVar() === "linkedin_permission") {
        $.jnotify("LinkedIn integration failed. Please try again.", "warning");
        $(".beta").focus();
    }
 
	if ($.getUrlVar() === "forgot_password_submitted") {
		showLogin();
		$('#login-form').hide();
		$('#modal-shadow').css('height', '130px');
		$('#requested-forgot-password').show();
    }
	
	if ($.getUrlVar() === "password_reset") {
		showLogin();
		$('#login-form').hide();
		$('#modal-shadow').css('height', '130px');
		$('#completed-reset-password').show();
    }

    if ($.getUrlVar() === "login") {
		showLogin();
    }

	if (getURLParameter('resetPassword') === '1'
			&& getURLParameter('email')
			&& getURLParameter('code')) {

		showResetPasswordForm();
		$('#reset_email').val(getURLParameter('email'));
		$('#reset_code').val(getURLParameter('code'));
	}

});

//Get Satisfaction
var is_ssl = ("https:" === document.location.protocol);
var asset_host = is_ssl ? "https://s3.amazonaws.com/getsatisfaction.com/" : "http://s3.amazonaws.com/getsatisfaction.com/";
document.write(unescape("%3Cscript src='" + asset_host + "javascripts/feedback-v2.js' type='text/javascript'%3E%3C/script%3E"));