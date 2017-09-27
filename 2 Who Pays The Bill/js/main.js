(function GetLooser(){

  this.applicants = [];

  this.init = function(){
    this.addApplicants();
    this.getRandomUser();
    this.runAgain();
    this.startAgain();
  };

  this.showList = function(){
    var parent = document.querySelector('.applicant-list-wrapper');

    var template = '';

    for(var i = 0; i < applicants.length; i++){
      var applicantName = applicants[i][0].toUpperCase() + applicants[i].substr(1);
      template += '<span class="name-tag" data-id="'+i+'">' + applicantName + '</span>';
    }

    parent.innerHTML = '';
    parent.insertAdjacentHTML('afterbegin', template);
    this.deleteOne();    
  }

  this.addApplicants = function(){

    var addBtn = document.querySelector('#add-applicant');
    var input = document.querySelector('#applicant-value');

    addBtn.addEventListener('click', function(){
      
      input.focus();

      generateList(input);
    });
    
    input.addEventListener('keyup', function(e){
      if(e.keyCode === 13){
        generateList(input);
      }
    })

    function generateList(input){
      var value = input.value.toLowerCase();

      if(this.isValid(value)){
        applicants.push(value);
        showList();

        // clear input
        input.value = '';
      }else{
        alert('Something is wrong');
      }
      
    }

  };

  this.isValid = function(value){
    if(value.trim() === ''){
      return false;
    }
    if(applicants.indexOf(value) !== -1){
      return false;
    }

    return true;
  };

  this.deleteOne = function(){
    var items = document.querySelectorAll('.name-tag');

    for(var i = 0; i < items.length; i++){
      items[i].addEventListener('click', function(e){
        removeIt(this);
      });
    }

    function removeIt(element){
      var elementId = parseInt(element.getAttribute('data-id'));
      
      applicants.splice(elementId, 1);

      this.showList();
    }
  };

  this.getRandomUser = function(){
    var resultsBtn = document.querySelector('#show-results');
    
    resultsBtn.addEventListener('click', function(){
      if(applicants.length > 1){
        showLooser();
      }else{
        alert('Please enter users');
      }
    });

    function showLooser(){
      var resultsContainer = document.querySelector('.results-container');
      var applicantContainer = document.querySelector('.applicant-container');

      applicantContainer.className += ' hidden';
      resultsContainer.className = 'results-container';

      showRandomUser();
    }
  };

  this.showRandomUser = function(){
    var result = document.querySelector('.result');
    var rand = applicants[Math.floor(Math.random() * applicants.length)];

    result.innerHTML = '';
    result.insertAdjacentHTML('afterbegin', '<h3>'+rand+'</h3>');
  };

  this.runAgain = function(){
    var runAgainBtn = document.querySelector('.run-again');

    runAgainBtn.addEventListener('click', function(){
      showRandomUser();
    });
  };

  this.startAgain = function(){
    var startAgainBtn = document.querySelector('.start-again');

    startAgainBtn.addEventListener('click', function(){
      // clear applicants array
      applicants = [];

      // change states
      var resultsContainer = document.querySelector('.results-container');
      var applicantContainer = document.querySelector('.applicant-container');

      applicantContainer.className = 'applicant-container';
      resultsContainer.className += ' hidden';

      // clear applicant-list-wrapper
      var parent = document.querySelector('.applicant-list-wrapper');
      parent.innerHTML = '';
    });
    
  };

  this.init();
})();