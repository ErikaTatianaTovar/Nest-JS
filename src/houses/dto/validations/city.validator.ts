export class CityValidator {
    async validateCity(city: string) {
        // Validacion de ciudad
        const response = await fetch('https://api-colombia.com/api/v1/City');
        const cities = await response.json();
  
        return cities.some((city) =>
          city.name.toUpperCase().includes(city.toUpperCase())
        );
      }
    }