ko.dirtyFlag = function(root, isInitiallyDirty) {
    var result = function() {},
        _initialState       =   ko.observable(ko.toJSON(root)),
        _isInitiallyDirty   =   ko.observable(isInitiallyDirty);

    result.isDirty = ko.computed(function() {
        return _isInitiallyDirty() || _initialState() !== ko.toJSON(root);
    });

    result.reset = function() {
        _initialState(ko.toJSON(root));
        _isInitiallyDirty(false);
    };

    return result;
};

function FormField(data) {
    var self            =   this;
    self.ID             =   ko.observable(data.ID);
    self.Name           =   ko.observable(data.Name).extend({required:true});;
    self.Element        =   ko.observable(data.Element);
    self.Type           =   ko.observable(data.Type);
    self.Options        =   ko.observableArray(data.Options);
    self.Placeholder    =   ko.observable(data.Placeholder);
    self.Value          =   ko.observable(data.Value).extend(data.Validation);
    self.Validation		=	ko.observable(data.Validation);
}

function FormViewModel(data) {
    var self = this;

    self.Fields = ko.observableArray(ko.utils.arrayMap(data, function(item) {
        return new FormField(item);
    }));

    self.errors = ko.validation.group(this, { 
        deep        : true, 
        observable  : false 
    });
    
    self.SaveForm = function () {
        if(self.errors().length > 0) {
            self.errors.showAllMessages();
            return;
        }
    };
    
    self.save = function () {
    	
    }
    
    self.next = function () {
    	
    }
    
    self.back = function () {
    	
    }

    self.dirtyFlag = new ko.dirtyFlag(this);
    self.isDirty = ko.computed(function (){
        if (self.dirtyFlag.isDirty()){
        
            var formElements = self.Fields();

            for (var i=0;i<formElements.length;i++){

                var ElementValue            =   formElements[i].Value();

            }
        }
    });
}