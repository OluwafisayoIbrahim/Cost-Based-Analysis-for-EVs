async function compareCosts() {
    const fuelCost = document.getElementById('fuel_cost').value;
    const distance = document.getElementById('distance').value;
    const fuelEfficiency = document.getElementById('fuel_efficiency').value;
    const evEnergyEfficiency = document.getElementById('ev_energy_efficiency').value;
    const chargingCost = document.getElementById('charging_cost').value;

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Calculating..."; // Temporary message while fetching data.

    try {
        // Send a POST request to the Flask backend
        const response = await fetch('http://127.0.0.1:5000/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fuel_cost: parseFloat(fuelCost),
                distance: parseFloat(distance),
                fuel_efficiency: parseFloat(fuelEfficiency),
                ev_energy_efficiency: parseFloat(evEnergyEfficiency),
                charging_cost: parseFloat(chargingCost)
            })
        });
        

        const data = await response.json();

        // Extract data and display the results
        const { monthly_fuel_cost, monthly_ev_cost, monthly_savings } = data;

        let message = '';
        if (monthly_savings > 0) {
            message = `You could have saved ₦${monthly_savings.toFixed(2)} this month by switching to an EV!`;
        } else {
            message = `Switching to an EV may not save you money this month, based on the data provided.`;
        }

        resultsDiv.innerHTML = `
            <h2>Results:</h2>
            <p>Monthly Fuel Cost: ₦${monthly_fuel_cost.toFixed(2)}</p>
            <p>Monthly EV Charging Cost: ₦${monthly_ev_cost.toFixed(2)}</p>
            <p>Monthly Savings: ₦${monthly_savings.toFixed(2)}</p>
            <p><strong>${message}</strong></p>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;
    }
}
