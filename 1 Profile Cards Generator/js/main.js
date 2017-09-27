var database = [
  {name: 'Josh Bently', email: 'josh@yahoo.com', age: 32},
  {name: 'Mary Jackson', email: 'mary@gmail.com', age: 28},
  {name: 'Zack Simply', email: 'zack@yahoo.com', age: 56}
];

(function (db){

  this.init = function(){
    this.generateList();
    this.addUser();
  };

  this.generateList = function(){
    var parent = document.querySelector('#avatars-container');
    var template = '';

    for(var i = 0; i < db.length; i++){
      template += '<div class="col-sm-4">';
      template += '<div class="card">';
      template += '<div class="card-delete" data-card="'+i+'">x</div>';
      template += '<div class="card-block">';
      template += '<h3 class="card-title">' + db[i].name + '</h3>';
      template += '<p class="card-text"><strong>Email: </strong>'+ db[i].email +'</p>';
      template += '<p class="card-text"><strong>Age: </strong>'+ db[i].age +'</p>';
      template += '</div>';
      template += '</div>';
      template += '</div>';
    }

    parent.innerHTML = '';
    parent.insertAdjacentHTML('afterbegin', template);

    this.deleteCard();
  };

  this.addUser = function(){

    function grabUser(){
      // Get user inputs
      var userName = document.querySelector('#user-name').value;
      var userEmail = document.querySelector('#user-email').value;
      var userAge = document.querySelector('#user-age').value;

      // create object from values
      var user = {name: userName, email: userEmail, age: userAge};
      
      // check for valid user
      if(isValidUser(user)){
        // add object to database
        db.push(user);

        // reset form
        document.querySelector('#addUser').reset();

        // return focus to name field
        document.querySelector('#user-name').focus();

        // rerender card list
        this.generateList();
      }else{
        // show error message
        var error = document.querySelector('#error');
        error.style.display = 'block';

        // hide after 5 seconds
        window.setTimeout(function(){
          error.style.display = 'none';
        }, 5000);
      }      
    }

    document.querySelector('#addUser').addEventListener('submit', function(e){
      e.preventDefault();
      
      grabUser();
    });
  };

  this.isValidUser = function(user){
    for(var prop in user){
      if(user[prop].trim().length === 0){
        return false;
      }
    }

    return true;
  };

  this.deleteCard = function(){

    var buttons = document.querySelectorAll('.card-delete');

    function deleteItem(element){
      var obj = parseInt(element.getAttribute('data-card'));
      db.splice(obj, 1);
      this.generateList();
    }
    
    for(var i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', function(e){
        deleteItem(this);
      });
    }
    
  };

  this.init();
})(database);