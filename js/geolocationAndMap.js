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

          document.getElementById('google_canvas').innerHTML = 'No Geolocation Support.';
        }
  }

function geoSuccess(position) 
  {
    var map;

    var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


    var mapOptions = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: geolocate
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    // The following line was used for testing whether geolocation was functioning and to display the reported lat and long
    //document.getElementById("locationNote").innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

    var request = {
      location: geolocate,
      radius: '1000',
      types: ['veterinary_care']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, status) 
      {
        if (status == google.Maps.places.PlacesServiceStatus.OK) 
          {
            for(var i = 0; i < results.length; i++) 
              {
                var place = results[i];
                createMarker(results[i]);
              }

                  // adds a marker showing users position
                  //var marker = new google.maps.Marker({

                  // pinpoints where the marker should be placed
                  // position: geolocate,

                  // this tells the marker which map it should be attached to
                  //  map: map,
                  //});

          map.setCenter(geolocate);
        }
      }
  }

function geoError(position)
  {
    console.log('Error occured. Error code: ' + error.code);
    // error code can be:
    // 0: unkonown error
    // 1: permission denied
    // 2: position unavailable (error response from location provider)
    // 3: timed out
  }

function vetPlace(position) 
  {
    var map;

    var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


    var mapOptions = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: geolocate
    };

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    var request = {
      location: geolocate,
      radius: '1000',
      types: ['veterinary_care']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, status) 
      {
        if (status == google.Maps.places.PlacesServiceStatus.OK) {
        for(var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
      }
    }
}

                // adds a marker showing users position
                //var marker = new google.maps.Marker({

                // pinpoints where the marker should be placed
                //position: geolocate,

                // this tells the marker which map it should be attached to
map: map,
});

map.setCenter(geolocate);

}