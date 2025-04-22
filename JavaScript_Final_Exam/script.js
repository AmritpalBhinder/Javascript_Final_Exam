fetch('https://api.rootnet.in/covid19-in/stats/latest')
        .then(response =>response.json())
        .then(data => {
            const table = document.querySelector('table');
            const regionalData = data.data.regional;

            regionalData.forEach((state, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${state.loc}</td>
                    <td>${state.confirmedCasesIndian}</td>
                    <td>${state.confirmedCasesForeign}</td>
                    <td>${state.discharged}</td>
                    <td>${state.deaths}</td>
                    <td>${state.totalConfirmed}</td>
                `;
                table.appendChild(row);
        });
        })
        .catch(error =>{
            console.error("Error fetching COVID-19 data:", error);
        });