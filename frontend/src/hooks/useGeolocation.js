// src/hooks/useGeolocation.js
import { useEffect, useState } from "react";

export const useGeolocation = (defaultCoords = null) => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalização não é suportada neste navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;

        // Substituir por valores default se fornecidos (opcional)
        if (defaultCoords) {
          latitude = defaultCoords.latitude;
          longitude = defaultCoords.longitude;
        }

        setLocation({
          type: "Point",
          coordinates: [longitude, latitude],
        });
      },
      (error) => {
        setLocationError("Não foi possível obter a localização.");
        console.error(error.message);
      }
    );
  }, [defaultCoords]);

  return { location, locationError };
};
