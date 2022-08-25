export default function createMap(data) {
	if (!data) return;
	var stred = SMap.Coords.fromWGS84(data.mapCenter.x, data.mapCenter.y);
	var mapa = new SMap(JAK.gel("mapa"), stred, 14);
	mapa.addDefaultLayer(SMap.DEF_OPHOTO).enable();
	mapa.addDefaultControls();
	var layer = new SMap.Layer.Marker();
	mapa.addLayer(layer);
	layer.enable();

	var vrstva = new SMap.Layer.Image();     /* Obrázková vrstva */
	mapa.addLayer(vrstva);                      /* Pøidat ji do mapy */
	vrstva.enable();                         /* A povolit */

	/* Pøidat do vrstvy obrázek */
	var leftTop = SMap.Coords.fromWGS84(16.819001723475985, 49.589852851319776);
	var rightBottom = SMap.Coords.fromWGS84(16.895626376524017, 49.55535324868023);

	vrstva.addImage("./felis-density-map-voronoi.png", leftTop, rightBottom);

	var coords = [];


	data.places.forEach(function (place, index, arr) {
		var znacka = JAK.mel("div");
		var obrazek = JAK.mel("img", { src: "./pin.png", style: "height: 24px;" });
		znacka.appendChild(obrazek);

		var popisek = JAK.mel("div", {}, { textAlign: "center", fontSize: "10px", color: "black" });
		popisek.innerHTML = place.name;
		//znacka.appendChild(popisek);

		var markerImageUrl = "./pin-4-lightblue-small.png";
		if (data.placesWithObservationInProgress.includes(place.name)) markerImageUrl = "./pin-4-pink-small.png";
		var options = { title: place.name + "\r\n" + place.description, url: markerImageUrl };
		var loc = SMap.Coords.fromWGS84(place.latitude, place.longitude);
		coords.push(loc);
		var marker = new SMap.Marker(loc, place.name, options);
		layer.addMarker(marker)
	});

	var zoom = mapa.computeCenterZoom(coords);
	mapa.setCenterZoom(zoom[0], zoom[1]);
};
