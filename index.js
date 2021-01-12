function handleFormSubmit() {
    $('form').on('submit', (event) => {
        event.preventDefault();
        let location = $(event.currentTarget).find('.location').val();
        let maxResults = Number(
            $(event.currentTarget).find('.maxResults').val()
        );
        if (maxResults === 0) {
            maxResults = 10;
        }
        getResults(location, maxResults);
    });
}

function getResults(location, maxResults) {
    const searchUrl = `https://developer.nps.gov/api/v1/parks?api_key=FDejIbfYDKxUm6O36lj4JMiaSIhJPVgyUIaRNlId&stateCode=${encodeURIComponent(location
    )}&limit=${encodeURIComponent(maxResults)}`;
    fetch(searchUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then((responseJson) => render(responseJson))
        .catch((error) => {
            console.log('Something went wrong', error);
        });
}

function render(responseJson) {

    $('.results').empty();

    let results = responseJson.data.map((park) => {
        return `<div>
      <h2>${park.fullName}</h2><a href="${park.url}">Visit the Park Website</a><p>${park.description}</p>
      </div>`;
    });

    results = results.join('');
    $('.results').html(results);
}

function main() {
    handleFormSubmit();
}

$(main);