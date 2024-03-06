const axios = require('axios');

// API endpoint to test
const apiUrl = 'http://localhost:3000/species?page=1&perPage=10&fieldId=1&valueId=2&search=a';

// Number of requests to send per second
const requestsPerSecond = 50;

// Total number of requests to send
const totalRequests = requestsPerSecond * 60; // 50 requests per second for 1 minute

// Counter for successful requests
let successCount = 0;

// Array to store response times
let responseTimes = [];

// Function to send a request
async function sendRequest() {
    const start = Date.now();
    try {
        await axios.get(apiUrl);
        const end = Date.now();
        const responseTime = end - start;
        responseTimes.push(responseTime);
        successCount++;
    } catch (error) {
        console.error('Error sending request:', error.message);
    }
}

// Function to start sending requests
async function startBenchmark() {
    console.log('Starting benchmark...');
    let startTime = Date.now();
    let endTime = startTime + 60 * 1000; // 1 minute
    while (Date.now() < endTime) {
        await Promise.all(Array.from({ length: requestsPerSecond }, () => sendRequest()));
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second
    }
    console.log('Benchmark completed.');
    console.log(`Requests per second: ${successCount / 60}`); // Average requests per second

    // Calculate average response time
    const totalResponseTime = responseTimes.reduce((acc, curr) => acc + curr, 0);
    const averageResponseTime = totalResponseTime / totalRequests;
    console.log(`Average response time: ${averageResponseTime} ms`);
}

// Start the benchmark
startBenchmark();