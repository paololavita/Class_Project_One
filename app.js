
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
