const FirestoreInit = (function () {
    var instance;
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBncVRFy9igCEHuhSaOHqlfGboBHuVQtas",
        authDomain: "news-app-640ed.firebaseapp.com",
        databaseURL: "https://news-app-640ed.firebaseio.com",
        projectId: "news-app-640ed",
        storageBucket: "news-app-640ed.appspot.com",
        messagingSenderId: "746061412531"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var db = firebase.firestore();
    
    function getDb() {
        return db;
    }

    function createInstance() {
        return {
            getDb
        }
    }

    return {
        getInstance() {
            return instance || (instance = createInstance());
        }
    }
})();