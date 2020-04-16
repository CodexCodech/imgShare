imagesdb = new Mongo.Collection('images');

	imagesdb.allow({
	insert: function(userId, doc){
		if (userId){
		return true;
		}
		else{
			return false;
		}
	},
		remove: function(userId, doc){
			if (userId){
				return true;
			}
			else{
				return false;
			}
	},
		update: function(userId, doc){
			if (userId == doc.createdById){
				return true;

			}
			else{
				return false;
			}
		}

   });