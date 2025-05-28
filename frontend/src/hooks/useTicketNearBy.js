import { useState, useEffect } from "react";
import { useTickets } from "../context/FiltrosContext";
import { getDistance } from "geolib";
import { useTicketsContext } from "./useTicketsContext";

export const useTicketNearBy = () => {
  const { tickets, dispatch } = useTicketsContext();
  const { distanceFilter, typeFilter, categoryFilter, statusFilter } =
    useTickets();

  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [userCoords, setUserCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(categoryFilter);

  //*
  //*
  // calcula a distancia
  const getDistanceNearBy = (ticket) => {
    // console.log(ticket.location.coordinates);
    const [lon, lat] = ticket.location.coordinates;

    const distanceMeters = userCoords
      ? getDistance(
          {
            latitude: userCoords.latitude,
            longitude: userCoords.longitude,
          },
          { latitude: lat, longitude: lon }
        )
      : null;

    return distanceMeters;
  };

  console.log(typeFilter, statusFilter, categoryFilter);

  // Get user location only once
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalização não é suportada neste navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ latitude, longitude });
      },
      (err) => {
        console.error(err);
        setLocationError("Não foi possível obter a localização.");
      }
    );
  }, []);

  useEffect(() => {
    if (!userCoords) return;

    const fetchNearbyTickets = async () => {
      setIsLoading(true);

      const queryParams = new URLSearchParams({
        lat: userCoords.latitude,
        lon: userCoords.longitude,
        maxDistance: distanceFilter.toString(),
        ...(statusFilter && { status: statusFilter }),
        ...(categoryFilter && { category: categoryFilter }),
        ...(typeFilter && { typeOfTicket: typeFilter }),
      });

      try {
        const res = await fetch(
          `/api/tickets/nearby?${queryParams.toString()}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Erro ao buscar tickets.");
        }

        dispatch({ type: "SET_TICKETS", payload: data });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyTickets();
  }, [userCoords, distanceFilter, typeFilter, categoryFilter, statusFilter]);

  return {
    locationError,
    error,
    isLoading,
    tickets,
    distanceFilter,
    userCoords,
    getDistanceNearBy,
  };
};
