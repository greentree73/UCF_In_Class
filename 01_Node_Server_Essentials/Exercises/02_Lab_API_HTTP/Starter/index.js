        // Output logging function
        function log(message, type = 'info') {
            const output = document.getElementById('output');
            const timestamp = new Date().toLocaleTimeString();
            const colorClass = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info';
            
            if (output) {
                output.innerHTML += `<span class="${colorClass}">[${timestamp}] ${message}</span>\n`;
                output.scrollTop = output.scrollHeight;
            }
        }

        async function fetchPost() {
            const button = document.getElementById('fetchBtn');
            button.disabled = true;
            button.textContent = 'Fetching...';
            
            log('🚀 Fetching post data from JSONPlaceholder API...', 'info');
            
            try {
                // Make a GET request to fetch post with ID 1
                const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
                
                log(`📊 Response Status: ${response.status} (${response.statusText})`, 'info');
                log(`📍 Response URL: ${response.url}`, 'info');
                log(`📋 Content Type: ${response.headers.get('content-type')}`, 'info');
                log('', 'info'); // Empty line
                
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                // Parse the JSON response
                const post = await response.json();
                
                // Display the results in a formatted way
                log('✅ Success! Post data received:', 'success');
                log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
                log(`📝 Post ID: ${post.id}`, 'success');
                log(`👤 User ID: ${post.userId}`, 'success');
                log(`📰 Title: ${post.title}`, 'success');
                log(`📄 Body: ${post.body}`, 'success');
                log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
                log('', 'success'); // Empty line
                
                // Demonstrate accessing specific properties
                log('🔍 Working with the data:', 'info');
                log(`   • Title length: ${post.title.length} characters`, 'info');
                log(`   • Body length: ${post.body.length} characters`, 'info');
                log(`   • Full post belongs to user #${post.userId}`, 'info');
                
            } catch (error) {
                log('❌ Error fetching post:', 'error');
                
                // Provide helpful information about the error
                if (error instanceof Error) {
                    log(`   Error message: ${error.message}`, 'error');
                }
            } finally {
                button.disabled = false;
                button.textContent = 'Fetch Post Data';
            }
        }

        function clearOutput() {
            const output = document.getElementById('output');
            if (output) {
                output.innerHTML = 'Click "Fetch Post Data" to see the API response...\n';
            }
        }

        // Auto-focus for better UX
        window.addEventListener('load', () => {
            log('🎯 Ready! Open Developer Tools (F12) → Network tab, then click "Fetch Post Data"', 'info');
        });