var Book = require('../models/Book')
var stuFun = function(app) {
	app.get('/test', function(req, res){
		res.send('hello');
	});

	// exec()回调函数
	app.get('/books',function(req, res){
		console.log('get all boooks');
		Book.find({})
		.exec(function(err, books){
			if(err){
				res.send('error');
			}else{
				console.log(books);
				res.json(books);
			}
		});
	});

	app.get('/books/:id',function(req, res){
		console.log('getting one book');
		Book.findOne({
			_id: req.params.id
		})
		.exec(function(err, book){
			if(err){
				res.send('erro');
			}else{
				console.log(book);
				res.json(book);
			}
		});
	});

	app.post('/book',function(req, res){
		var newBook = new Book();

		newBook.title = req.body.title;
		newBook.author = req.body.author;
		newBook.category = req.body.category;

		newBook.save(function(err, book){
			if(err){
				res.send("error saving book");
			}else{
				console.log(book);
				res.send(book);
			}
		});
	});

	app.post('/book2',function(req, res){
		Book.create(req.body, function(err, book){
			if(err){
				res.send("err saving book");
			}else{
				console.log(book);
				res.send(book);
			}
		});
	});

	app.put('/book/:id',function(req, res){
		Book.findOneAndUpdate({
			_id: req.params.id
		}, {$set: {title: req.body.title}}, 
			{upsert: true},
			 function(err, newBook){
			 	if(err){
			 		res.send("error update");
			 	}else{
			 		console.log(newBook);
			 		res.send(newBook);
			 	}
			 });
	});

	app.delete('/book/:id', function(req, res){
		Book.findOneAndRemove({
			_id: req.params.id
		},function(err, book){
			if(err){
				res.send("error delete");
			}else{
				console.log(boook);
				res.json({success: "success"});
			}
		});
	});
}

module.exports = stuFun