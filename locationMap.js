/* globals google, MarkerClusterer */
(function () {
    'use strict';

    var LocationMap = function (element) {
        var self = this;

        self.markers = [];
        self.element = element;
        self.latlng = new google.maps.LatLng(54.5, -4.4);
    };

    LocationMap.prototype.load = function (locations) {
        var self = this;
        var bounds = new google.maps.LatLngBounds();
        var infowindow = new google.maps.InfoWindow();
        
        // remove existing markers from map
        self.markers.forEach(function (element) {
            element.setMap(null);
        });

        // clear marker array
        self.markers = [];

        // clear clusters
        if (self.clusterer) {
            self.clusterer.clearMarkers();
        }

        // create new map if undefined otherwise resuse existing
        if (self.map === undefined) {
            self.map = new google.maps.Map(self.element, {
                zoom: 9,
                center: self.latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                draggable: false
            });
        }

        // enable scroll/drag on click
        google.maps.event.addListener(self.map, 'click', function (event) {
            this.setOptions({
                scrollwheel: true,
                draggable: true
            });
        });

        // add markers from locations array
        locations.forEach(function (element) {
            // create marker
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(element.Lat, element.Lng),
                map: self.map,
                title: element.Name
            });

            // push to array
            self.markers.push(marker);

            // add click event to marker - shows location details in popup
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent('<div class="infoWindow">' + element.Name + (element.Info ? '<br /><b>Note:</b> ' + element.Info : '') + '</div>');
                infowindow.open(self.map, this);
            });

            // extend the bounds of the map by this new location
            bounds.extend(new google.maps.LatLng(element.Lat, element.Lng));
        });

        // zoom to fit all locations or zoom to singular location
        if (locations.length > 1) {
            self.map.fitBounds(bounds);
        } else {
            self.map.setCenter(new google.maps.LatLng(locations[0].Lat, locations[0].Lng));
            self.map.setZoom(10);
        }

        // launch clusterer
        if (typeof MarkerClusterer !== 'undefined') {
            self.clusterer = new MarkerClusterer(self.map, self.markers);
        }
    };

    window.LocationMap = LocationMap;
}());
