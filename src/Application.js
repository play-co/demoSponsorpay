/**
 * Demo for GameClosure DevKit Sponsorpay/Fyber Module
 */

import ui.TextView as TextView;
import src.views.LogView as LogView;
import src.views.ButtonView as ButtonView;
import device;

import sponsorpay;


exports = Class(GC.Application, function () {

  this.initUI = function () {
    this.view.style.backgroundColor = 'white';
    this.header = new TextView({
      superview: this.view,
      text: "Sponsorpay Demo",
      color: "black",
      x: 0,
      y: 25,
      width: this.view.style.width,
      height: 100
    });

    var buttonPadding = 20;
    var buttonWidth = (this.view.style.width - (buttonPadding * 2));
    var buttonWidth2 = (this.view.style.width - (buttonPadding * 3)) / 2;
    var buttonWidth3 = (this.view.style.width - (buttonPadding * 4)) / 3;
    var buttonStart1 = buttonPadding;
    var buttonStart22 = buttonPadding + buttonWidth2 + buttonPadding;
    var buttonStart32 = buttonPadding + buttonWidth3 + buttonPadding;
    var buttonStart33 = (buttonPadding * 3) + (buttonWidth3 * 2);
    var buttonHeight = 75;

    buttonY = this.header.style.y + this.header.style.height + buttonPadding;

    this.initializeButton = new ButtonView({
      superview: this.view,
      x: buttonStart1,
      y: buttonY,
      width: buttonWidth2,
      height: buttonHeight,
      title: "Init SponsorPay",
      onClick: bind(this, this.initializeSponsorPay)
    });

    this.initializeButton2 = new ButtonView({
      superview: this.view,
      x: buttonStart22,
      y: buttonY,
      width: buttonWidth2,
      height: buttonHeight,
      title: "Init with User",
      onClick: bind(this, this.initializeSponsorPayWithUser)
    });

    buttonY += buttonHeight + buttonPadding;

    this.videoStatusView = new TextView({
      superview: this.view,
      x: buttonStart1,
      y: buttonY,
      width: buttonWidth,
      height: buttonHeight,
      text: "Video Status: Waiting",
      visible: false
    });

    buttonY += buttonHeight + buttonPadding;

    this.cacheVideoButton = new ButtonView({
      superview: this.view,
      x: buttonStart1,
      y: buttonY,
      width: buttonWidth,
      height: buttonHeight,
      title: "Cache Video",
      visible: false,
      onClick: bind(this, this.cacheVideo)
    });

    buttonY += buttonHeight + buttonPadding;

    this.showVideoButton = new ButtonView({
      superview: this.view,
      x: buttonStart1,
      y: buttonY,
      width: buttonWidth,
      height: buttonHeight,
      title: "Show Video",
      visible: false,
      onClick: bind(this, this.showVideo)
    });

    buttonY += buttonHeight + buttonPadding;

    var logViewY = buttonY + buttonHeight + 150;
    this.logView = new LogView({
      superview: this.view,
      x: 0,
      y: logViewY,
      width: this.view.style.width,
      height: this.view.style.height - logViewY
    });

    // listen for events
    this._createEventListeners();
  };

  this._createEventListeners = function () {
    sponsorpay.on('Initialized', bind(this, function () {
      this.initializeButton.style.visible = false;
      this.initializeButton2.style.visible = false;
      this.videoStatusView.style.visible = true;
      this.cacheVideoButton.style.visible = true;
      this.showVideoButton.style.visible = true;
      this.log("Initialized");
    }));


    sponsorpay.on('VideoAvailable', bind(this, function () {
      this.setVideoStatus('Available');
    }));

    sponsorpay.on('VideoNotAvailable', bind(this, function () {
      this.setVideoStatus('Not Available');
    }));

    sponsorpay.on('VideoError', bind(this, function () {
      this.setVideoStatus('Error');
    }));

    sponsorpay.on('VideoCompleted', bind(this, function () {
      this.setVideoStatus('Completed!');
    }));
  };


  this.initializeSponsorPay = function () {
    this.log("Initializing SponsorPay");
    sponsorpay.initializeSponsorPay();
  };

  this.initializeSponsorPayWithUser = function () {
    this.log("Initializing SponsorPay With User");
    sponsorpay.initializeSponsorPay({
      userId: 'abcd'
    });
  };

  this.cacheVideo = function () {
    this.log("Caching Video");
    this.setVideoStatus("Caching");
    sponsorpay.cacheVideo();
  };

  this.showVideo = function () {
    this.log("Attempting to Show a Video Ad");
    this.setVideoStatus("Waiting");
    sponsorpay.showVideo();
  };

  this.setVideoStatus = function (status) {
    this.log("Updating video status: " + status);
    this.videoStatusView.setText("Video Status: " + status);
  };

  this.log = function (text) {
    logger.log(text);
    this.logView.log(text);
  };

});
