document.addEventListener('DOMContentLoaded', fetchBookmarks);
document.getElementById('myForm').addEventListener('submit', saveBookmark);


// Save Bookmark
function saveBookmark(e){

  // Get form values
  var siteName = document.getElementById('siteName').value.trim();
  var siteUrl = document.getElementById('siteUrl').value.trim();

  if(validateForm(siteName, siteUrl)){
    var bookmark = {
      name: siteName,
      url: siteUrl
    };

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
      // Init array
      var bookmarks = [];

      // Add to array
      bookmarks.push(bookmark);

      // Set to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
      // Get bookmarks from localStorage
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

      // Add bookmark to array
      bookmarks.push(bookmark);

      // Re-set back to localStorage
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // fetch bookmarks
    fetchBookmarks();

    // Clear Form
    document.getElementById('myForm').reset();
  }

  
  // Prevent form from submitting
  e.preventDefault();
}

// Fetch Bookmarks
function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output id
  var bookmarksResult = document.getElementById('bookmarksResults');

  // Build output
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'
                                  + '<h3>' + name 
                                  + ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'
                                  + ' <a class="btn btn-danger" href="#" onclick="deleteBookmark(\''+url+'\')">Delete</a>'
                                  + '</h3>' 
                                  +'</div>';
  }  
}

// Delete Bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url === url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }

  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // fetch bookmarks
  fetchBookmarks();
}

// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
