({
    doInit : function(component, event, helper) {  
        component.set('v.columns', [
            {label: 'Name', fieldName: 'Name', editable:'true', type: 'text' ,sortable: true},
            {label: 'Account Number', fieldName: 'AccountNumber', editable:'true', type: 'text',sortable: true},
            {label: 'Owner Name', fieldName: 'OwnerName', type: 'text',sortable: true},
            {label: 'Account Source', fieldName: 'AccountSource', editable:'true', type: 'text',sortable: true},
            {label: 'Annual Revenue', fieldName: 'AnnualRevenue', editable:'true', type: 'currency',sortable: true},
            {label: 'Type', fieldName: 'Type', editable:'true', type: 'text',sortable: true},
            {label: 'Industry', fieldName: 'Industry', editable:'true', type: 'text',sortable: true},
            {label: 'CreatedBy Id', fieldName: 'CreatedById', type: 'text',sortable: true},
            {type:  'button',typeAttributes:{iconName: 'utility:knowledge_base', name: 'Show',title: 'Show', disabled: false,value: 'Id'}},
            {type:  'button',typeAttributes:{iconName: 'utility:delete', name: 'Delete',title: 'Delete', disabled: false,value: 'Id'}}
            
        ]);        
        helper.fetchAccountInfo(component, helper);
    },
    onSave : function (component, event, helper) {
        helper.saveAccountInfo(component, event, helper);
    },
    handleRowAction: function (component, event, helper) {
        debugger;
        var action = event.getParam('action');
        var row = event.getParam('row');
        if(action.name=='Delete'){
            
            component.set('v.possibleBulkAccount', null);
            component.set('v.deletAccount', row);
            helper.deleteCloseErrorModalHelper(component, event,'Are you sure you want to delete Account Records?');
            //helper.deleteRecordDetails(component, event,row);
        }else if(action.name=='Show'){
            component.set('v.possibleBulkAccount', null);
            component.set('v.deletAccount', null);
            helper.showRecordDetails(component, event,row);
        }else{
            component.set('v.possibleBulkAccount', null);
            component.set('v.deletAccount', null);
        }
    },
    handleRowselection: function (component, event, helper) {
        debugger;
        var selectedRows = event.getParam('selectedRows');
        var accountPillerArray=[];
        for (var i = 0; i < selectedRows.length; i++) { 
            var pillarObj={};
            pillarObj.Id=selectedRows[i].Id;
            pillarObj.type='icon';
            pillarObj.href='';
            pillarObj.label=selectedRows[i].Name;
            pillarObj.iconName='standard:account';
            pillarObj.alternativeText= 'Account'
            accountPillerArray.push(pillarObj);
        }
        component.set('v.pillerRows', accountPillerArray);

        
        var selectedRowsArray=[];
        selectedRowsArray.push(selectedRows);
        if(selectedRows.length>0){
            component.set("v.selectedRowsDelete", selectedRows); 
            component.set("v.selectedRowsUpdate", selectedRows); 
        }else{
            component.set("v.selectedRowsDelete", []); 
            component.set("v.selectedRowsUpdate", []); 
        }
    },
    handleBulkDeleteClick: function(component, event, helper){
        var selectedRowstoDelete= component.get("v.selectedRowsDelete");
        component.set('v.possibleBulkAccount', selectedRowstoDelete);

        if(selectedRowstoDelete.length>0){
            helper.deleteCloseErrorModalHelper(component, event,'Are you sure you want to delete Account Record?');
            component.set('v.deletAccount', null);
        }    
        else{
            helper.showError(component, event,'Please select Accounts');
        }
    },
    
    closeErrorModal: function(component, event, helper){
        component.set("v.IsErrorMessage", false);
        component.set("v.ErrorMessage", '');
    },
    createNewAccount:function(component, event,helper){
        component.set('v.isNewAccount', true);
        
        
    },
    closePopup:function(component, event,helper){
        component.set('v.isNewAccount', false);
        component.set('v.isUpdateAccountSourceClicked', false);
        
    },
    onSuccess:function(component, event,helper){
        component.set('v.isNewAccount', false);
        helper.reloadDataTable();
        
    },
    onError:function(component, event,helper){
        component.set('v.isNewAccount', false);
        helper.showError(component, event,'Error while creating Account Record');
    },
    handleAccountUpdate:function(component, event,helper){
        var selectedRowsUpdate= component.get("v.selectedRowsUpdate");
        if(selectedRowsUpdate.length>0){
          helper.getPicklistVals(component, event);
        }    
        else{
            helper.showError(component, event,'Please select Account');
        }
    },
    updateAccountSourceVal:function(component, event,helper){
        debugger;
        var selectedRowsUpdate=  component.get('v.selectedRowsUpdate');
        var selectedValue= component.get('v.selectedValue');
        if(selectedRowsUpdate){
            for (var i = 0; i < selectedRowsUpdate.length; i++) { 
                selectedRowsUpdate[i].AccountSource=selectedValue;
            }
            component.set('v.singleValUpdateAccounts', selectedRowsUpdate);
            helper.saveAccountSourceInfo(component, event,helper);
            
        }
    },
    updateColumnSorting: function(component, event, helper) {
        debugger;
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        component.set("v.sortedBy", event.getParam("fieldName"));
        component.set("v.sortedDirection", event.getParam("sortDirection"));
        // assign the latest attribute with the sorted column fieldName and sorted direction
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    },
    handleItemRemove: function (component, event,helper) {
        debugger;
        var pillerRowsId = event.getParam("item").Id;
        //alert(pillerRows + ' pill was removed!');
        // Remove the pill from view
        var pillerRows = component.get('v.pillerRows');
        var item = event.getParam("index");
        

        pillerRows.splice(item, 1);
        component.set('v.pillerRows', pillerRows);  
        helper.removePillerFromSelection(component,pillerRowsId)
    },
    oncancel:function(component, event,helper){
        component.set('v.isNewAccount', false);  
    },
    deleteCloseErrorModal:function(component, event,helper){
        debugger;
        var deletAccount= component.get('v.deletAccount');
        var possibleBulkAccount = component.get('v.possibleBulkAccount');
        if(deletAccount){
            helper.deleteRecordDetails(component, event,deletAccount);
        }
        if(possibleBulkAccount){
            helper.deleteRecordDetails(component, event,possibleBulkAccount);
        }
        component.set('v.IsDeleteErrorMessage', false);
        
        
    },
     deleteCancelCloseErrorModal:function(component, event,helper){
        component.set('v.IsDeleteErrorMessage', false);
        
    },
    
})