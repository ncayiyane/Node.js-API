const http = require('http');
const fs = require('fs').promises;
const DATA = 'items.json';

const server = http.createServer(async (req, res) => {
    console.log(req.url, req.method);
    res.setHeader('Content-Type', 'application/json');

    try {
        if (req.method === 'GET') {
            if (req.url === '/items') {
                const data = await fs.readFile(DATA, 'utf-8');
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
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                try {
                    const newItem = JSON.parse(body);
                    const data = await fs.readFile(DATA, 'utf-8');
                    const items = JSON.parse(data);

                    items.push(newItem);

                    await fs.writeFile(DATA, JSON.stringify(items, null, 2));

                    res.statusCode = 201;
                    res.end(JSON.stringify(items));
                } catch (error) {
                    console.error('Error handling POST request:', error);
                    res.statusCode = 500;
                    res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
                }
            });
        } else if (req.method === 'PUT' && req.url === '/items') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                try {
                    const updatedItem = JSON.parse(body);
                    const data = await fs.readFile(DATA, 'utf-8');
                    const items = JSON.parse(data);
                    const itemsName = updatedItem.name;

                    const itemIndex = items.findIndex(item => item.name === itemsName);

                    if (itemIndex !== -1) {
                        items[itemIndex] = { ...items[itemIndex], ...updatedItem };

                        await fs.writeFile(DATA, JSON.stringify(items, null, 2));

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
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                try {
                    const deletedItem = JSON.parse(body);
                    const data = await fs.readFile(DATA, 'utf-8');
                    const items = JSON.parse(data);
                    const itemsName = deletedItem.name;

                    const itemIndex = items.findIndex(item => item.name === itemsName);

                    if (itemIndex !== -1) {
                        items.splice(itemIndex, 1);

                        await fs.writeFile(DATA, JSON.stringify(items, null, 2));

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
    } catch (error) {
        console.error('Error handling request:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
