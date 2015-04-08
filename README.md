demoSponsorpay
===========================

##DevKit SponsorPay Module Demo

Showcases using the [sponsorpay](https://github.com/gameclosure/sponsorpay)
module for the GameClosure DevKit.


![sponsorpay demo](http://storage.googleapis.com/devkit-modules/sponsorpay/sponsorpay_screenshot.png)

##Prerequisites:

You need devkit installed to run this game. Please follow the devkit
installation instructions.


##Quick Start:

Clone this project:

`git clone git@github.com:gameclosure/demoSponsorpay`

Change into the game directory:

`cd demoSponsorpay`

Add Devkit to the project (and register with the simulator). This will also
install all the dependencies.

`devkit install`

NOTE: You probably want to update the manifest with your own sponsorpay/fyber
keys.


Build to device to run the demo.

`devkit debug native-android`

`devkit debug native-ios`
