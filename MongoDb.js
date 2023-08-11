//4a.db.Reviews.find({ property_type: { $eq: "House" } });


//4b.db.Reviews.find({price:{$gt:500}},{_id:0,listing_url:1, name:1, host_name:1, host_location:1, reviewer_name:1, price:1})

//4d.db.Reviews.find({price:{$gt:600,$lt:900}})

//4c.db.Reviews.find({$and:[
// {'address.country':"Brazil"},
// {"review_scores.review_scores_rating":{$gte:9}}
// ]})