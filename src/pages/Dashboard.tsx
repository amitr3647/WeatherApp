import CurrentLocation from "@/components/CurrentLocation";
import Favourites from "@/components/Favourites";
import {TodaysTemperature} from "@/components/TodaysTemperature";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import { WeatherForecast } from "@/components/WeatherForecaset";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useGeolocation } from "@/hooks/useGeoLocation";
import {
  useCurrentWeather,
  useForecastQuery,
  useReverseLocation,
} from "@/hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = useGeolocation();
  const weatherData = useCurrentWeather(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const reverseLocationData = useReverseLocation(coordinates);
  const refreshHandler = () => {};
  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }


  if (weatherData.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
          <Button variant="outline" onClick={refreshHandler} className="w-fit">
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
    <div className="dashboard ">
      <div className="favourites">
        <Favourites />
      </div>
      <div className="grid gap-3">

      <div className="grid grid-cols-2 gap-3 ">
        <CurrentLocation
          weatherData={weatherData?.data?.data}
          locationData={reverseLocationData?.data?.data}
          />
        <TodaysTemperature data={forecastQuery.data}  />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <WeatherDetails data={weatherData.data.data} />
        <WeatherForecast data={forecastQuery.data} />
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
