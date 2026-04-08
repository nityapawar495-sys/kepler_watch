const container = document.getElementById('missions');
const load = document.getElementById('load');
const searchInput = document.getElementById('search');

// store all data
let allData = [];

async function getMissions() {
    try {
        load.style.display = 'block';

        const res = await fetch('https://api.spacexdata.com/v4/launches');
        const data = await res.json();

        // save data
        allData = data;

        // show data
        displayData(allData);

    } catch (err) {
        load.innerText = "Error while loading data 😭";
    }

    load.style.display = 'none';
}


// display function
function displayData(data) {
    container.innerHTML = "";

    data.slice(0, 20).forEach(item => {
        container.innerHTML += `
        <div class="mission-card">
            <h3>${item.name}</h3>
            <p>Flight Number: ${item.flight_number}</p>
            <p>Status: ${
                item.success === null
                ? 'Upcoming'
                : item.success
                ? 'Success'
                : 'Failed'
            }</p>
        </div>
        `;
    });
}


// search
searchInput.addEventListener("input", function () {
    const text = searchInput.value.toLowerCase();

    const searched = allData.filter(item =>
        item.name.toLowerCase().includes(text)
    );

    displayData(searched);
});


//Filter
function filterMissions(type){
    let filtered;

    if (type === 'success') {
        filtered = allData.filter(item => item.success === true);
    }
    else if (type === 'failed') {
        filtered = allData.filter(item => item.success === false);
    }
    else if (type === 'upcoming') {
        filtered = allData.filter(item => item.success === null);
    }
    else {
        filtered = allData;
    }

    displayData(filtered);
}
// Sort
function sortByFlight() {
    const sorted = [...allData].sort((a, b) =>
        a.flight_number - b.flight_number
    );

    displayData(sorted);
}


// start
getMissions();