from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # This will allow all origins, you can restrict it later if needed

@app.route('/calculate', methods=['POST'])
def calculate_costs():
    data = request.get_json()

    # Extract data from the request
    fuel_cost = data['fuel_cost']
    distance = data['distance']
    fuel_efficiency = data['fuel_efficiency']
    ev_energy_efficiency = data['ev_energy_efficiency']
    charging_cost = data['charging_cost']

    # Perform the calculations
    monthly_fuel_cost = (distance / fuel_efficiency) * fuel_cost
    monthly_ev_cost = (distance / 100) * ev_energy_efficiency * charging_cost
    monthly_savings = monthly_fuel_cost - monthly_ev_cost

    # Return the result as a JSON response
    return jsonify({
        'monthly_fuel_cost': monthly_fuel_cost,
        'monthly_ev_cost': monthly_ev_cost,
        'monthly_savings': monthly_savings
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))  # Use the PORT environment variable if set, otherwise default to 10000
    app.run(host='0.0.0.0', port=port, debug=True)  # This binds the app to all network interfaces
