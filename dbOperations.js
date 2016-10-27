
//dropTable();
createTable();

function createTable()
{
	database.transaction(
            function( transaction ){
                console.log("Creating Table");
                transaction.executeSql(
                    "CREATE TABLE IF NOT EXISTS ITEMS1 (uId INTEGER PRIMARY KEY AUTOINCREMENT,"+
                                                        "Zip TEXT NOT NULL,"+
                                                         "Title TEXT NOT NULL,"+
                                                         "Address TEXT NOT NULL,"+
                                                         "Phone TEXT NOT NULL,"+
                                                         "Type_Code TEXT NOT NULL,"+
                                                         "Distance TEXT NOT NULL);"
                );
            }
        );

}
function dropTable()
{
	  database.transaction(
            function( transaction ){
                console.log("Deleting Table");
                transaction.executeSql(
                    "DROP TABLE ITEMS1;"
                    );
                }
            );
}



function retrieveItems(key,value)
{
	console.log("retrieveItems");
	var selectItems = "SELECT * from ITEMS1 where zip = ? and type_code = ?";
	database.transaction(function (tx) 
	{
		tx.executeSql(selectItems , [zipCode, key],
			function (tx, results) 
			{
				if(!checkItems(results, key))
			 	{
			 		callService(key,value);
			 	}
			});
		
		});
}
function insertItems(results,key,value)
{
	database.transaction(function (tx) 
	{
		$.each(results, function(index){
			
			var title = results[index].Title,
					zip = zipCode,
					type = key,
					address = results[index].Address,
					city = results[index].City,
					state= results[index].State,
					phone = results[index].Phone,
					distance = results[index].Distance,
					addressInfo = address +", " + city +", "+ state;
			 var insertStmnt= "INSERT INTO ITEMS1 (Zip, Title, Address, Phone, Type_Code, Distance)"+
							  "Values (?,?,?,?,?,?) ";

			 tx.executeSql(insertStmnt, [zipCode,title,addressInfo,phone,key,distance]);
			 console.log("inserted");
			 retrieveItems(key,value);
		});


	});

}

function updteItems(updateVal, item, id)
{
	var updateStmnt= "UPDATE ITEMS1 SET Address = ? where uId= ? and Type_Code =?";

	 database.transaction(function (tx) 
	 {
		tx.executeSql(updateStmnt, [updateVal,id, item]);
	});
}

function deleteItems()
{
	console.log("reset");
	var deleteStmnt= "DELETE FROM ITEMS1";

	 database.transaction(function (tx) 
	 {
		tx.executeSql(deleteStmnt, [], function(){
			location.reload();
		});
	});
}
