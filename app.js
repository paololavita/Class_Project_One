function undisableTxt() {
    document.getElementById('sname').disabled = false;
    document.getElementById('address').disabled = false;
    document.getElementById('mdate').disabled = false;
    document.getElementById('atime').disabled = false;
    document.getElementById('selatime').disabled = false;
    document.getElementById('radio').disabled = false;
    document.getElementById('radio2').disabled = false;
    document.getElementById('radio3').disabled = false;
    document.getElementById('radio4').disabled = false;
    document.getElementById('reason').disabled = false;
}

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the app know the current login status of the person. Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
          testAPI();
          undisableTxt();
        } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // This function is called when someone finishes with the Login Button.  See the onlogin handler attached to it in the sample code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '608375969538539',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBomPRLZ-HhBbs_p8_3o6VcCFExmu0K7F8",
    authDomain: "studentcooap.firebaseapp.com",
    databaseURL: "https://studentcooap.firebaseio.com",
    projectId: "studentcooap",
    storageBucket: "studentcooap.appspot.com",
    messagingSenderId: "592447078076"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $(document).ready(function()
  {
    var mtable = $('.table-info');

    database.ref('student').once('value', function(snapshot)
    {
    snapshot.forEach(function(data)
    {
    var msname = data.val().sname;
    var address = data.val().address;
    var mdate = data.val().mdate;
    var atime = data.val().atime;
    var selatime = data.val().selatime;
    var rvalue = data.val().rvalue;
    var reason = data.val().reason;

    var tr = $('<tr>');

    var td0 = $('<td>').text(msname);
    var td1 = $('<td>').text(address);
    var td2 = $('<td>').text(mdate);
    var td3 = $('<td>').text(atime);
    var td4 = $('<td>').text(selatime);
    var td5 = $('<td>').text(rvalue);
    var td6 = $('<td>').text(reason);
    var td7 = $('<td>').text('MAP');

    tr.append(td0,td1,td2,td3,td4,td5,td6,td7);
    mtable.append(tr);
});
});

    $('#add-button').on('click', function(event)
    {
        event.preventDefault();

        var sname = $('#sname').val().trim();
        var address = $('#address').val().trim();
        var mdate =$('#mdate').val().trim();
        var atime = $('#atime').val();
        var selatime = $("#selatime option").val();
        var rvalue = $("input:radio[name ='r']:checked").val();
        var reason = $('#reason').val().trim();
    //    console.log(atime);
        database.ref('student/').push({

            'sname': sname,
            'address': address,
            'mdate': mdate,
            'atime': atime,
            'selatime': selatime,
            'rvalue' : rvalue,
            'reason': reason     
        });

        var mtable = $('.table-info');
        var tr = $('<tr>');
        var td0 = $('<td>').text(sname);
        var td1 = $('<td>').text(address);
        var td2 = $('<td>').text(mdate);
        var td3 = $('<td>').text(atime);
        var td4 = $('<td>').text(selatime);
        var td5 = $('<td>').text(rvalue);
        var td6 = $('<td>').text(reason);
        var td7 = $('<td>').text('MAP');
   
        tr.append(td0,td1,td2,td3,td4,td5,td6,td7);
        mtable.append(tr);

        $('#sname').val(" ");
        $('#address').val(" ");
        $('#mdate').val(" ");
        $('#atime').val(" ");
        $('#selatime').val(" ");
        $('#rvalue').val(" ");
        $('#reason').val(" ");
    
   });
 });
