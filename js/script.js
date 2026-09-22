console.log('script.js підключено');

const trips = [
    {destination: 'Париж, Франція', days:7, budget: 1200},
    {destination: 'Рим, Італія', days:8, budget: 1500},
    {destination: 'Барселона, Іспанія', days:7, budget: 900},
    {destination: 'Відень, Австрія', days:2, budget: 750}
]

const costPerDay = trip => Math.round(trip.budget/ trip.days);

function processTrips(tripList){
    console.log(' Список подорожей: ');
    for( const trip of tripList){
        let category ='';

        if(trip.budget<1000)
        {
            category = 'дешева';
        }
        else{
            category = 'дорога';
        }
        const dailyCost = costPerDay(trip);
        console.log(
            `Куди: ${trip.destination} | Тривалість: ${trip.days} днів.` +
            `Загальний бюджет: $${trip.budget} (${category}) | ` +
            `Витрати на день: ~$${dailyCost}`
        );
    }
}
processTrips(trips);
// Додаткова перевірка стрілкової функції з окремим об'єктом
const singleTrip = { destination: 'Рим', days: 4, budget: 800 };
console.log(`Середній бюджет на день у м. ${singleTrip.destination}:$${costPerDay(singleTrip)}`);