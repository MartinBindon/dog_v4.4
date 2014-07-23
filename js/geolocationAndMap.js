

var map;
var infowindow;
var geolocation;
var search;

function initializeMap() 
  {

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

                document.getElementById('map_canvas').innerHTML = 'No Geolocation Support.';
              }
  }

function geoSuccess(position) 
  {
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    var geolocation = new google.maps.LatLng(myLat, myLong);

    map = new google.maps.Map(document.getElementById('map_canvas'), {
      center: geolocation,
      zoom: 12
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    if (search == 1) {
        var request = {
        location: geolocation,
        radius: 2000,
        types: ['pet_store']
        };
        document.getElementById('searchID').innerHTML = 'Pet Store';
        service.radarSearch(request, callback);
        console.log('pet_store');
    }

    else if(search == 2) {
        var request = {
        location: geolocation,
        radius: 2000,
        types: ['veterinary_care']
        };
        document.getElementById('searchID').innerHTML = 'Vet';
        service.radarSearch(request, callback);
        console.log('veterinary_care');
    }

    else if(search == 3) {
        var request = {
        location: geolocation,
        radius: 2000,
        types: ['kennels']
        };
        document.getElementById('searchID').innerHTML = 'Kennels';
        service.radarSearch(request, callback);
        console.log('kennels');
    } 
    
  }

function geoError() 
  {
    console.log('Error occured. Error code: ');  //  + error.code
      // error code can be:
      // 0: unkonown error
      // 1: permission denied
      // 2: position unavailable (error response from location provider)
      // 3: timed out
}  

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

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