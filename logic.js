 var config = {
    apiKey: "AIzaSyDY3ooAaKAPFTa6RCd7Exw0J4jY6rCK9nw",
    authDomain: "data-project-3c52e.firebaseapp.com",
    databaseURL: "https://data-project-3c52e.firebaseio.com",
    storageBucket: "data-project-3c52e.appspot.com",
    messagingSenderId: "115729994231"
  };
  firebase.initializeApp(config);

    var dataRef = firebase.database();

    // Initial Values

    var train_name = "";

    var destination = "";

    var train_time =0;

    var frequency= 0;

    //var firstTrainTime=0;

    // Capture Button Click

    $("#add-train").on("click", function(event) {
      event.preventDefault();

      // YOUR TASK!!!

      // Code in the logic for storing and retrieving the most recent user.

      // Dont forget to provide initial data to your Firebase database.

      train_name = $("#name-input").val().trim();

      destination = $("#destination-input").val().trim();

      train_time = moment($("#time-input").val().trim(),"HH:mm").format("X");

      frequency = $("#frequency-input").val().trim();


      // Code for the push

      dataRef.ref().push({

        train_name: train_name,

        destination: destination,

        train_time,

       frequency: frequency,

        dateAdded: firebase.database.ServerValue.TIMESTAMP

      });

    });

    // Firebase watcher + initial loader HINT: .on("value")

    dataRef.ref().on("child_added", function(snapshot) {

      // Log everything that's coming out of snapshot

      console.log(snapshot.val());

      console.log(snapshot.val().train_name);

      console.log(snapshot.val().destination);

      console.log(snapshot.val().train_time);

      console.log(snapshot.val().frequency);

      // Change the HTML to reflect
  
   // var Name = snapshot.val().train_name;
   // var finaldestination = snapshot.val().destination;
   // var traintime = snapshot.val().time;
   // var trainfrequency = snapshot.val().frequency;
   
    //train_time = moment($("#time-input").val(), "HH:mm").format("X");
  // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(train_time, "X").subtract(1, "years");
    console.log(firstTimeConverted);

   var currentTime = moment().format("HH:mm");
    console.log("current time:" + currentTime);

   // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + Math.round(diffTime*.0000036));

   // Time apart (remainder)
    var tFrequency = parseInt(snapshot.val().frequency);
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

   // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
    console.log("ARRIVAL TIME: " + nextTrain);

   var upcomingTrain = (moment(nextTrain).format("HH:mm"));

    $("#table-info").append("<tr>"
      + "<td>" + snapshot.val(). train_name + "</td>"
      + "<td>" + snapshot.val().destination + "</td>"
      + "<td>" + snapshot.val(). frequency+ "</td>"
      + "<td>" + nextTrain + "</td>"
      + "<td>" + tMinutesTillTrain + "</td>"
      + "</tr>");
    // Handle the errors

    }, function(errorObject) {

      console.log("Errors handled: " + errorObject.code);

    });
