export default function createSimpleMap(mapElement, lat, lon, base, zoom) {
	var center = SMap.Coords.fromWGS84(lon, lat);
	var m = new SMap(mapElement, center, zoom);
	m.addDefaultLayer(base).enable();
	return m;
};
