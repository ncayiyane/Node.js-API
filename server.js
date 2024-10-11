const http = require('http');
const fs = require('fs');
const DATA = 'items.json';

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    // Set header content type
    res.setHeader('Content-Type', 'application/json');
    
    // Check for the request method and URL 
    if (req.method === 'GET') {
        // Handle GET request
        if (req.url === '/items') {
            const data = fs.readFile(DATA, 'utf-8');
            const items = JSON.parse(data);
            res.statusCode = 200;
            res.end(JSON.stringify(items));
        } else if (req.url === '/about') {
            res.statusCode = 200;
            res.end(JSON.stringify({ message: 'About Me' }));
        } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Page not found' }));
        }
    } else if (req.method === 'POST' && req.url === '/items') {
        // Handle POST request   
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
    
        req.on('end', () => {
            try {
                const newItem = JSON.parse(body);
                const data = fs.readFileSync(DATA, 'utf-8');
                const items = JSON.parse(data);
    
                // Add the new item to the array
                items.push(newItem);
    
                // Write the updated array back to the file
                fs.writeFileSync(DATA, JSON.stringify(items, null, 2)); // Save with indentation
    
                // Respond with the updated list of items
                res.statusCode = 201;
                res.end(JSON.stringify(items));
            } catch (error) {
                console.error('Error handling POST request:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
            }
        });

    } else if (req.method === 'PUT' && req.url === '/items') {
        // Handle PUT request
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', () => {
            try {
                const updatedItem = JSON.parse(body);
                const data = fs.readFileSync(DATA, 'utf-8');
                const items = JSON.parse(data);
                const itemsName = updatedItem.name;
                
                const itemIndex = items.findIndex(item => item.name === itemsName);

                if (itemIndex !== -1) {
                    items[itemIndex] = { ...items[itemIndex], ...updatedItem };

                    fs.writeFileSync(DATA, JSON.stringify(items, null, 2));

                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: 'Item updated successfully', item: items[itemIndex] }));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: 'Item not found' }));
                }

            } catch (error) {
                console.error('Error handling PUT request:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
            }
        });

    } else if (req.method === 'DELETE' && req.url === '/items') {
        // Handle DELETE request
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const deletedItem = JSON.parse(body);
                const data = fs.readFileSync(DATA, 'utf-8');
                const items = JSON.parse(data);
                const itemsName = deletedItem.name;

                const itemIndex = items.findIndex(item => item.name === itemsName);

                if (itemIndex !== -1) {
                    items.splice(itemIndex, 1); // Remove the item

                    fs.writeFileSync(DATA, JSON.stringify(items, null, 2));

                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: 'Item deleted successfully' }));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ message: 'Item not found' }));
                }

            } catch (error) {
                console.error('Error handling DELETE request:', error);
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
            }
        });

    } else {
        res.statusCode = 405;
        res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
