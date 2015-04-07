"use strict";
function auth () {
    return {
        /**
         * Function that call on the page init
         */
        init: function () {
            var $inputEmail = $("#email");
            var $inputPassword = $("#password");

            // Case the email input not hide set focus, else set focus on
            // input password
            if (!$inputEmail.is(":visible")) {
                $inputEmail.focus();
            } else {
                $inputPassword.focus();
            }

            if (!this.isSetProfileLocalStorage()) {
                if (this.supportsHTML5Storage())
                    this.clearProfileLocalStorega();
            }
        },
        /**
         * Main function that load the profile if exists
         * in localstorage
         */
        loadProfile: function() {
            if (!this.supportsHTML5Storage()) { return false }
            this.getLocalProfile(function(profileImgSrc, profileName, profileReAuthEmail) {
                //Change the UI
                $("#profile-img").attr("src",profileImgSrc);
                $("#profile-name").html(profileName);
                $("#reauth-email").html(profileReAuthEmail);

                // Set the {profileReAuthEmail} to input email,
                // because this field have required tag if you not set this
                // will give an error
                $("#email").val(profileReAuthEmail);
                $("#email").hide();
                $("#remember").hide();
            });
        },
        /**
         * Function that gets the data of the profile in case
         * thar it has already saved in localstorage. Only the
         * UI will be update in case that all data is available
         *
         * A not existing key in localstorage return null
         *
         */
        getLocalProfile: function(callback) {
            var profileImgSrc      = localStorage.getItem("PROFILE_IMG_SRC");
            var profileName        = localStorage.getItem("PROFILE_NAME");
            var profileReAuthEmail = localStorage.getItem("PROFILE_REAUTH_EMAIL");

            if(profileName !== null
                && profileReAuthEmail !== null
                && profileImgSrc !== null) {
                callback(profileImgSrc, profileName, profileReAuthEmail);
            }
        },
        /**
         * function that checks if the browser supports HTML5
         * local storage
         *
         * @returns {boolean}
         */
        supportsHTML5Storage: function() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch(e) {
                console.error(e.toString());
                return false;
            }
        },
        /**
         * This data will be safe by the web app
         * in the first successful login of a auth user.
         * To Test the scripts, delete the localstorage data
         * and comment this call.
         *
         * @returns {boolean}
         */
        setProfileLocalStorageData:  function (profileImgSrc, profileName, profileReAuthEmail) {
            if(!this.supportsHTML5Storage()) { return false; }
            localStorage.setItem("PROFILE_IMG_SRC", profileImgSrc);
            localStorage.setItem("PROFILE_NAME", profileName);
            localStorage.setItem("PROFILE_REAUTH_EMAIL", profileReAuthEmail);
        },

        isSetProfileLocalStorage: function () {
            if (!this.supportsHTML5Storage()) { return false; }
            if (localStorage.length > 0) {
                if (localStorage.getItem("PROFILE_NAME") !== null
                    && localStorage.getItem("PROFILE_NAME") !== ""
                    && localStorage.getItem("PROFILE_REAUTH_EMAIL") !== null
                    && localStorage.getItem("PROFILE_REAUTH_EMAIL") !== "")
                return true;
            } else {
                return false;
            }
        },

        clearProfileLocalStorega: function () {
            localStorage.clear();
        }
    };
}