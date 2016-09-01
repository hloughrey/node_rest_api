let createFeatureString = function(row){
  let featureString = {
      type: "Feature",
      geometry: JSON.parse(row.geom),
      properties: {
        id: row.id,
        usrn: row.usrn,
        roadname: row.roadname,
        town: row.town,
        adoption_status: row.adoption_status,
        open: row.open,
        notes: row.notes
      }
    }

  return featureString;
};

let createGeoJsonObject = function(features){
  let geoJson = {
        type: "FeatureCollection",
        features: features,
        crs: {
          type: "EPSG",
          properties: {
            code: "4326"
          }
        }
      };
  return JSON.stringify(geoJson);
}

module.exports = {
  roadsModel: function(result) {
    return new Promise((resolve, reject) => {
      let geoJSON = new
      let features = [];

      result.map((row) => {
        features.push(createFeatureString(row));
      })

      let geoJSON = createGeoJsonObject(features);
    })

    return geoJSON;
  }
}
