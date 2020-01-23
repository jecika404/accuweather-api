class Forcast {
    constructor() {
        this.key = 'jdxBABxwxNQsYI4Dw4B9UxgUhgJVR9KG';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updataCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);    
    
        return {
            cityDetails,
            weather
        };
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
    
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
    
        return data[0];
    }
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }
}







