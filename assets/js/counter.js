$.fn.w_counter = function(min,max,type,callback){
  return this.each(function() {
    var contanier = $(this);
    var field = $("input",contanier);
    var upBtn = $(".w_upBtn",contanier);
    var downBtn = $(".w_downBtn",contanier);
    var fieldVal;
    
    var timeHandler = function(fieldVal){
      if(fieldVal == 0){
          fieldVal = "00"; 
        }else{
          var newFieldVal = "0" + fieldVal;
          if(newFieldVal.length == 2){
            fieldVal = newFieldVal;
          }
        }
      return fieldVal;
    }
    
    field.unbind("focus.input_keyboard").bind("focus.input_keyboard",function(){
      $(this).unbind("keyup.input_keyboard").bind("keyup.input_keyboard",function(e){
          var e = e || window.event;
          var theKeyCode = e.keyCode;
          if(field.val() != ""){
            fieldVal = parseInt(field.val(),10) || min;
            if(theKeyCode == 38){
              e.preventDefault();
              fieldVal += 1; 
            }
            if(theKeyCode == 40){
              e.preventDefault();
              fieldVal -= 1; 
            }
            if(fieldVal < min)
                  fieldVal = fieldVal;//min;
            else if(fieldVal > max)
                fieldVal = max;
            if(type=="time" && fieldVal < 10){
              fieldVal = timeHandler(fieldVal);
            }
            field.val(fieldVal);
          }
          if(callback)
              callback();
      }).bind("blur.input_keyboard",function(){
        $(this).unbind("keyup.input_keyboard");
      });
      
    });

    field.unbind("keyup.input").bind("keyup.input",function(e){
      if(field.val() != ""){
        fieldVal = parseInt(field.val(),10) || min;
        if(fieldVal < min)
            fieldVal = fieldVal;//min;
        else if(fieldVal > max)
          fieldVal = max;
        field.val(fieldVal);
      }
      if(callback)
        callback();
    }).unbind("blur.input").bind("blur.input",function(){
      if(type=="time" && fieldVal < 10){
        fieldVal = timeHandler(fieldVal);
      }else{
        fieldVal = parseInt(field.val(),10) || min;
        if(fieldVal < min)
          fieldVal = min;
        else if(fieldVal > max)
          fieldVal = max;
        }
        field.val(fieldVal);
    });

    upBtn.unbind("click.plus").bind("click.plus",function(){
      if (field.attr("disabled")) {
        return;
      };
      fieldVal = parseInt(field.val(),10);
      if((!(max == null)) && (fieldVal >= max))
        fieldVal = min;
      else
        fieldVal = fieldVal + 1;
      if(type=="time" && fieldVal < 10){
        fieldVal = timeHandler(fieldVal);
      }
      field.val(fieldVal);
      if(callback)
        callback();
    });

    downBtn.unbind("click.minus").bind("click.minus",function(){
      if (field.attr("disabled")) {
        return;
      };
      fieldVal = parseInt(field.val(),10);
      if(!(min == null) && fieldVal <= min)
        fieldVal = max;
      else
        fieldVal -= 1;
      if(type=="time" && fieldVal < 10){
        fieldVal = timeHandler(fieldVal);
      }
      field.val(fieldVal);
      if(callback)
        callback();
    });
    
    
    
    upBtn.bind("selectstart",function(){ 
      return false; 
    }); 
    downBtn.bind("selectstart",function(){ 
      return false; 
    });
  });
}
