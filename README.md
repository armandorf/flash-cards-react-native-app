# Flashcards: React Native App

## About this Project
This is a React Native app that lets users quiz themselves on decks of cards (questions and answers) created by the user to test their knowledge on a certain topic. Users can create decks and cards for them. After taking a quiz, the user is able to see the percentage of correct answers for the questions in the deck. 

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). It makes use of stateless and stateful React components. It uses AsyncStorage to persist the users' data. It also sends daily reminders at 8:00PM if the user has not quizzed himself/herself in any given day.

## Native Platform: Android Portrait Mode Only
This app was designed entirely for Android devices. Specifically, it was tested thoroughly on an Android 7.0.0 emulator with screen size 768x1280 and also on a cell phone with the same Android version. It is not meant to work with iOS emulators and/or devices. 
 
## How to Install and Run the App
To run this project locally, clone this repository and run the following commands:
```sh
$ cd flash-cards-react-native-app
$ npm install
$ npm start
# then choose to run it on an Android emulator or on your Android phone using Expo 
```

## Packages Used in This Project
* Create React Native App
* React
* React Navigation
* PropTypes
* Expo: Notifications and Permissions
* es6-iterator

## Contributing
This repository is the third and final project in Udacity's React Nanodegree. If you have any suggestions, want to discuss the approach I took to design and implement the app or anything else, please feel free to contact me to have a chat about it.