import { Coordinates } from "@/api/types";
import { weatherApi } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


export const WEATHER_KEYS = {
    weather: (coords: Coordinates) => ["weather", coords] as const,
    forecast: (coords: Coordinates) => ["forecast", coords] as const,
    location: (coords: Coordinates) => ["location", coords] as const,
    search: (query: string) => ["location-search", query] as const,
  } as const;
export const useSearchLocation = (query: string) => {
  const { isPending, error, data } = useQuery({
    //inquery key we pass constant keys to uniquely identify the data.
    queryKey: [query],
    queryFn: () => {
      if (query) {
        return getLocation();
      }
    },
  });
  async function getLocation() {
    const res = await weatherApi.searchLocations(query);
    return res.data;
  }

  return { data };
};

export const useReverseLocation = (coordinates: Coordinates
    |null
)=>{
return useQuery({
    queryKey: [{}],
    queryFn:  ()=> coordinates?weatherApi.reverseGeoCoding(coordinates): null
        
})
}
export const useCurrentWeather = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: [coordinates],
    queryFn: async() => await coordinates?currentWeatherData():null,
  });

  async function currentWeatherData() {
    const payload = coordinates;
    return await weatherApi.getCurrentWeather(payload);
  }
  
};
export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
      queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
      queryFn: () => (coordinates ? weatherApi.getForecast(coordinates) : null),
      enabled: !!coordinates,
    });
  }
