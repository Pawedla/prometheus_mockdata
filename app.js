import express from 'express';
import prometheus from './metrics.js'

const app = express();
const PORT = 3005;


app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running,	and App is listening on port "+ PORT)
                	else
		console.log("Error occurred, server can't start", error);
	}
);

app.get('/', (req, res)=>{
        res.status(200);
    res.send("Test");    

});

app.get('/api/v1/query', (req, res)=>{
    res.status(200);
    res.send(prometheus.getInstantVector(req.query.query));    
});

app.get('/api/v1/query_range', (req, res)=>{
        res.status(200);
    res.send(prometheus.getRangeVector(req.query.query));    

});
      
