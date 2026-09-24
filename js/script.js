console.log('script.js підключено');

// Додано imgSrc, imgAlt та badgeClass у кожен об'єкт масиву
const trips = [
    {
        destination: 'Париж, Франція', 
        startDay: '15.06.2026', 
        endDay: '22.06.2026', 
        days: 7, 
        budget: 1200, 
        status: '✈️ Заплановано',
        badgeClass: 'badge--planned',
        imgSrc: 'assets/img/paris.jpg',
        imgAlt: 'Вид на Ейфелеву вежу ввечері'
    },
    {
        destination: 'Рим, Італія', 
        startDay: '10.09.2026', 
        endDay: '18.09.2026', 
        days: 8, 
        budget: 1500, 
        status: '⏳ В процесі бронювання',
        badgeClass: 'badge--in-progress',
        imgSrc: 'assets/img/rome.jpg',
        imgAlt: 'Колізей у Римі під сонячним промінням'
    },
    {
        destination: 'Барселона, Іспанія', 
        startDay: '05.10.2026', 
        endDay: '12.10.2026', 
        days: 7, 
        budget: 900, 
        status: '✈️ Заплановано',
        badgeClass: 'badge--planned',
        imgSrc: 'assets/img/barcelona.jpg',
        imgAlt: 'Храм Святого Сімейства в Барселоні'
    },
    {
        destination: 'Відень, Австрія', 
        startDay: '07.10.2026', 
        endDay: '09.10.2026', 
        days: 2, 
        budget: 750, 
        status: '✅ Завершено',
        badgeClass: 'badge--completed',
        imgSrc: 'assets/img/wien.jpg',
        imgAlt: 'Панорама Відня'
    }
];

const costPerDay = trip => Math.round(trip.budget / trip.days);

function processTrips(tripList) {
    console.log(' Список подорожей: ');
    for (const trip of tripList) {
        let category = '';

        if (trip.budget < 1000) {
            category = 'дешева';
        } else {
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

const singleTrip = { destination: 'Рим', days: 4, budget: 800 };
console.log(`Середній бюджет на день у м. ${singleTrip.destination}:$${costPerDay(singleTrip)}`);


// ====================== DOM ======================

// Видаляємо статичні картки з HTML
const staticCards = document.querySelectorAll('#trips #cards article');
staticCards.forEach(card => card.remove());

const listContainer = document.querySelector('#trips #cards');

/**
 * Рендерить список подорожей у DOM-дерево
 * @param {Array} tripsList - масив об'єктів подорожей
 */
function renderTrips(tripsList) {
    listContainer.innerHTML = '';

    tripsList.forEach(trip => {
        // 1. Створення контейнера картки <article>
        const card = document.createElement('article');

        // 2. Створення заголовка <h3>
        const nameOfTrip = document.createElement('h3');
        nameOfTrip.textContent = trip.destination;

        // 3. Створення тегу зображення <img>
        const imgOfTrip = document.createElement('img');
        imgOfTrip.src = trip.imgSrc;
        imgOfTrip.alt = trip.imgAlt;

        // 4. Створення абзацу з датами та інфо про дні/бюджет <p>
        const infoOfTrip = document.createElement('p');
        infoOfTrip.textContent = `Дати: ${trip.startDay} – ${trip.endDay} (${trip.days} днів, $${trip.budget})`;

        // 5. Створення бейджа статусу <span>
        const statusBadge = document.createElement('span');
        statusBadge.classList.add('badge', trip.badgeClass);
        statusBadge.textContent = trip.status;

        // 6. Вимоги Варіанта 10: data-атрибут + умовний клас за бюджетом
        const dailyCost = costPerDay(trip);
        card.dataset.costPerDay = dailyCost;

        if (trip.budget < 1000) {
            card.classList.add('budget');
        } else {
            card.classList.add('expensive');
        }

        // 7. Збирання картки у відповідному порядку структури HTML
        card.append(nameOfTrip, imgOfTrip, infoOfTrip, statusBadge);

        // 8. Додавання готової картки у контейнер
        listContainer.append(card);
    });
}

function totalTrips(tripsList) {
    const allTrips = document.querySelector('.page-layout #trips-count');

    if (allTrips) {
        allTrips.textContent = `Всього подорожей: ${tripsList.length}`;
    }
}

renderTrips(trips);
totalTrips(trips);