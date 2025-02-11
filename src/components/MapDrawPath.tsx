
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

interface MapDrawPathProps {
  onPathChange: (wkt: string) => void;
  initialWkt?: string;
}

export const MapDrawPath: React.FC<MapDrawPathProps> = ({ onPathChange, initialWkt }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const [temporaryToken, setTemporaryToken] = useState('');

  useEffect(() => {
    // Aqui você deve inserir seu token do Mapbox
    setTemporaryToken('COLOQUE_SEU_TOKEN_AQUI');
  }, []);

  // Função para converter WKT para GeoJSON
  const wktToGeoJSON = (wkt: string) => {
    if (!wkt.startsWith('LINESTRING')) return null;
    
    const coordinates = wkt
      .replace('LINESTRING(', '')
      .replace(')', '')
      .split(',')
      .map(pair => pair.trim().split(' ').map(Number));

    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    };
  };

  useEffect(() => {
    if (!mapContainer.current || !temporaryToken) return;

    mapboxgl.accessToken = temporaryToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-47.9292, -15.7801], // Centro em Brasília
      zoom: 5
    });

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true
      }
    });

    map.current.addControl(draw.current);

    map.current.on('draw.create', updateRoute);
    map.current.on('draw.update', updateRoute);
    map.current.on('draw.delete', () => onPathChange(''));

    // Carregar caminho inicial se existir
    map.current.on('load', () => {
      if (initialWkt) {
        const geoJSON = wktToGeoJSON(initialWkt);
        if (geoJSON && draw.current) {
          draw.current.add(geoJSON);
          
          // Ajustar o mapa para mostrar todo o caminho
          const coordinates = geoJSON.geometry.coordinates;
          const bounds = coordinates.reduce((bounds, coord) => {
            return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

          map.current?.fitBounds(bounds, {
            padding: 50,
            maxZoom: 15
          });
        }
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [temporaryToken, initialWkt]);

  const updateRoute = () => {
    if (!draw.current) return;
    
    const data = draw.current.getAll();
    if (data.features.length > 0) {
      const coordinates = data.features[0].geometry.coordinates;
      const wkt = `LINESTRING(${coordinates.map(coord => `${coord[0]} ${coord[1]}`).join(',')})`;
      onPathChange(wkt);
    }
  };

  return (
    <>
      {!temporaryToken && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
          <p className="text-sm text-muted-foreground">
            Por favor, insira seu token do Mapbox no código do componente MapDrawPath
          </p>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </>
  );
};
