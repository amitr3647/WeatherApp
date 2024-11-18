import CurrentLocation from '@/components/CurrentLocation';
import { TodaysTemperature } from '@/components/TodaysTemperature';
import WeatherDetails from '@/components/WeatherDetails';
import { WeatherForecast } from '@/components/WeatherForecaset';
import { useCurrentWeather, useForecastQuery, useReverseLocation } from '@/hooks/useWeather';
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WeatherSkeleton from '@/components/WeatherSkeleton';
 function CityDetail() {
  const paramsData = useParams();
  const [locationParams,setLocationParams] = useSearchParams();
  const lat = locationParams.get('lat');
  const lon = locationParams.get('lon');
  const  currentCityCoordinates = {
    lat:Number(lat),
    lon:Number(lon)
  }
  const weatherData =  useCurrentWeather(currentCityCoordinates);
  const forecastQuery = useForecastQuery(currentCityCoordinates);
  const reverseLocationData = useReverseLocation(currentCityCoordinates);
  if (weatherData.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant="outline" className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!weatherData.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }
  return (
    <div>
      <div className="grid gap-3">

<div className="grid grid-cols-2 gap-3 ">
  <CurrentLocation
    weatherData={weatherData?.data?.data}
    locationData={reverseLocationData?.data?.data}
    />
  <TodaysTemperature data={forecastQuery.data}  />
</div>

<div className="grid grid-cols-2 gap-3">
  <WeatherDetails data={weatherData?.data?.data} />
  <WeatherForecast data={forecastQuery.data} />
    </div>
</div>
    </div>
  )
}

export default CityDetail