export default function createSimpleMap(mapElement) {
	var center = SMap.Coords.fromWGS84(14.41790, 50.12655);
	var m = new SMap(mapElement, center, 18);
	m.addDefaultLayer(SMap.DEF_OPHOTO).enable();
	return m;
};
