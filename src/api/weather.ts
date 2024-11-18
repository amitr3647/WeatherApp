import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "./config";
import { Coordinates } from "./types";

class weatherAPI {
    private axiosInstance: AxiosInstance;
    constructor(){
this.axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization":'Bearer randomTOkend adfafd',
    }
})
    }
  private createUrl(endpoint: string, params: any) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }
  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }

    return response.json();
  }
  async searchLocations(query: string) {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/direct`, {
      q: query,
      limit: "5",
    });
    try {
      const data = await axios.get(url);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getCurrentWeather(payload: any) {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, payload);
    try {
      const data = await axios.get(url);
      return data;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getForecast({ lat, lon }: Coordinates): Promise<any> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    
    return this.fetchData<any>(url);
  }

  async reverseGeoCoding(payload: Coordinates | null){
const url = this.createUrl(`${API_CONFIG.GEO_URL}/reverse`,payload);
try{
return await axios.get(url);
}catch(err: any){
throw new Error(err.message);
}
  }
}
export const weatherApi = new weatherAPI();
