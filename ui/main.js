console.log('Loaded!');

var button = document.getElementById('counter');
//var counter = 0;

button.onclick = function(){
   // counter = counter +1;
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
      console.log("response came");
        if (request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                console.log(counter);
                var span = document.getElementById('count');
                span.innerHTML=counter.toString();              
            }
        }
    };
     console.log("request sent ");
    request.open('GET','http://pratikdeshmukh13.imad.hasura-app.io/counter',true);
    request.send(null);
    
};

//submit names

var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
    
                for(var i=0; i< names.length; i++){
                    console.log('PD');
                    list += '<li>'+ names[i] + '</li>';
                }
    
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;                      
            }
        }
    };
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    request.open('GET','http://pratikdeshmukh13.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
    
    
    
};

var login = document.getElementById('login_btn');
login.onclick = function(){
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                console.log('user logged in');
                alert('login successful');
            }else if(request.status === 403){
                alert('username/password incorrect');
            }else if(request.status === 500){
                alert('something went wrong on server');
            }
        }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    //console.log(username);
    //console.log(password);
     request.open('POST','http://pratikdeshmukh13.imad.hasura-app.io/create-user',true);

   
    request.setRequestHeader('Content-type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
    
    
};


