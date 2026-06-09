const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const chatBox = document.getElementById('chatBox');

// Helper component that constructs UI entries and enforces scrolling rules
function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    
    // Auto-scroll window to expose newest content entries
    chatBox.scrollTop = chatBox.scrollHeight;
    return messageDiv;
}

// Asynchronous execution block requesting content from Web AI API
async function fetchWebAIResponse(userPrompt) {
    try {
        // Calling puter.ai.chat securely passes text content upstream.
        // It utilizes an optimal, open-tier model without forcing API Key strings directly into your code.
        const response = await puter.ai.chat(userPrompt);
        return response;
    } catch (error) {
        console.error("API Error context details:", error);
        return "System Warning: Network configuration issue or cloud response latency limit hit. Please retry.";
    }
}

// Application Lifecycle Form Controller 
chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const queryText = userInput.value.trim();
    if (!queryText) return;

    // 1. Instantly append human user prompt message block
    appendMessage(queryText, 'user');
    userInput.value = ''; // Clean field out immediately

    // 2. Generate a structural "Thinking..." item placeholder
    const processingPlaceholder = appendMessage("Connecting to API network...", 'bot');
    processingPlaceholder.classList.add('typing');

    // 3. Resolve asynchronous cloud processing results
    const aiTextOutput = await fetchWebAIResponse(queryText);

    // 4. Update placeholder message layout rules with real text string payload
    processingPlaceholder.textContent = aiTextOutput;
    processingPlaceholder.classList.remove('typing');
});