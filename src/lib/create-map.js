export default function createMap(mapElement, data, clickHandler) {
	if (!data) return;
	var stred = SMap.Coords.fromWGS84(data.dimensions.area.referencePoint.longitude, data.dimensions.area.referencePoint.latitude);
	var mapa = new SMap(mapElement, stred, 14);
	mapa.addDefaultLayer(SMap.DEF_OPHOTO).enable();
	// mapa.addDefaultControls();
	var layer = new SMap.Layer.Marker();
	mapa.addLayer(layer);
	layer.enable();

	data.overlays.forEach((overlay, index, arr) => {
		// console.log(JSON.stringify(overlay));
		var vrstva = new SMap.Layer.Image();     /* Obrázková vrstva */
		vrstva.overlay = overlay;
		mapa.addLayer(vrstva);                      /* Pøidat ji do mapy */
		if (index == 0)
			vrstva.enable();                         /* A povolit */

		/* Pøidat do vrstvy obrázek */
		var leftTop = SMap.Coords.fromWGS84(overlay.geoRect.min.longitude, overlay.geoRect.max.latitude);
		var rightBottom = SMap.Coords.fromWGS84(overlay.geoRect.max.longitude, overlay.geoRect.min.latitude);

		vrstva.addImage("https://localhost:800/api/campaign/3c2ea8b0-b612-42f5-8b00-f2c628d8098b/" + overlay.imageUrl, leftTop, rightBottom);
	});

	var coords = [];

	data.sites.forEach(function (place, index, arr) {
		var znacka = JAK.mel("div");
		var obrazek = JAK.mel("img", { src: "../../pin.png", style: "height: 24px;" });
		znacka.appendChild(obrazek);

		var popisek = JAK.mel("div", {}, { textAlign: "center", fontSize: "10px", color: "black" });
		popisek.innerHTML = place.name;
		//znacka.appendChild(popisek);

		var markerImageUrl = "../../pin-4-lightblue-small.png";
		if (data.sitesInProgress.includes(place.name)) markerImageUrl = "../../pin-4-pink-small.png";
		var options = { title: place.name + "\r\n" + place.description, url: markerImageUrl };
		var loc = SMap.Coords.fromWGS84(place.longitude, place.latitude);
		coords.push(loc);
		var marker = new SMap.Marker(loc, place.name, options);
		layer.addMarker(marker);
		// loc.getAltitude().then(r => console.log(place.id + ' ' + place.name + ' ' + r));
	});

	var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovládání myší */
	mapa.addControl(mouse);

	function click(e, elm) { /* Došlo ke kliknutí, spoèítáme kde */
		if (clickHandler) {
			var clickCoords = SMap.Coords.fromEvent(e.data.event, mapa).toWGS84();
			clickHandler(mapa, clickCoords[1], clickCoords[0]);
        }
	}
	mapa.getSignals().addListener(window, "map-click", click); /* Pøi signálu kliknutí volat tuto funkci */    

	var zoom = mapa.computeCenterZoom(coords);
	mapa.setCenterZoom(zoom[0], zoom[1]);

	return mapa;
};
