mapboxgl.accessToken =
  "pk.eyJ1Ijoic2l2YXJhbWFuMjIiLCJhIjoiY2tkdzZtZ2pvMHJuMDJ4cGl3NnZuNmMzcyJ9.dBg0d7bHpTL2VbMURUrfyQ";
var coordinates = [];
var center = [];
const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};
var seconds = 0;
var minutes = 0;
var display_second = 0;
var display_minutes = 0;

var interval;
let map;

if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      center = [position.coords.longitude, position.coords.latitude];

      map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 15,
      });

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      var geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: center,
            },
            properties: {
              title: "Mapbox",
              description: "your location",
            },
          },
        ],
      };

      geojson.features.forEach(function (marker) {
        // create a HTML element for each feature
        var el = document.createElement("div");
        el.className = "marker";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
      });

      map.on("load", () => {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [center, center],
            },
          },
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
      });
    },
    (err) => {
      console.log(err);
      alert("cannot get your location, check your internet connectivity");
    },
    options
  );
} else {
}

function rendermap() {
  var map2 = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15,
  });

  map2.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );

  var geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: coordinates[coordinates.length - 1],
        },
        properties: {
          title: "Mapbox",
          description: "your location",
        },
      },
    ],
  };

  geojson.features.forEach(function (marker) {
    // create a HTML element for each feature
    var el = document.createElement("div");
    el.className = "marker";

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map2);
  });

  map2.on("load", () => {
    map2.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      },
    });
    map2.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#888",
        "line-width": 8,
      },
    });
  });
}

var watchID;

const start = () => {
  interval = window.setInterval(stopwatch, 1000);
  watchID = navigator.geolocation.watchPosition(
    (position) => {
      coordinates.push([position.coords.longitude, position.coords.latitude]);
    },
    (error) => {
      console.log(error);
    },
    options
  );
};

const stop = () => {
  var total = 0;
  navigator.geolocation.clearWatch(watchID);
  rendermap(coordinates);

  for (let i = 0; i < coordinates.length - 1; i++) {
    total += distance(coordinates[i], coordinates[i + 1]);
  }
  document.getElementById(
    "distance"
  ).innerHTML = `distance travelled <strong>${total}</strong> meters`;
  window.clearInterval(interval);
};

function distance(coords1, coords2) {
  var lon1 = coords1[0];
  var lat1 = coords1[1];
  var lon2 = coords2[0];
  var lat2 = coords2[1];
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;

    dist = dist * 0.8684;

    return dist * 1000;
  }
}

//code for stopwatch
function stopwatch() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (seconds < 10) {
    display_seconds = "0" + seconds.toString();
  } else {
    display_seconds = seconds;
  }

  if (minutes < 10) {
    display_minutes = "0" + minutes.toString();
  } else {
    display_minutes = minutes;
  }

  document.getElementById("t").innerHTML =
    display_minutes + ":" + display_seconds;
}
