window.org_vaadin_se_facebook_Facebook = function() {

    this.apiInit = false;

    var self = this;
    //self.getElement().innerHTML = "<div id=\"fb-root\"></div><div class=\"fb-login-button\" data-max-rows=\"1\" data-size=\"xlarge\" data-show-faces=\"false\" data-auto-logout-link=\"false\"></div>";

    this.onStateChange = function() {
        if (!self.apiInit) {
            self.initApi(self.getState().appId);
            self.apiInit = true;
        }
    }

    this.initApi = function(fbAppId) {

        window.fbAsyncInit = function() {
            FB.init({
                appId: fbAppId,
                status: true,
                xfbml: true
            });

            /* Subscribe to all facebook login events */
            FB.Event.subscribe('auth.login', function(response) {
                if (response.authResponse) {
                    var r = response.authResponse;
                    self.onLogin(r.userID, r.accessToken, response.status);
                } else {
                    // Login was asked, but cancelled
                }

            });

            FB.Event.subscribe('auth.logout', function(response) {
                self.onLogout();
            });

        };
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };

    this.login = function() {
        FB.login(function(response) {
            // We subscribed the events, so don't need to do anything here.
        });
    };

    this.logout = function() {
        FB.logout(function(response) {
            // We subscribed the events, so don't need to do anything here.
        });
    };

    this.api = function(path, method, params) {
        FB.api(path, method, params, self.onApiCallback);
    }


    this.ui = function(params) {
        FB.ui(
                params,
                function(response) {
                    if (response && response.post_id) {
                        self.onPostSuccess(response.post_id, response);
                    } else {
                        self.onPostCancel();
                    }
                }
        );
    }


};











