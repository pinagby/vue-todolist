export default{
	//打开数据库
	openDB(name,version,callback) {
		version = version | 1;
	    let request = window.indexedDB.open(name,version);
	    request.onerror = function(e) {
	        console.log(e.currentTarget.error.message);
	    };
	    request.onsuccess = function(e) {
	        try{callback(e);}catch(e){}
	    };
	    request.onupgradeneeded = function(e){
	    	let db = e.target.result;
	    	//添加todoList表
	    	if(!db.objectStoreNames.contains('todoList')){
	    		var store = db.createObjectStore('todoList',{keyPath:'id'});
	    		// db.createObjectStore('todoList',{autoIncrement:true});
	    		store.createIndex('createTime','createTime',{unique:true});
	    		store.createIndex('name','name',{unique:true});
	    	}
	    	console.log('DB 版本变为'+version);
	    };
	},
	//获取表中所有数据db
	getData(db,storeName,callback){
		let transaction = db.transaction(storeName);
		let store = transaction.objectStore(storeName);
		let req = store.getAll();
		req.onsuccess = function(e){
			try{
				callback(req.result);
			}catch(e){}
		}
	},
	//根据键值获取数据
	getDataByKey(db,storeName,key,callback){
		let transaction = db.transaction(storeName);
		let store = transaction.objectStore(storeName);
		let request = store.get(key);
		request.onsuccess = function(e){
			try{
				callback(e);
			}catch(e){}
		}
		request.onerror = function(e){
			console.log(e.target.errorCode);
		}
	},
	//根据索引获取数据对象
	getDataByIndex(db,storeName,indexName,value){
        let store=db.transaction(storeName).objectStore(storeName);
        let index = store.index(indexName);
        index.get(value).onsuccess = function(e){
            let res=e.target.result;
            console.log(res);
        }
    },
	//添加数据
	addData(db,storeName,datas){
		//添加数据，重复添加会报错
		let store = db.transaction(storeName,'readwrite').objectStore(storeName),
			request;

		for(let i = 0;i<datas.length;i++){
			request = store.add(datas[i]);
            request.onerror = function(){
                console.error('add添加数据库中已有该数据')
            };
            request.onsuccess = function(){
                console.log('add添加数据已存入数据库')
            };
		}

		//遍历数据
		var req = store.openCursor(),
			testData = [];
		req.onsuccess = function(e){
			var cursor = req.result;
			if(cursor){
				console.log(cursor.key);
				console.log(cursor.value);
				testData.push(cursor);
				cursor.continue();
			}

		}
		console.dir(testData);

		this.getDataByIndex(db,storeName,'name','Vue');
	},
	//添加数据
	putData:function(db,storename,datas){
        //添加数据，重复添加会更新原有数据
        var store = db.transaction(storename,'readwrite').objectStore(storename),
        	request;
        for(var i = 0 ; i < datas.length;i++){
            request = store.put(datas[i]);
            request.onerror = function(){
                console.error('put添加数据库中已有该数据')
            };
            request.onsuccess = function(){
                console.log('put添加数据已存入数据库')
            };
        }
    },
	//更新数据
	updateDataByKey(db,storeName,key,callback){
		let store = db.transaction(storeName,'readwrite').objectStore(storeName);
		let request = store.get(key);
		request.onsuccess = function(e){
			try{callback(request,store);}catch(e){}
			console.log('put更新数据库')
		}
	},
	// 删除数据
	deleteDataByKey:function(db,storename,key,callback){
        //删除某一条记录
        var store = db.transaction(storename,'readwrite').objectStore(storename);
        let req = store.delete(key);
        req.onsuccess = function(e){
        	console.log(req)
        	try{callback(req,store);}catch(e){}
        	console.log('已删除存储空间'+storename+'中'+key+'记录');
        }
        
    },
    // 清空数据
    clearData:function(db,storename){
        //删除存储空间全部记录
        var store = db.transaction(storename,'readwrite').objectStore(storename);
        store.clear();
        console.log('已删除存储空间'+storename+'全部记录');
    },
    // 删除表
    deleteStore(db,storeName){
    	var transaction = db.transaction(storeName,'versionchange');
    	db.deleteObjectStore(storeName);
    },
	//关闭数据库
	closeDB(db) {
	    db.close();
	    console.log('数据库已关闭');
	},
	//删除数据库
	deleteDB(name) {
	    indexedDB.deleteDatabase(name);
	    console.log(dbname+'数据库已删除');
	}
}

