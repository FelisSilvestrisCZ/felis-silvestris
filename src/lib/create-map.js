export default function createMap(mapElement, data, clickHandler) {
	if (!data) return;
	var stred = SMap.Coords.fromWGS84(data.dimensions.area.referencePoint.longitude, data.dimensions.area.referencePoint.latitude);
	var mapa = new SMap(mapElement, stred, 14);
	mapa.addDefaultLayer(SMap.DEF_OPHOTO).enable();
	var scale = new SMap.Control.Scale();
	mapa.addControl(scale, { left: "2em", bottom: "2em" });
	// mapa.addDefaultControls();
	var layer = new SMap.Layer.Marker();
	mapa.addLayer(layer);
	layer.enable();

	data.overlays.forEach((overlay, index, arr) => {
		// console.log(JSON.stringify(overlay));
		var vrstva = new SMap.Layer.Image();     /* Obr�zkov� vrstva */
		vrstva.overlay = overlay;
		mapa.addLayer(vrstva);                      /* P�idat ji do mapy */
		if (index == 0)
			vrstva.enable();                         /* A povolit */

		/* P�idat do vrstvy obr�zek */
		var leftTop = SMap.Coords.fromWGS84(overlay.geoRect.min.longitude, overlay.geoRect.max.latitude);
		var rightBottom = SMap.Coords.fromWGS84(overlay.geoRect.max.longitude, overlay.geoRect.min.latitude);

		vrstva.addImage("https://localhost:800/api/campaign/3c2ea8b0-b612-42f5-8b00-f2c628d8098b/" + overlay.imageUrl, leftTop, rightBottom);
	});

	var coords = [];

	data.sites.forEach(function (place, index, arr) {
		var znacka = JAK.mel("div");
		var obrazek = JAK.mel("img", { src: data.sitesInProgress.includes(place.name) ? "../../pin-magenta.png" : "../../pin.png", style: "height: 24px;" });
		znacka.appendChild(obrazek);

		var popisek = JAK.mel("div", {}, { textAlign: "center", fontSize: "10px", color: "white", position: "absolute", color: "#d1f5ff", left: "-3px", top: "2.5em", transform: "translatex(50%)",  fontFamily: "Kanit" });
		popisek.innerHTML = place.name;
		znacka.appendChild(popisek);

		var markerImageUrl = "../../pin-4-lightblue-small.png";
		if (data.sitesInProgress.includes(place.name)) markerImageUrl = "../../pin-4-pink-small.png";
		var options = { title: place.name + "\r\n" + place.description, url: znacka, anchor: { left: 20, bottom: 0 } };
		var loc = SMap.Coords.fromWGS84(place.longitude, place.latitude);
		coords.push(loc);
		var marker = new SMap.Marker(loc, place.name, options);
		var relOptions = { anchor: { left: 0, bottom: 0 } };
		//marker.decorate(SMap.Marker.Feature.RelativeAnchor, relOptions);
		layer.addMarker(marker);
	});

	var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM); /* Ovl�d�n� my�� */
	mapa.addControl(mouse);

	function click(e, elm) { /* Do�lo ke kliknut�, spo��t�me kde */
		if (clickHandler) {
			var clickCoords = SMap.Coords.fromEvent(e.data.event, mapa).toWGS84();
			clickHandler(mapa, clickCoords[1], clickCoords[0]);
        }
	}
	mapa.getSignals().addListener(window, "map-click", click); /* P�i sign�lu kliknut� volat tuto funkci */    

	var zoom = mapa.computeCenterZoom(coords);
	mapa.setCenterZoom(zoom[0], zoom[1]);

	return mapa;
};


