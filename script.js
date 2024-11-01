document.getElementById('booking-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const emailBody = `Name: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}`;

  window.location.href = `mailto:your-email@example.com?subject=Booking Request&body=${encodeURIComponent(emailBody)}`;

  //Clear the form fields
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';

  function submitSimulationQuestion() {
    const question = document.getElementById('user-question').value;
    const doctorResponseDiv = document.getElementById('doctor-response');
  
    if (question.trim()) {
        doctorResponseDiv.innerHTML = "<p>The doctor is reviewing your question...</p>";
        setTimeout(() => {
            doctorResponseDiv.innerHTML = "<p>The doctor says: Based on your data, you're in good health! Stay active and monitor your glucose levels.</p>";
        }, 2000); 
    } else {
        doctorResponseDiv.innerHTML = "<p>Please enter a valid question.</p>";
    }
  }

  document.getElementById('diseasePredictionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get input values
    const currentCases = parseInt(document.getElementById('currentCases').value) * 1000;
    const transmissionRate = parseFloat(document.getElementById('transmissionRate').value);
    const mutationRate = parseFloat(document.getElementById('mutationRate').value);
    const days = parseInt(document.getElementById('days').value);

    // Basic growth rate formula: Assume exponential growth
    const dailyGrowth = transmissionRate / 10;  // Simplified transmission impact
    const futureCases = currentCases * Math.pow((1 + dailyGrowth), days);

    // Include mutation chance: Simulate new variant emergence
    let mutationRisk = '';
    if (mutationRate > 10) {
        mutationRisk = 'High mutation risk. A new variant is likely to emerge.';
    } else if (mutationRate > 5) {
        mutationRisk = 'Moderate mutation risk. Some chance of a new variant.';
    } else {
        mutationRisk = 'Low mutation risk. A new variant is unlikely in the short term.';
    }

    // Display prediction results
    document.getElementById('diseasePredictionResult').innerHTML = `
        In ${days} days, there could be approximately ${Math.round(futureCases)} cases based on current transmission rates.<br>
        Mutation Prediction: ${mutationRisk}
    `;
});
  
// Chart.js for the Weekly Summary Bar Chart
const weeklySummaryCtx = document.getElementById('weeklySummaryChart').getContext('2d');
const weeklySummaryChart = new Chart(weeklySummaryCtx, {
    type: 'bar',
    data: {
        labels: ['Sept 22-28', 'Sept 29-Oct 5', 'Oct 6-12', 'Oct 13-19'],
        datasets: [{
            label: 'Weekly COVID Cases',
            data: [100, 150, 120, 80],  // replace with actual data
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.raw} cases`;
                    }
                }
            }
        }
    }
});


});