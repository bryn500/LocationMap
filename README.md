# LocationMap
Wrapper for loading google map and updating locations

## Example use

```html
<div id="mapCanvas" style="height:360px; width: 100%; max-width: 400px;"></div>

@* Required *@
<script src="https://maps.google.com/maps/api/js"></script>

@* Optional https://github.com/googlemaps/js-marker-clusterer *@
<script src="~/_common/js/vendor/markerclusterer.js"></script>    

@* The Script *@
<script src="~/_common/js/app/modules/locationMap.js"></script>

<script>
    (function () {
        var locationMap;

        function getLocations() {
            return [
                {
                    Lat: "52.2119882",
                    Lng: "0.1737845",
                    Name: "Cambridgeshire - Cambridge"
                }, {
                    Lat: "51.8212361",
                    Lng: "-4.959943100000032",
                    Name: "Wales - Haverfordwest"

                }, {
                    Lat: "56.4353753",
                    Lng: "-3.3730880",
                    Name: "Scotland - Perth"
                }
            ];
        }

        function loadMap() {
            var data = getLocations();

            if (locationMap === undefined) {
                locationMap = new LocationMap(document.getElementById('mapCanvas'));
            }

            locationMap.load(data);
        }

        loadMap();
    }());
</script>
```
