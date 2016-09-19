/**
 * 作者：莫尚霖
 * 时间：2016-9-18
 * 描述：操作数据库
 * 参考的文章地址：1.代码来源：http://blog.csdn.net/zhuming3834/article/details/51471434
 * 				  2.sqlite使用说明：http://blog.csdn.net/panda_m/article/details/49951555?ref=myread
 * 				  3.sqlite语句：http://www.runoob.com/sqlite/sqlite-tutorial.html
 */
/**
 * H5 Sqlite数据库三个核心API
 * 1.opendatabase：使用现有数据库或创建新数据库创建数据库对象
 * 2.transaction：事务，可根据情况控制事务提交或回滚
 * 3.executeSql：用于执行SQL语句
 */

var DBName = 'jxwdb'; /*jxwdb数据库名*/
var DBVersion = '1.0'; /*数据库版本*/
var DBDesc = 'jxw数据库'; /*数据库描述*/
var DBSize = 30 * 1024; /*数据库大小单位是kb*/

var DB = null; /*暂存数据库对象*/

/**
 * 获取或者创建一个数据库，如果该数据库不存在那么就创建一个
 */
function openDB() {
	/**
	 * 几个参数意义分别是：
	 *   1，数据库名称。
	 *   2，数据库的版本号，目前来说传个1.0就可以了，当然可以不填；
	 *   3，对数据库的描述。
	 *   4，设置分配的数据库的大小（单位是kb）。
	 *   5，回调函数(可省略)。
	 */
	DB = window.openDatabase(DBName, DBVersion, DBDesc, DBSize, function() {});
	if(DB) {
		console.log("数据库创建/打开成功!");
	} else {
		console.log("数据库创建/打开失败！");
	}
}

/**
 * 对数据库进行操作
 * @param {Object} tableName 表单名字
 * @param {Object} SQL SQL语句
 * @param {Object} data 相关的数据(数组)
 */
function DBManage(tableName, SQL, data) {
	//DB.transaction(callback)
	//用作事务处理，来操作数据库
	DB.transaction(function(ctx) {
		//ctx.executeSql('SQL语句',[参数数组],dataHandler,errorHandler)
		//executeSql：用于执行SQL语句
		//executeSql的四个参数：
		//1.操作数据库的SQL语句
		//2.SQL语句中使用的参数的数组
		//3.语句操作成功调用的方法
		//4.语句操作失败调用的方法
		ctx.executeSql(SQL, data, function(ctx, results) {
				//语句操作成功
				// 其中，results的rows属性中保存了查询到的每一条记录，rows.length属性可以获取记录的条数
				// 可使用rows[index]或rows[item]来单独取到某条记录
				console.log('DBManage：' + tableName + ' 操作成功！ results长度：' + results.rows.length);
				var len = results.rows.length;
				for(var i = 0; i < len; i++) {
					console.log("-------- 我是分割线 -------");
					console.log("ID =" + results.rows.item(i).ID);
					console.log("NAME = " + results.rows.item(i).NAME);
					console.log("NICKNAME = " + results.rows.item(i).NICKNAME);
					console.log("SUBJECT = " + results.rows.item(i).SUBJECT);
					console.log("TYPE = " + results.rows.item(i).TYPE);
				}
			},
			function(ctx, error) {
				//语句操作失败
				console.log('DBManage：' + tableName + '操作失败:' + error.message);
			});
	});
}

/**
 * 查詢所有的表
 * @param {Object} getAllTableSQL 查詢所有的表的sql语句
 */
function getAllTable(getAllTableSQL) {
	DB.transaction(function(ctx, results) {
		ctx.executeSql(getAllTableSQL, [], function(ctx, results) {
			console.log('查询所有的表成功:' + results.rows.length);
			var length = results.rows.length;
			for(var i = 0; i < length; i++) {
				console.log("-------- 我是分割线 -------");
				console.log("数据 " + i);
				console.log("tableName = " + results.rows.item(i).name);
			}
		}, function(ctx, error) {
			console.log('查询所有的表失败: ' + error.message);
		});
	});
}