class filterAPI{
    constructor(query,reqQuery){
        this.query = query;
        this.reqQuery = reqQuery;
    }
    filterAndFind(){
        let reqQueryTemp = {...this.reqQuery}
        const filter = ['sort','limit','fields','page','search']
        filter.forEach((el)=>{
            delete reqQueryTemp[el];
        })
        //applying $set in query
        reqQueryTemp = JSON.parse(
            JSON.stringify(reqQueryTemp).
            replace(/"(gte|gt|lte|lt)"/g,match=>
                    `"$${match.slice(1,match.length-1)}"`
        ))
        this.query.find(reqQueryTemp);
        return this;
    }
    sort(){
        if(this.reqQuery.sort){
            const sortBy = this.reqQuery.sort.split(',').join(' ');
            this.query.sort(sortBy);
        }
        else{
            this.query.sort('createdAt')
        }
        return this;
    }
    select(){
        if(this.reqQuery.fields){
            const fields = this.reqQuery.fields.split(',').join(' ');
            this.query.select(fields);
        }
        else{
            this.query.select('-__v')    //'-' sign 'll exclude __v
        }
        return this;
    }
    paging(){
        const page = this.reqQuery.page || 1;
        const limit = this.reqQuery.limit || 10;
        const skip = (page-1)*limit;
        this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = filterAPI;