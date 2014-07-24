

var map;
var infowindow;
var geolocation;
var search;
var searchString;

function initializeMap() 
  {

    // If geolocation is supported,set a variety of options
    if(navigator.geolocation) 
      {
        console.log('Geolocation is supported');

        //var map;

        var geoOptions = {
            timeout: 10 * 1000,
            enableHighAccuracy: true           
          }        

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

      } else {
                console.log('Geolocation is NOT supported');

                document.getElementById('map_canvas').innerHTML = 'No Geolocation Support. You will be unable to search.';
              }
  }


// If geolocation is supported and position was obtained.
function geoSuccess(position) 
  {
    // obtains and assigns latitude and longitude of current position.
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    // assigns a map based on the current position.
    var geolocation = new google.maps.LatLng(myLat, myLong);

    // place map on screen in correct element. Sets zoom level.
    map = new google.maps.Map(document.getElementById('map_canvas'), {
      center: geolocation,
      zoom: 12
    });

    // prepares an infowindow which overlays the map. This is used to display the markers.
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    // Uses Google Places API and passes it the search parameter set by the press of the button on the 'Find' page.
    // Some contain radar searches (if the place type is supported by Google Places) or text search.
    // Search 6 collects the text input in the search bar and passes this to Google places as the search string.
    if (search == 1) 
      {
        var request = {
        location: geolocation,
        radius: 2000,
        types: ['pet_store']
        };
        // injects search term into the results page HTML to show what the user searched for.
        document.getElementById('searchID').innerHTML = 'Pet Store';
        service.radarSearch(request, callback);
        console.log('pet_store');
      }

    else if(search == 2) 
      {
        var request = {
        location: geolocation,
        radius: 2000,
        types: ['veterinary_care']
        };
        document.getElementById('searchID').innerHTML = 'Vet';
        service.radarSearch(request, callback);
        console.log('veterinary_care');
      }

    else if(search == 3) 
      {
        var request = {
        location: geolocation,
        radius: 2000,
        query: ['kennels']
        };
        document.getElementById('searchID').innerHTML = 'Kennels';
        service.textSearch(request, callback);
        console.log('kennels');
      } 

    else if(search == 4) 
      {
        var request = {
        location: geolocation,
        radius: 2000,
        query: ['dog walking']
        };
        document.getElementById('searchID').innerHTML = 'dog walker';
        service.textSearch(request, callback);
        console.log('kennels');
      } 

    else if(search == 5) 
      {
        var request = {
        location: geolocation,
        radius: 2000,
        query: ['pet sitter']
        };
        document.getElementById('searchID').innerHTML = 'pet sitter';
        service.textSearch(request, callback);
        console.log('kennels');
      } 

    else if(search == 6) 
      {
        var request = {
        location: geolocation,
        radius: 2000,
        query: [searchString]
        };
        document.getElementById('searchID').innerHTML = 'unique search';
        service.textSearch(request, callback);
        console.log('kennels');
      } 
    
  }

// Deals with Errors
function geoError() 
  {
    console.log('Error occured. Error code: ');  //  + error.code
      // error code can be:
      // 0: unkonown error
      // 1: permission denied
      // 2: position unavailable (error response from location provider)
      // 3: timed out
}  

// If the google places service is available it loops through each of the results and creates a marker for each result.
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log(results[i]);
    }
  }
}

// Draws the markers on the infowindow overlay
function createMarker(place) 
  {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({  
        map: map,  
        position: place.geometry.location
        //animation: google.maps.Marker.DROP,
      });

    google.maps.event.addListener(marker, 'click', function() 
      {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
  }

// Functions that assign searches based on which button was clicked in the 'Find' page.
function petStoreSearch()
  {
    $.mobile.changePage($('#findMaps'), { transition: "flip", changeHash: true });
    search = 1;
    initializeMap(search);
    console.log('I searched for a pet store');
  }

function vetSearch()
  {
    $.mobile.changePage($('#findMaps'), { transition: "flip", changeHash: true });
    search = 2;
    initializeMap(search);
    console.log('I searched for a florist');
  }

function kennelsSearch()
  {
    $.mobile.changePage($('#findMaps'), { transition: "flip", changeHash: true });
    search = 3;
    initializeMap(search);
    console.log('I searched for a kennels');
  }

  function dogWalkingSearch()
  {
    $.mobile.changePage($('#findMaps'), { transition: "flip", changeHash: true });
    search = 4;
    initializeMap(search);
    console.log('I searched for a dog walker');
  }

  function petSitterSearch()
  {
    $.mobile.changePage($('#findMaps'), { transition: "flip", changeHash: true });
    search = 5;
    initializeMap(search);
    console.log('I searched for a pet sitter');
  }

  // Collects text string that was input into the search bar and submitted.
  function textSearch()
  {
    $.mobile.changePage($('#findMaps'), { transition: "flip", changeHash: true });
    search = 6;
    initializeMap(search);
    searchString = document.getElementById("searchinput3").value;
    console.log('I searched for anything');
  }