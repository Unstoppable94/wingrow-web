//$(function(){
//  //return
//
//  
//  api.vms.fetch().then(function(){
//    console.log("\n-------查询列表-------\n")
//    console.log("search all: ");
//    console.log(api.vms.toJSON());
//
//    console.log("search all, select name: ");
//    console.log(api.vms.pluck("name"));
//  });
//
//  api.vms.create({
//    name: 'fengzj',
//    age: 30
//  },{
//    success: function(){
//      console.log("\n-------新建记录-------\n");
//      console.log("create success");
//    },
//    error: function(){
//      console.log("\n-------新建记录-------\n");
//      console.log("create error");
//    }
//  })
//  
//  
//  api.vm.set({id: 1}).fetch().then(function(){
//    console.log("\n-------查询详情-------\n");
//    console.log("show detail: ");
//    console.log(api.vm.toJSON())
//  });
//
//  
//  api.vm.save({
//    name: 'wangyy',
//    age: 20
//  },{
//    success: function(){
//      console.log("\n-------更新记录-------\n");
//      console.log("update success");
//    },
//    error: function(){
//      console.log("\n-------更新记录-------\n");
//      console.log("update error");
//    }
//  })
//
//  
//  api.vm.destroy({
//    success: function(){
//      console.log("\n-------删除记录-------\n");
//      console.log("destroy success");
//    },
//    error: function(){
//      console.log("\n-------删除记录-------\n");
//      console.log("destroy error");
//    }
//  });
//
//  
//  api.hosts.fetch({data:{maxRecord: 15, firstRecord: 0}}).then(function(){
//    console.log("\n-------分页查询-------\n")
//    console.log("pagination search: ");
//    console.log(api.hosts.toJSON());
//
//    console.log("pagination search, select name: ");
//    console.log(api.hosts.pluck("name"));
//  });
//
//  api.host.set({id: 1}).volumns.fetch().then(function(){
//    console.log("\n-------嵌套模型查询-------\n")
//    console.log("search all: ");
//    console.log(api.host.volumns.toJSON());
//  });
//
//  api.volumn.set({id: 1}).fetch().then(function(){
//    console.log("\n-------查询详情-------\n");
//    console.log("show detail: ");
//    console.log(api.volumn.toJSON());
//  });
//
//})