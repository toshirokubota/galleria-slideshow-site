
export async function getData(key, fetchUrl) {
    try {
      // Try loading data from localStorage
      const storedData = localStorage.getItem(key);
  
      if (storedData) {
        console.log('Loaded data from localStorage');
        return JSON.parse(storedData); // Parse and return if valid
      }
  
      // If data is not in localStorage, fetch it asynchronously
      console.log('Fetching data asynchronously...');
      const response = await fetch(fetchUrl);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Save the fetched data to localStorage for future use
      localStorage.setItem(key, JSON.stringify(data));
      console.log('Fetched and stored data');
      return data;
  
    } catch (error) {
      console.error('Error loading data:', error);
      return null; // Handle errors gracefully
    }
}
