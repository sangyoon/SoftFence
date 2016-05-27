function inside(point, polygon)
{
  var coordinates = polygon.geometry.coordinates;
  var points = [point.geometry.coordinates[0], point.geometry.coordinates[1]];

  // Normalize to multipolygon
  if(polygon.geometry.type === 'Polygon')
  {
    coordinates = [coordinates];
  }

  var isInside = false;
  var i = 0;
  while(i < coordinates.length && !isInside)
  {
    // Check, if it is in the outer circuit first
    if(inCircuit(points, coordinates[i][0]))
    {
      var isInHole = false;
      var j = 1;

      while(j < coordinates[i].length && !isInHole)
      {
        if(inCircuit(point, coordinates[i][j]))
        {
          isInHole = true;
        }

        ++j;
      }

      if(!isInHole)
      {
        isInside = true;
      }
    }

    ++i;
  }

  return isInside;
}

function inCircuit(point, circuit)
{
  var isInside = false;

  for(var i=0, j=circuit.length - 1; i<circuit.length; j=i++)
  {
    var x1 = circuit[i][0],
        y1 = circuit[i][1];

    var x2 = circuit[j][0],
        y2 = circuit[j][1];

    var isIntersect = ((y1 > point[1]) !== (y2 > point[1])) && (point[0] < (x2 - x1) * (point[1] - y1) / (y2 -  y1) + x1);

    isInside = (isIntersect) ? !isInside : isInside;
  }

  return isInside;
}

module.exports.inside = inside;
