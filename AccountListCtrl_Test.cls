@isTest
private class AccountListCtrl_Test{
  @testSetup
  static void setupTestData(){
    test.startTest();
    Account account_Obj = new Account(Name = 'United Oil & Gas Corp Test');
    Insert account_Obj; 
    test.stopTest();
  }
  static testMethod void test_getAccounts_UseCase1(){
    List<Account> account_Obj  =  [SELECT Name,CreatedDate,CreatedById,LastModifiedDate,LastModifiedById from Account];
    System.assertEquals(true,account_Obj.size()>0);
    AccountListCtrl obj01 = new AccountListCtrl();
    AccountListCtrl.getAccounts();
  }
  static testMethod void test_updateAccounts_UseCase1(){
    List<Account> account_Obj  =  [SELECT Name,CreatedDate,CreatedById,LastModifiedDate,LastModifiedById from Account];
    System.assertEquals(true,account_Obj.size()>0);
    AccountListCtrl obj01 = new AccountListCtrl();
    AccountListCtrl.updateAccounts(account_Obj);
      AccountListCtrl.updateAccounts(null);
  }
  static testMethod void test_deleteAccounts_UseCase1(){
    List<Account> account_Obj  =  [SELECT Name,CreatedDate,CreatedById,LastModifiedDate,LastModifiedById from Account];
    System.assertEquals(true,account_Obj.size()>0);
    AccountListCtrl obj01 = new AccountListCtrl();
    AccountListCtrl.deleteAccounts(account_Obj);
      AccountListCtrl.deleteAccounts(null);
  }
  static testMethod void test_fetchPickValues_UseCase1(){
    List<Account> account_Obj  =  [SELECT Name,CreatedDate,CreatedById,LastModifiedDate,LastModifiedById from Account limit 1];
    System.assertEquals(true,account_Obj.size()>0);
    AccountListCtrl obj01 = new AccountListCtrl();
    AccountListCtrl.fetchPickValues(account_Obj[0],'AccountSource');
  }
}