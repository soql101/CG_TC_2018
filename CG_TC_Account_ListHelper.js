({
    fetchAccountInfo : function(component, event, helper) {
        debugger;
        var action = component.get("c.getAccounts");
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue()){
                    for (var i = 0; i < response.getReturnValue().length; i++) { 
                        response.getReturnValue()[i].OwnerName= response.getReturnValue()[i].Owner.Name;
                    }
                    component.set("v.data", response.getReturnValue());
                }
                
            }else if (state === "INCOMPLETE") {
                var staticLabel = $A.get("$Label.c.noInternet");
                this.showError(component, event,staticLabel);
            }
                else if (state === "ERROR") {
                    var msg= 'Error while Deleting Data from Server';
                    this.showError(component, event,msg);
                }
        });
        $A.enqueueAction(action);
    },
    
    saveAccountInfo : function(component, event, helper) {
        var editedRecords =  component.find("accountDataTable").get("v.draftValues");
        var totalRecordEdited = editedRecords.length;
        var action = component.get("c.updateAccounts");
        action.setParams({
            'accountEditedList' : editedRecords
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var response =response.getReturnValue();
                if(response.startsWith('Success')){
                    helper.showToast({
                        "title": "Record Update",
                        "type": "success",
                        "message": totalRecordEdited+" Account Records Updated"
                    });
                    helper.reloadDataTable();
                }
                else{ 
                    this.showError(component, event,response);
                }
            }else if (state === "INCOMPLETE") {
                var staticLabel = $A.get("$Label.c.noInternet");
                this.showError(component, event,staticLabel);
            }
                else if (state === "ERROR") {
                    var msg= 'Error while Deleting Data from Server';
                    this.showError(component, event,msg);
                }
        });
        $A.enqueueAction(action);
    },
    deleteRecordDetails:function(component, event,row){
        if(!Array.isArray(row)){
            var holdAcnts=[];
            holdAcnts.push(row);
        }
        
        var action = component.get('c.deleteAccounts');
        if(action == undefined || action == null){
            return;
        }
        if(holdAcnts!==undefined){
            action.setParams({
                "accountDeleteList" : holdAcnts
            });  
        }else{
            action.setParams({
                "accountDeleteList" : row
            }); 
        }
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                var response =response.getReturnValue();
                if(response.startsWith('Success')){
                    this.showToast({
                        "title": "Record deleted",
                        "type": "success",
                        "message": " Account Records Deleted"
                    });
                    this.reloadDataTable();
                }else{
                    this.showError(component, event,response);
                }
                
                
            }
            else if (state === "INCOMPLETE") {
                var staticLabel = $A.get("$Label.c.noInternet");
                this.showError(component, event,staticLabel);
            }
                else if (state === "ERROR") {
                    var msg= 'Error while Deleting Data from Server';
                    this.showError(component, event,msg);
                }
        });
        $A.enqueueAction(action);
        
    },
    showRecordDetails:function(component, event,row){
        if(row.Id){
            component.set('v.isShowAccountDetails', true);
            
            component.set("v.accountId", row.Id);
        }else{
            component.set('v.isShowAccountDetails', false);
        }
    },
    showToast : function(params){
        var toastEvent = $A.get("e.force:showToast");
        if(toastEvent){
            toastEvent.setParams(params);
            toastEvent.fire();
        } else{
            alert(params.message);
        }
    },
    
    reloadDataTable : function(){
        var refreshEvent = $A.get("e.force:refreshView");
        if(refreshEvent){
            refreshEvent.fire();
        }
    },
    showError:function(component, event,msg){
        if(msg){
            component.set("v.IsErrorMessage", true);
            component.set("v.ErrorMessage", msg);
        }
        
    },
    getPicklistVals:function(component, event,fieldName){
        //debugger;
        var action = component.get('c.fetchPickValues');
        if(action == undefined || action == null){
            return;
        }
        action.setParams({
            "objName" : component.get('v.accountObj'),
            "fieldName" : 'AccountSource'
            
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                var optionValues = response.getReturnValue();    
                component.set("v.accountSourceList", optionValues);
                component.set('v.isUpdateAccountSourceClicked', true);
                
                
            }
            else if (state === "INCOMPLETE") {
                var noInternet = 'NO Internet connections Please try again.';
                component.set("v.IsErrorMessage", true);
                component.set("v.ErrorMessage", noInternet);
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log('Error>'+errors[0].message);
                            component.set("v.IsErrorMessage", true);
                            component.set("v.ErrorMessage", errors[0].message);
                        }
                    }
                }
        });
        $A.enqueueAction(action);
    },
    saveAccountSourceInfo : function(component, event, helper) {
        debugger;
        var singleValUpdateAccounts =  component.get('v.singleValUpdateAccounts'); ;
        var totalRecordEdited = singleValUpdateAccounts.length;
        var action = component.get("c.updateAccounts");
        action.setParams({
            'accountEditedList' : singleValUpdateAccounts
        });
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var response =response.getReturnValue();
                if(response.startsWith('Success')){
                    helper.showToast({
                        "title": "Record Update",
                        "type": "success",
                        "message": totalRecordEdited+" Account Records Updated"
                    });
                    helper.reloadDataTable();
                }
                else{ 
                    this.showError(component, event,response);
                }
            }else if (state === "INCOMPLETE") {
                var staticLabel = $A.get("$Label.c.noInternet");
                this.showError(component, event,staticLabel);
            }
                else if (state === "ERROR") {
                    var msg= 'Error while Deleting Data from Server';
                    this.showError(component, event,msg);
                }
        });
        $A.enqueueAction(action);
    },
    sortData: function (component, fieldName, sortDirection) {
        var data = component.get("v.data");
        var reverse = sortDirection !== 'asc';
        //sorts the rows based on the column header that's clicked
        data.sort(this.sortBy(fieldName, reverse))
        component.set("v.data", data);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer ? function(x) {return primer(x[field])} : function(x) {return x[field]};
        //checks if the two rows should switch places
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },
    removePillerFromSelection:function(component,pillerRows){
        debugger;
        var selectedRowsUpdate= component.get('v.selectedRowsUpdate');
        var selectedRowsDelete= component.get('v.selectedRowsDelete');

        var removeIndexRowsUpdate = selectedRowsUpdate.map(function(item) { return item.Id; }).indexOf(pillerRows);
        var removeIndexRowsDelete = selectedRowsUpdate.map(function(item) { return item.Id; }).indexOf(pillerRows);
        selectedRowsUpdate.splice(removeIndexRowsUpdate, 1);
        selectedRowsDelete.splice(removeIndexRowsUpdate, 1);
        component.set('v.selectedRowsUpdate', selectedRowsUpdate);
        component.set('v.removeIndexRowsDelete', removeIndexRowsDelete);

    },
    deleteCloseErrorModalHelper:function(component, event,msg){
        if(msg){
            component.set("v.IsDeleteErrorMessage", true);
            component.set("v.deleteErrorMessage", msg);
        }
        
    },
})