async function compareCosts() {
    const fuelCost = parseFloat(document.getElementById('fuel_cost').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const fuelEfficiency = parseFloat(document.getElementById('fuel_efficiency').value);
    const evEnergyEfficiency = parseFloat(document.getElementById('ev_energy_efficiency').value);
    const chargingCost = parseFloat(document.getElementById('charging_cost').value);

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "Calculating..."; // Temporary message while processing.

    try {
        // Perform the calculations locally
        const monthlyFuelCost = (distance / fuelEfficiency) * fuelCost;
        const monthlyEvCost = (distance / 100) * evEnergyEfficiency * chargingCost;
        const monthlySavings = monthlyFuelCost - monthlyEvCost;

        // Determine the message based on the savings
        let message = '';
        if (monthlySavings > 0) {
            message = `You could have saved ₦${monthlySavings.toFixed(2)} this month by switching to an EV!`;
        } else {
            message = `Switching to an EV may not save you money this month, based on the data provided.`;
        }

        // Display the results
        resultsDiv.innerHTML = `
            <h2>Results:</h2>
            <p>Monthly Fuel Cost: ₦${monthlyFuelCost.toFixed(2)}</p>
            <p>Monthly EV Charging Cost: ₦${monthlyEvCost.toFixed(2)}</p>
            <p>Monthly Savings: ₦${monthlySavings.toFixed(2)}</p>
            <p><strong>${message}</strong></p>
        `;
    } catch (error) {
        resultsDiv.innerHTML = `<p style="color: red;">An error occurred: ${error.message}</p>`;
    }
}
