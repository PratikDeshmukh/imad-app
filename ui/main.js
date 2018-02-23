console.log('Loaded!');

var button = document.getElementById('counter');
//var counter = 0;

button.onclick = function(){
   // counter = counter +1;
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                console.log(counter);
                var span = document.getElementById('count');
                span.innerHTML=counter.toString();              
            }
        }
    };
    
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
                var names = reqeust.responseText;
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

