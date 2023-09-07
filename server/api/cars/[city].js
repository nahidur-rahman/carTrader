import cars from '@/data/cars.json'

export default defineEventHandler((event)=>{
    // we can get the params by getting the event.context.params 
    const {city} = event.context.params;

    //to get the queries, we have to call the getQuery function
    const {minPrice, maxPrice, make} = getQuery(event);

    let filteredCars = cars;

    filteredCars = filteredCars.filter((car)=> {
        return car.city.toLowerCase() === city.toLowerCase();
    });

    if(make){
        filteredCars = filteredCars.filter((car)=>{
            return car.make.toLowerCase() === make.toLowerCase();
        })
    }
    if(minPrice){
        filteredCars = filteredCars.filter((car)=>{
            return car.price >= parseInt(minPrice);
        })
    }
    if(maxPrice){
        filteredCars = filteredCars.filter((car)=>{
            return car.price <= parseInt(maxPrice);
        })
    }
    return filteredCars;
})