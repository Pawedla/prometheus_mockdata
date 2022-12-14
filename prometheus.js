
export default class Prometheus {
    
    constructor(){
        this.metrics = new Map()
    }
    

    addMetric(name, value) {
        let currMetrics = this.metrics.get(name)
        if(currMetrics==undefined){
            currMetrics=[]
            currMetrics.push([1671038362.781, value])
        } else {
            currMetrics.push([currMetrics.at(-1)[0]+15, value])

        }
        
        this.metrics.set(name, currMetrics)
    }

    getInstantVector(name) {
        if(this.metrics.get(name)==undefined) return "No metric " + name
        let instantVector = this.generateVector(name, "vector")
        instantVector.data.result.value = this.metrics.get(name).at(-1)
        return instantVector 
    }

    getRangeVector(name) {
        if(this.metrics.get(name)==undefined) return "No metric " + name
        let rangeVector = this.generateVector(name, "matrix")
        rangeVector.data.result.values = this.metrics.get(name)
        return rangeVector
    }


    generateVector(name, resultType) {
    
    return  {
            status : "success",
            data : {
               resultType : resultType,
               result : {
                    metric : {
                        __name__ : name,
                        job : "prometheus",
                    instance : "localhost:9090"
                    }
                }
            }
        }
 
    }
}


  