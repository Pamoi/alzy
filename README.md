# Alzy

Alzy is an easy to use, minimalistic reminder app. It is built with [Ionic](https://ionicframework.com/) and runs on Android,
iOS and Windows Phone. The currently supported features are:

- Text notes with markdown styling
- Notification Scheduling

## Installation

You can build alzy using the Ionic CLI. If you have [Node.js](https://nodejs.org/en/) and npm installed you can install Ionic with

```
npm install -g cordova ionic
```

You can now install the app on a connected device by running the following commands at the root of the repository:

```
ionic platform add android
ionic run android
```

Replace `android` by `ios` if you want to install it on an iOS device.
