(function musicDB(){

  this.init = function(){
    this.search();
  };

  this.search = function(){
    var form = document.querySelector('#search-form');

    form.addEventListener('submit', function(e){
      e.preventDefault();

      var value = document.querySelector('#input-search').value;

      form.reset();

      getData(value.trim().split(' ').join('+'));
    });
  };

  this.getData = function(artist){
    var http = new XMLHttpRequest();
    var url = 'https://itunes.apple.com/search?term='+artist+'&entity=album';
    var method = 'GET';

    // clear album results
    var container = document.querySelector('#album-list-container');
    container.innerHTML = '';

    http.open(method, url);
    http.onreadystatechange = function(){
      if(http.readyState === XMLHttpRequest.DONE && http.status === 200){
        showArtist(JSON.parse(http.response), artist);
      }else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200){

      }
    };

    http.send();
  };

  this.showArtist = function(artistObj, searchStr){
    var container = document.querySelector('#album-list-container');
    var template = '';

    if(artistObj.results.length > 0){
      document.querySelector('#no-match').style.display = 'none';

      for(var i = 0; i < artistObj.results.length; i++){
        template += '<div class="col-sm-3 album-item">';
        template += '  <div class="item-thmb" style="background: url('+artistObj.results[i].artworkUrl100+')"></div>';
        template += '  <div class="item-title">'+artistObj.results[i].collectionName+'</div>';
        template += '  <div class="item-price">';
        template += '    <span>Price: </span>' + artistObj.results[i].collectionPrice + ' USD';
        template += '  </div>';
        template += '  <a href="'+artistObj.results[i].collectionViewUrl+'" target="_blank">Buy now</a>';
        template += '</div>';
      }

      container.innerHTML = '';
      container.insertAdjacentHTML('afterbegin', template);
    }else{
      var noMatch = document.querySelector('#no-match');
      noMatch.innerHTML = 'Sorry no results found for ' + searchStr + '!';
      noMatch.style.display = 'block';
    }
  };

  this.init();
})();