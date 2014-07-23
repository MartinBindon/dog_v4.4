

var map;
var infowindow;
var geolocation;

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
      zoom: 14
    });

    var request = {
      location: geolocation,
      radius: 1000,
      types: ['pet_store']
    };

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    document.getElementById('searchID').innerHTML = 'pet store';
    
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

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({    
    position: place.geometry.location,
    animation: google.maps.Marker.DROP,
    map: map
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

