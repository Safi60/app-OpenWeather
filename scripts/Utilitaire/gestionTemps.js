const weekDay = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche'
]

let now = new Date();
let options = {weekday: 'long'};
let actualDay = now.toLocaleDateString("fr-FR", options)

actualDay = actualDay.charAt(0).toUpperCase() + actualDay.slice(1);

let tabDays = weekDay.slice(weekDay.indexOf(actualDay)).concat(weekDay.slice(0, weekDay.indexOf(actualDay)));
// console.log(tabDays);

export default tabDays;
