$(function(){
  (function(window){
    var model = {
      vm:       Backbone.Model.extend({urlRoot: 'api/vms'}),
      vms:      Backbone.Collection.extend({url: 'api/vms.json'}),
      volumn:   Backbone.Model.extend({urlRoot: 'api/volumns'}),
      columns:  Backbone.Collection.extend({parse:function(response){ return response.results }}),
      host:     Backbone.Model.extend({
        urlRoot: 'api/hosts',
        initialize: function(){
          this.volumns = new model.columns();
          this.on("change:id", function(model, id) {
            this.volumns.url = this.urlRoot+"/"+id+"/volumns";
          });
        }
      }),
      hosts:    Backbone.Collection.extend({url: 'api/hosts.json', parse:function(response){ return response.results }}),
      
      cloudPlatform:	Backbone.Model.extend({urlRoot: 'api/v5.0.0/cloudPlatforms'}),
      cloudPlatforms:	Backbone.Collection.extend({url: 'api/v5.0.0/cloudPlatforms'})
    };

    var api = {};
    api.vm      = new model.vm();
    api.vms     = new model.vms();
    api.volumn  = new model.volumn();
    api.host    = new model.host();
    api.hosts   = new model.hosts();
    api.cloudPlatform	= new model.cloudPlatform();
    api.cloudPlatforms	= new model.cloudPlatforms();

    //window.model = model;
    window.api = api;
  })(window);
})
