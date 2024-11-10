document.getElementById('enableXSS').addEventListener('change', (event) => {
    fetch(`/toggle-xss?enable=${event.target.checked}`);
  });
  
  document.getElementById('enableInsecureStorage').addEventListener('change', (event) => {
    fetch(`/toggle-insecure-storage?enable=${event.target.checked}`);
  });
  
  document.getElementById('xssForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.getElementById('xssInput').value;
    const response = await fetch('/xss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
    });
    const result = await response.text();
    
    const outputDiv = document.getElementById('xssFrame');
    outputDiv.innerHTML = result;

    const scripts = outputDiv.getElementsByTagName('script');
    for (let script of scripts) {
        eval(script.innerHTML);
    }
});
  
  async function fetchSensitiveData() {
    const response = await fetch('/sensitive-data');
    const data = await response.json();
    document.getElementById('sensitiveData').textContent = JSON.stringify(data, null, 2);
  }