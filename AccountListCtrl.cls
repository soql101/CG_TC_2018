public with sharing class AccountListCtrl {
@AuraEnabled
    public static List<Account> getAccounts(){
        return [SELECT Id, Name,AccountNumber,LastModifiedById,LastModifiedDate,OwnerId,Owner.Name,ParentId,AccountSource,AnnualRevenue,Type,Industry,CreatedById, Phone,Description,Fax, Rating,Sic, BillingCity, TickerSymbol  
               FROM Account order by LastModifiedDate DESC];
    }

    @AuraEnabled
    public static string updateAccounts(List<Account> accountEditedList){
        string status='';
        try{
            List<Database.SaveResult> results =Database.update(accountEditedList,false);
            for(Database.SaveResult dr : results) {
                if (dr.isSuccess()) {
                    return 'Success Done';
                }
                else {
                    for(Database.Error err : dr.getErrors()) {
                        status=status+' '+(string)err.getMessage();
                        System.debug(err.getStatusCode() + ': ' + err.getMessage());
                        System.debug('Account fields that affected this error: ' + err.getFields());
                    }
                    return status;
                }
            }
        } catch(Exception e){
            return (string)e.getMessage();
        }
        return status;
    }
        @AuraEnabled
    public static string deleteAccounts(List<Account> accountDeleteList){
        string status='';
        try{
            system.debug('accountDeleteList@@@'+accountDeleteList);
            
            Database.DeleteResult[] drList = Database.delete(accountDeleteList, false);
            for(Database.DeleteResult dr : drList) {
                if (dr.isSuccess()) {
                    return 'Success Done';
                }
                else {
                    for(Database.Error err : dr.getErrors()) {
                        status=status+' '+(string)err.getMessage();
                        System.debug(err.getStatusCode() + ': ' + err.getMessage());
                        System.debug('Account fields that affected this error: ' + err.getFields());
                    }
                    return status;
                }
            }

        } catch(Exception e) {
            return (string)e.getMessage();
        }
        return status;
    }
     @AuraEnabled   
    public static List < String > fetchPickValues(sObject objName, string fieldName){
        system.debug('objName@@@'+objName+'fieldName@@@'+fieldName);
        List < String > optionList = new list < String > ();
        try{
            Schema.sObjectType objType = objName.getSObjectType();
            Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
            map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
            list < Schema.PicklistEntry > values =
                fieldMap.get(fieldName).getDescribe().getPickListValues();
            for (Schema.PicklistEntry a: values) {
                optionList.add(a.getValue());
            }
            optionList.sort();
            system.debug('optionList@@@'+optionList);
            return optionList;
        }catch(Exception ex) {
            System.debug('Error occurred in fetchPickValues() method while querying the details of ' + ex.getMessage());
            throw new AuraHandledException('Server Exception Occured----'+ex.getMessage());
        } 
        
    }
}