/**
 * This module exports the data model for the IDG Session
 */

export interface IDGSession {
  tokenId: string;
  expiryDate: string;

  otpEnabled?: string;

  // address: string;
  // agency: null;
  // agentOutStandingList: null;
  // altMail: null;
  // apprRejectOn: null;
  // business: null;
  // businessType: null;
  // city: 'Delhi';
  // commGroup: null;
  // company: 'AddminCom';
  // corporateBgt: null;
  // country: 'UP';
  // createdOn: '2020-05-06T06:29:06.000+0000';
  // currentPage: null;
  // customerFundsModel: {
  //   Id: 16;
  //   availablebalance: -2945;
  //   creditNote: null;
  //   creditlimit: 0;
  //   customerFundsHistoryList: null;
  //   debitNote: null;
  //   due: 2945;
  //   prvOutStanding: 0;
  //   totalCreditAmt: 0;
  //   totalDebitAmt: 0;
  //   totalOutStanding: 0;
  //   updatedOn: '2020-07-23T10:58:09.000+0000';
  // };
  // defaultPassword: false;
  // dob: null;
  // email: 'flight@testapi';
  // firstName: 'Test';
  // fromDate: null;
  // fromDateStr: null;
  // gst: 'GST';
  // homePageModels: null;
  // iATA: null;
  // income: null;
  // isAadhaarCard: null;
  // isAddressProof: null;
  // isGstCertificate: null;
  // isMobileVerify: null;
  // isPanCard: null;
  // isSalesReport: null;
  // lastLoggedOn: '2020-09-10T05:25:13.235+0000';
  // lastName: 'Integrator';
  // mailServiceDetails: null;
  // mappedgrp: false;
  // menuCategories: null;
  // middleName: 'API';
  // mobile: '8790897890';
  // numberOfPages: null;
  // officePhone: null;
  // otp: null;
  // otpEnabled: null;
  // pGUserMappingModelList: null;
  // panName: null;
  // pannumber: '1678TEST2';
  // parentUser: null;
  // password: null;
  // pincode: '110092';
  // recordPerPage: null;
  // redirectUrl: 'http://test.besttoursofindia.in/index.html';
  // referedby: 'CP';
  // registeredToken: null;
  // remark: null;
  // reportsto: 'report';
  // role: null;
  // roleMasterModel: null;
  // roleMasterModelList: null;
  // sales: null;
  // selected: false;
  // services: null;
  // smsDetails: null;
  // staffId: 'ADD849';
  // state: 'Delhi';
  // status: 'Active';
  // subscriber: {
  //   agencyId: null;
  //   company: 'Subscriber2';
  //   email: 'sub2midname@gmail.com';
  //   'first-name': 'Subscriber2';
  //   id: 15;
  //   'last-name': 'sublastname';
  //   'middle-name': 'sub2midname';
  //   mobile: '2234567890';
  // };
  // supplierDetails: null;
  // toDate: null;
  // toDateStr: null;
  // token: {
  //   expiryDate: string;
  //   otpEnabled: string;
  //   tokenId: string;
  // };
  // txnCharge: null;
  // userArtifactWrapper: null;
  // userDetailsList: null;
  // userID: 16;
  // userIdList: null;
  // userPrincipalSupplierList: null;
  // userRoleModelList: null;
  // userType: 'SUPER_ADMIN';
  // website: '16flightapi.besttoursofindia.in';
}

export interface SessionState {
  session?: IDGSession;
  loading: 'idle' | 'pending';
  error: string | null;
}
