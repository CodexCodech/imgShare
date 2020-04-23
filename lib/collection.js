imagesdb = new Mongo.Collection('images');

	imagesdb.allow({
	insert: function(userId, doc){
		if (userId){ // has user logged in
		return true;
		}
		else{
			return false;
		}
	},
		remove: function(userId, doc){
			if (userId){ // edit only what I own
				return true;
			}
			else{
				return false;
			}
	},
		update: function(userId, doc, fields){
			console.table(doc);
			if (userId){
					return true;

			}
			else{
          if (fields[0] == "ratings"){
                return true;
            }
            else {
                return false;
            }
					return false;
			}
		}



});