/// <reference path="Scripts/jquery-1.4.1-vsdoc.js" />

var webStorage = {};
webStorage.webSql = function () {

    var _this = this;

    //数据库
    var _dataBase;

    //打开数据库连接或者创建数据库
    this.openDatabase = function () {

        if (!!_dataBase) {
            return _dataBase;
        }
        _dataBase = openDatabase("album", "1.0", "相册", 1024 * 1024, function () { });

          if (!_dataBase) {
              //alert("数据库创建失败！");
          } else {
              alert("数据库创建成功！");
          }
        return _dataBase;

    }




    //创建数据表
    this.createTable = function () {

        var dataBase = _this.openDatabase();
        // 创建表
        dataBase.transaction(function (tx) {
            tx.executeSql(
        "create table if not exists imagelist (id REAL UNIQUE, name TEXT)",
        [],
        function () {
      	//alert('创建imagelist表成功');
        },
        function (tx, error) {
            alert('创建imagelist表失败:' + error.message);
        });
        });
    }

    //添加数据
    this.insert = function (name) {
        var dataBase = _this.openDatabase();
        var id = Math.random();
        dataBase.transaction(function (tx) {
            tx.executeSql(
        "insert into imagelist (id, name) values(?, ?)",
        [id, name],
        function () {
        //	alert('添加数据成功'); 
        },
        function (tx, error) {
            alert('添加数据失败: ' + error.message);
        });
        });

    }

    // 查询
    this.query = function () {
        var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql(
        "select * from imagelist", [],
         function (tx, result) {
             //result：SQLResultSet对象。 
             //其定义为：interface SQLResultSet {
             //  readonly attribute long insertId;
             //  readonly attribute long rowsAffected;
             //  readonly attribute SQLResultSetRowList rows;
             //};
                          alert(result);
             for (var i = 0; i < result.rows.length; i++) {


                 var id = result.rows.item(i)['id'];
                 var name = result.rows.item(i)['name'];
console.log(name);

             }
         },
        function (tx, error) {
            alert('查询失败: ' + error.message);
        });
        });

    }

    //更新数据
    this.update = function (id, name) {

        var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql(
        "update imagelist set name = ? where id= ?",
        [name, id],
         function (tx, result) {
             _this.query();
         },
        function (tx, error) {
            alert('更新失败: ' + error.message);
        });
        });
    }

    //删除数据
    this.del = function (id) {
        var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql(
        "delete from  imagelist where id= ?",
        [id],
         function (tx, result) {

         },
        function (tx, error) {
            alert('删除失败: ' + error.message);
        });
        });
    }

    //删除数据表
    this.dropTable = function () {
        var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql('drop  table  imagelist');
        });
    }


}