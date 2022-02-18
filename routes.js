const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

module.exports = {
    name: 'ApiRoutes',
    register: async (server, options) => {
      const file = await readFile('./alerts.json', 'utf8');
      const alerts = JSON.parse(file);
      server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'hello world';
            }
        }, {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/api/alerts',
            handler: async (request, h) => {
                var offset = request.query.offset
                var limit = request.query.limit
                var search = request.query.id
                let data = {}

                if(search !== '') {
                    let filtered = alerts.filter(alert => alert._id.includes(search))
                    data = paginatedResults(filtered, offset, limit);
                } else {
                    data = paginatedResults(alerts, offset, limit);
                }
                
                return {
                    total_items: alerts.length,
                    data: data
                }
            }
        }, {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/api/alerts/{id}',
            handler: async (request, h) => {
                const id = request.params.id; 
                const data = alerts.filter((alert) => (alert._id === id));
                const total_alerts = data.length;
                return { 
                    data,
                    total_alerts
                } 
                    
            }
        }, {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/api/agents',
            handler: async (request, h) => {
                const data = [];
                const ids = [];
                alerts.map(alert => {
                    if(!ids.includes(alert._source.agent.id)) {
                        data.push(alert._source.agent)
                        ids.push(alert._source.agent.id)
                    }
                });
                data.map(agent => {
                    const count = alerts.filter(alert => (alert._source.agent.id === agent.id)).length;
                    agent.total_alerts = count;
                });
                return { 
                    total_items: data.length,
                    data: data 
                } 
                    
            }
        }, {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/api/agents/{id}',
            handler: async (request, h) => {
                const id = request.params.id; 
                const data = alerts.filter((alert) => (alert._source.agent.id === id));
                const total_alerts = data.length;
                return { 
                    data: { 
                        id: id ,
                        name: data[0]._source.agent.name,
                        ip: data[0]._source.agent.ip,
                        total_alerts: total_alerts ,
                        alerts: data
                    } 
                } 
                    
            }
        }, {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/api/rules',
            handler: async (request, h) => {
                const data = [];
                const ids = [];
                alerts.map(alert => {
                    if(!ids.includes(alert._source.rule.id)) {
                        data.push(alert._source.rule)
                        ids.push(alert._source.rule.id)
                    }
                });
                data.map(rule => {
                    const count = alerts.filter(alert => (alert._source.rule.id === rule.id)).length;
                    rule.total_alerts = count;
                });
                return { 
                    total_items: data.length,
                    data: data 
                }                 
            }
        }, {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/api/rules/{id}',
            handler: async (request, h) => {
                const id = request.params.id; 
                const data = alerts.filter((alert) => (alert._source.rule.id === id));
                return {
                    rule: data[0]._source.rule,
                    total_alerts: data.length,
                    alerts: data
                }
                                   
            }
        },
      ]);
    }
  }

  const paginatedResults = (items, pageNum, per_pageNum) => {
    let page = pageNum || 1,
    per_page = per_pageNum || 10,
    offset = (page - 1) * per_page,
  
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
    return {
        page: parseInt(page),
        per_page: parseInt(per_page),
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? parseInt(page) + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems
    };
  }