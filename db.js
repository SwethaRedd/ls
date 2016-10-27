 var databaseOptions = {
            fileName: "sqlite_class",
            version: "1.0",
            displayName: "SQLite Hello World",
            maxSize: 1024
        };

  var database = openDatabase(
            databaseOptions.fileName,
            databaseOptions.version,
            databaseOptions.displayName,
            databaseOptions.maxSize
        );