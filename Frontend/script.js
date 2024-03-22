document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiDiv = document.getElementById('bmi');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', async () => {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            resultDiv.textContent = 'Invalid input. Height and weight must be positive numbers.';
            return;
        }

        const response = await fetch('https://bmi-backend-1.onrender.com/calculateBMI', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({ height, weight })
    });

        const data = await response.json();

        if (response.ok) {
            bmiDiv.textContent = `BMI: ${data.bmi.toFixed(2)}`;
            resultDiv.textContent = `Result: ${data.interpretation}`;
        } else {
            resultDiv.textContent = `Error: ${data.error}`;
        }
    });
});
